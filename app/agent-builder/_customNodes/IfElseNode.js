import React from 'react'
import { Handle } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { Merge } from 'lucide-react'

function IfElseNode({data}) {
    return (
        <div className='bg-white p-1 px-2 border rounded-lg'>
            <div className='flex gap-2 items-center '>
                <Merge className='h-8 w-8 p-2 rounded-lg' style={{ backgroundColor: data.bgColor }} />
                <h2>{data.label}</h2>
            </div>
            <div className='max-w-[140px] text-sm flex flex-col gap-2 my-2'>
                <Input placeholder='If Condition' disabled/>
                <Input placeholder='Else Condition' disabled />
            </div>
            <Handle type='target' position='left' />
            <Handle type='source' position='right' id='if' style={{top : 63}}/>
            <Handle type='source' position='right' id='else' style={{top : 107}}/>
        </div>
    )
}

export default IfElseNode
