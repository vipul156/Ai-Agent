'use client'
import React from 'react'
import CreateAgentSection from './_components/CreateAgentSection'
import AiagentTab from './_components/AiagentTab'

function Dashboard() {
  return (
    <div className='bg-gray-100 min-h-[91.5vh]'>
      <CreateAgentSection />
      <AiagentTab />
    </div>
  )
}

export default Dashboard