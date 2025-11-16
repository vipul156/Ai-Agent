import React from 'react'
import { Handle } from '@xyflow/react'
import { MousePointer2 } from 'lucide-react'

function AgentNode({ data }) {
    return (
        <div className='bg-white p-1 px-2 border rounded-lg'>
            <div className='flex gap-2 items-center '>
                <MousePointer2 className='h-8 w-8 p-2 rounded-lg' style={{ backgroundColor: data.bgColor }} />
                <h2>{data.label}</h2>
                <Handle type='target' position='left' />
                <Handle type='source' position='right' />
            </div>
        </div>
    )
}

export default AgentNode
