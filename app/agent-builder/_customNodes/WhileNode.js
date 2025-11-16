import React from 'react'
import { Handle } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { Repeat } from 'lucide-react'

function WhileNode({ data }) {
    return (
        <div className='bg-white p-1 px-2 border rounded-lg'>
            <div className='flex gap-2 items-center '>
                <Repeat className='h-8 w-8 p-2 rounded-lg' style={{ backgroundColor: data.bgColor }} />
                <h2>{data.label}</h2>
                <Handle type='source' position='right' />
            </div>
            <div className='max-w-[140px] text-sm flex flex-col gap-2 my-2'>
                <Input placeholder='While Condition' disabled />
            </div>
            <Handle type='target' position='left' />
            <Handle type='source' position='right'/>
    </div >
  )
}

export default WhileNode
