'use client'
import React from 'react'
import CreateAgentSection from './_components/CreateAgentSection'
import AiagentTab from './_components/AiagentTab'

function Dashboard() {
  return (
    <div>
      <CreateAgentSection />
      <AiagentTab />
    </div>
  )
}

export default Dashboard