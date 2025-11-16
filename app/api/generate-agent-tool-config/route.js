import { NextResponse } from "next/server";
import { ai } from "@/config/Gemini";

const Prompt = `from this flow, Generate a agent instruction prompt with all details along with
tools with all setting info in JSON format. Do not add any extra text just written JSON data. make sure to mentioned paramters depends on Get or post reuqest. 
 only:{ systemPrompt:'',primaryAgentName:'', "agents": [ { "id": "agent-id", "name": "", "model": "", "includeHistory": true|false, 
 "output": "", "tools": ["toold-id"], "instruction": "" }, ],
  "tools": [ { "id": "id", "name": "", "description": "", "method": "GET"|'POST',
   "url": "", "includeApiKey": true, "apiKey": "", "parameters": { "key": "dataType" }, "usage": [ ], "assignedAgent": "" } ]}`

export async function POST(req) {

    const { jsonConfig } = await req.json();

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: JSON.stringify(jsonConfig) + Prompt,
    });
    const OutputText = response.text
    let parsedJson = JSON.parse(OutputText.replace('```json', '').replace('```', ''));

    return NextResponse.json(parsedJson);
}