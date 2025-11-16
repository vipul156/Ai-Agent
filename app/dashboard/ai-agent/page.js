import React from 'react'
import MyAgents from '../_components/MyAgents'

function AiAgents() {
  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold pb-5'>AI Agents</h2>
      </div>
      <MyAgents />
    </div>
  )
}

export default AiAgents
