import { Handle } from '@xyflow/react'
import { Play } from 'lucide-react'
import React from 'react'

function StartNodes() {
  return (
    <div className='bg-white p-1 px-2 border rounded-lg'>
      <div className='flex gap-2 items-center '>
        <Play className='h-8 w-8 p-2 bg-yellow-300 rounded-lg'/>
        <h2>Start</h2>
        <Handle type='source' position='right'/>
      </div>
    </div>
  )
}

export default StartNodes
