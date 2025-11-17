'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2Icon, RefreshCwIcon, Send } from 'lucide-react'
import { GenerateWorkflow } from '@/config/AgentFlow'
import axios from 'axios'
import { updateConfig } from '@/actions/useractions'
import Markdown from 'react-markdown'

function ChatUi({ agent, setAgent }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState([])
  const [userInput, setUserInput] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(false)

  const onSendMdg = async () => {
    setLoadingMsg(true)
    setMessage([...message, { role: 'user', content: userInput }])
    setUserInput('')
    const result = await fetch('/api/agent-chat', {
      method: 'POST',
      heaaders: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agentName: agent?.name,
        agents: agent?.agentConfigTool?.agents || [],
        tools: agent?.agentConfigTool?.tools || [],
        input: userInput,
      })
    })

    if (!result.body) return
    const reader = result.body.getReader()
    const decoder = new TextDecoder()
    let done = false

    // Add initial assistant message with empty content
    setMessage((prev) => [...prev, { role: 'assistant', content: '' }])

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading

      if (value) {
        const chunk = decoder.decode(value)

        // Split by newlines to handle multiple SSE messages in one chunk
        const lines = chunk.split('\n')

        for (const line of lines) {
          // Check if line starts with 'data: '
          if (line.startsWith('data: ')) {
            const data = line.slice(6) // Remove 'data: ' prefix

            // Skip [DONE] message
            if (data === '[DONE]') {
              continue
            }

            try {
              // Parse JSON data
              const parsed = JSON.parse(data)

              // Update message with the text content
              if (parsed.text) {
                setMessage((prev) => {
                  const updated = [...prev]
                  const lastIndex = updated.length - 1
                  updated[lastIndex] = {
                    role: 'assistant',
                    content: (updated[lastIndex]?.content || '') + parsed.text
                  }
                  return updated
                })
              }

              // Handle errors if any
              if (parsed.error) {
                console.error('Stream error:', parsed.error)
                setMessage((prev) => {
                  const updated = [...prev]
                  const lastIndex = updated.length - 1
                  updated[lastIndex] = {
                    role: 'assistant',
                    content: `Error: ${parsed.error}`
                  }
                  return updated
                })
              }
            } catch (e) {
              // Ignore parse errors for malformed chunks
              console.warn('Failed to parse chunk:', data)
            }
          }
        }
      }
    }
    setLoadingMsg(false)
  }

  // Replace this with your real handler
  const handleClick = () => {
    if (agent.nodes.length > 0 && agent.edges.length > 0) {
      const workflow = GenerateWorkflow(agent);
      GenerateAgentToolConfig(workflow)
    }
  }
  const GenerateAgentToolConfig = async (workflow) => {
    setLoading(true)
    const result = await axios.post('/api/generate-agent-tool-config', {
      jsonConfig: workflow
    });
    const res = await updateConfig(agent._id, result.data)
    console.log(result)
    setAgent(res)
    setLoading(false)
  }


  return (
    <div className="flex flex-col h-[86.5vh] w-full border rounded-md overflow-hidden">
      <div className='flex justify-between items-center border-b p-4'>
        <h2>{agent?.name}</h2>
        {!agent?.agentConfigTool &&
          <Button onClick={handleClick}

            disabled={loading}
          > <RefreshCwIcon className={`${loading && 'animate-spin'}`} /> Reboot Agent</Button>}
      </div>
      {agent?.agentConfigTool &&
        <div className='w-full  h-[80vh] p-4 flex flex-col'>

          {/* Message Section */}
          <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
            {message.map((msg, index) => (
              <div key={index} className='p-2 flex rounded-lg max-w-[80%]'
                style={{
                  backgroundColor: msg.role === 'user' ? '#2563eb' : '#d1d5db',
                  color: msg.role === 'user' ? 'white' : 'black',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div className='text-sm wrap-break-word whitespace-pre-wrap overflow-hidden'>
                <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            ))}

            {/* Loading state */}
            {loadingMsg &&
              <div className='flex justify-center items-center p-4'>
                <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-800'></div>
                <span className='ml-2 text-zinc-800'>Thinking... Working on your request</span>
              </div>}
          </div>

          {/* Footer Input */}
          <div className='p-1 mt-3 border-t flex items-center gap-2'>
            <textarea
              onChange={(event) => setUserInput(event.target.value)} value={userInput}
              placeholder='Type your message here...'
              className='flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2'
            />
            <Button onClick={onSendMdg} disabled={loadingMsg || !userInput.trim().length}>
              {loadingMsg && <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />}
              <Send /></Button>
          </div>
        </div>}
    </div>
  )
}

export default ChatUi
