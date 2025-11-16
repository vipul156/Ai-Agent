import { Button } from '@/components/ui/button'
import React from 'react'
import { Handle } from '@xyflow/react'
import { ThumbsUp } from 'lucide-react'

function ApprovalNode({ data }) {
    return (
        <div className='bg-white p-1 px-2 border rounded-lg'>
            <div className='flex gap-2 items-center '>
                <ThumbsUp className='h-8 w-8 p-2 rounded-lg' style={{ backgroundColor: data.bgColor }} />
                <h2>{data.label}</h2>
            </div>
            <div className='max-w-[140px] text-sm flex flex-col gap-2 my-2'>
                <Button variant={'outline'} disabled>Approve</Button>
                <Button variant={'outline'} disabled>Reject</Button>
            </div>
            <Handle type='target' position='left' />
            <Handle type='source' position='right' id='approve' style={{ top: 63 }} />
            <Handle type='source' position='right' id='reject' style={{ top: 107 }} />
        </div>
    )
}

export default ApprovalNode
