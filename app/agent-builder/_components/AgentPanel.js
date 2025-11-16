import { Merge, MousePointer2, Repeat, StopCircleIcon, ThumbsUp, Webhook } from 'lucide-react'
import React from 'react'

const AgentTools = [
    {
        name: 'Agent',
        icon: MousePointer2,
        bgColor: '#cdf7e3',
        id: 'agent',
        type: 'AgentNode',
    },
    {
        name: 'End',
        icon: StopCircleIcon,
        bgColor: '#ffe3e3',
        id: 'end',
        type: 'EndNode',
    },
    {
        name: 'If/Else',
        icon: Merge,
        bgColor: '#fff3cd',
        id: 'ifelse',
        type: 'IfElseNode',
    },
    {
        name: 'While',
        icon: Repeat,
        bgColor: '#e3f2fd',
        id: 'while',
        type: 'WhileNode',
    },
    {
        name: 'User Approval',
        icon: ThumbsUp,
        bgColor: '#d1f0ff',
        id: 'approval',
        type: 'ApprovalNode',
    },
    {
        name: 'Api',
        icon: Webhook,
        bgColor: '#e3fdcf',
        id: 'api',
        type: 'ApiNode',
    }
]
function AgentPanel({addedNode, setAddedNode}) {
    const handleAgentClick = (tool) => {
        const newNode = {id:`${tool.id}-${Date.now()}`, position: { x: 0, y: 0 },  data: { label: tool.name, ...tool }, type: tool.type}
        setAddedNode([...addedNode, newNode])
    }
    return (
        <div className='bg-white p-5 rounded-2xl shadow'>
            <h2 className='font-semibold mb-4 text-gray-700'>AI Agent Tools</h2>
            <div>
                {AgentTools.map((tool, index) => (
                    <div key={index} onClick={()=>handleAgentClick(tool)} className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200'>
                        <tool.icon className='p-2 rounded-lg h-8 w-8' 
                        style={{ backgroundColor: tool.bgColor }}/>
                        <h2 className='text-sm font-medium'>{tool.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentPanel
