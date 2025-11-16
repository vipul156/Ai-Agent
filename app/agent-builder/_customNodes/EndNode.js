import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { StopCircle } from 'lucide-react'

function EndNode({ data }) {
    return (
        <div className='bg-white p-1 px-2 border rounded-lg'>
            <div className='flex gap-2 items-center '>
                <StopCircle className='h-8 w-8 p-2 rounded-lg' style={{ backgroundColor: data.bgColor }} />
                <h2>{data.label}</h2>
                <Handle type='target' position={Position.Left} />
            </div>
        </div>
    )
}

export default EndNode
