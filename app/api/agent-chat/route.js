import { NextResponse } from "next/server";

// No persistent storage - each request is independent
// This significantly reduces memory usage

export async function POST(req) {
  const { input, tools, agents } = await req.json();

  // Build minimal system prompt with only essential agent instructions
  const systemPrompt = agents
    .map((agent) => `${agent.name}: ${agent.instruction}`)
    .join("\n\n");

  // Convert tools to function calling format efficiently
  const groqTools = tools.map((t) => {
    const properties = {};
    const required = [];
    
    Object.entries(t.parameters).forEach(([key, type]) => {
      properties[key] = {
        type: type === "number" ? "number" : "string",
      };
      required.push(key);
    });

    return {
      type: "function",
      function: {
        name: t.name.replace(/\s+/g, "_").toLowerCase(),
        description: t.description.substring(0, 100), // Limit description length
        parameters: {
          type: "object",
          properties,
          required,
        },
      },
    };
  });

  // Minimal messages array - no history
  const messages = [
    {
      role: "system",
      content: systemPrompt || "You are a helpful AI assistant.",
    },
    {
      role: "user",
      content: input,
    },
  ];

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = "";
          let shouldContinue = true;
          let currentMessages = [...messages];

          while (shouldContinue) {
            // Call Groq API with optimized parameters
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: currentMessages,
                tools: groqTools.length > 0 ? groqTools : undefined,
                tool_choice: groqTools.length > 0 ? "auto" : undefined,
                temperature: 0.7,
                max_tokens: 2048, // Reduced from 4096
                stream: true,
              }),
            });

            if (!response.ok) {
              const error = await response.text();
              throw new Error(error || "Groq API error");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let assistantMessage = { role: "assistant", content: "" };
            let toolCalls = [];

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6);
                  if (data === "[DONE]") continue;

                  try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices[0]?.delta;

                    if (delta?.content) {
                      assistantMessage.content += delta.content;
                      fullResponse += delta.content;
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ text: delta.content })}\n\n`)
                      );
                    }

                    if (delta?.tool_calls) {
                      for (const toolCall of delta.tool_calls) {
                        const index = toolCall.index || 0;
                        if (!toolCalls[index]) {
                          toolCalls[index] = {
                            id: toolCall.id || `call_${Date.now()}_${index}`,
                            type: "function",
                            function: { name: "", arguments: "" },
                          };
                        }

                        if (toolCall.function?.name) {
                          toolCalls[index].function.name = toolCall.function.name;
                        }

                        if (toolCall.function?.arguments) {
                          toolCalls[index].function.arguments += toolCall.function.arguments;
                        }
                      }
                    }
                  } catch (e) {
                    // Skip parse errors for individual chunks
                    continue;
                  }
                }
              }
            }

            // Handle tool calls
            if (toolCalls.length > 0) {
              assistantMessage.tool_calls = toolCalls;
              currentMessages = [ // Reset messages for next iteration, don't accumulate
                messages[0], // Keep system prompt
                assistantMessage
              ];

              shouldContinue = true;
              const toolResults = [];

              for (const toolCall of toolCalls) {
                const toolConfig = tools.find(
                  (t) => t.name.replace(/\s+/g, "_").toLowerCase() === toolCall.function.name
                );

                if (toolConfig) {
                  try {
                    const args = JSON.parse(toolCall.function.arguments);
                    let url = toolConfig.url;

                    // Replace placeholders in URL more efficiently
                    Object.keys(args).forEach(key => {
                      const placeholder = `{${key}}`;
                      const legacyPlaceholder = `{{${key}}}`;
                      if (url.includes(placeholder)) {
                        url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(args[key]));
                      } else if (url.includes(legacyPlaceholder)) {
                        url = url.replace(new RegExp(legacyPlaceholder, 'g'), encodeURIComponent(args[key]));
                      }
                    });

                    // Add API key if needed
                    if (toolConfig.includeApiKey && toolConfig.apiKey) {
                      url += url.includes("?") ? `&key=${toolConfig.apiKey}` : `?key=${toolConfig.apiKey}`;
                    }

                    const headers = {};
                    if (toolConfig.includeApiKey && toolConfig.apiKey) {
                      headers.Authorization = `Bearer ${toolConfig.apiKey}`;
                    }

                    // Make API request with timeout
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

                    const toolResponse = await fetch(url, {
                      method: toolConfig.method || "GET",
                      headers,
                      signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    const data = await toolResponse.json();
                    const resultText = `Tool result: ${JSON.stringify(data).substring(0, 200)}`; // Limit result size
                    
                    toolResults.push({
                      role: "tool",
                      tool_call_id: toolCall.id,
                      content: resultText,
                    });

                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text: `[Tool: ${toolConfig.name}]` })}\n\n`)
                    );
                  } catch (error) {
                    console.error("Tool execution error:", error);
                    toolResults.push({
                      role: "tool",
                      tool_call_id: toolCall.id,
                      content: `Error: ${error.message}`,
                    });
                  }
                }
              }

              currentMessages.push(...toolResults);
            } else {
              shouldContinue = false;
              // No need to store the message since we're not maintaining history
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}

// Remove GET endpoint since we don't need conversation IDs anymore

export async function GET(req) {
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  conversationHistory.set(conversationId, []);
  return NextResponse.json({ conversationId });
}