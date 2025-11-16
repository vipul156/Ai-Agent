'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import React from 'react'

import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockFilename,
    CodeBlockFiles,
    CodeBlockHeader,
    CodeBlockItem,
    CodeBlockSelect,
    CodeBlockSelectContent,
    CodeBlockSelectItem,
    CodeBlockSelectTrigger,
    CodeBlockSelectValue,
} from '@/components/ui/shadcn-io/code-block';
import {publishAgent} from '@/actions/useractions'

const code = [
    {
        language: 'jsx',
        filename: 'MyComponent.jsx',
        code: `const result = await fetch('/api/agent-chat', {
    method: 'POST',
    heaaders: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        agentName: agent?.name,
        agents: agent?.agentConfigTool?.agents || [],
        tools: agent?.agentConfigTool?.tools || [],
        input: userInput,
        conversationId: coversationId
    })
})

if (!result.body) return
const reader = result.body.getReader()
const decoder = new TextDecoder()
let done = false
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
                                content: 'Error: {parsed.error}'
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
}`,
    },
];


function Publish() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={async() => { await publishAgent(agent?._id) }}><Upload />Publish</Button>
            </DialogTrigger>

            <DialogContent style={{ maxWidth: '60vw', maxHeight: '80vh' }}>
                <DialogHeader>
                    <DialogTitle>Get Code</DialogTitle>
                    <DialogDescription>
                        <CodeBlock data={code} defaultValue={code[0].language}>
                            <CodeBlockHeader>
                                <CodeBlockFiles>
                                    {(item) => (
                                        <CodeBlockFilename key={item.language} value={item.language}>
                                            {item.filename}
                                        </CodeBlockFilename>
                                    )}
                                </CodeBlockFiles>

                                <CodeBlockSelect>
                                    <CodeBlockSelectTrigger>
                                        <CodeBlockSelectValue />
                                    </CodeBlockSelectTrigger>
                                    <CodeBlockSelectContent>
                                        {(item) => (
                                            <CodeBlockSelectItem key={item.language} value={item.language}>
                                                {item.language}
                                            </CodeBlockSelectItem>
                                        )}
                                    </CodeBlockSelectContent>
                                </CodeBlockSelect>

                                <CodeBlockCopyButton
                                    onCopy={() => console.log('Copied code to clipboard')}
                                    onError={() => console.error('Failed to copy')}
                                />
                            </CodeBlockHeader>

                            {/* ✅ Make the code scrollable */}
                            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                                <CodeBlockBody>
                                    {(item) => (
                                        <CodeBlockItem key={item.language} value={item.language}>
                                            <CodeBlockContent language={item.language}>
                                                {item.code}
                                            </CodeBlockContent>
                                        </CodeBlockItem>
                                    )}
                                </CodeBlockBody>
                            </div>

                        </CodeBlock>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Publish