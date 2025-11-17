'use client'
import { GitBranch } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { getAllAgents } from '@/actions/useractions'

function Templates() {
  const [agentList, setAgentList ] = useState()

  if (!agentList) {
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  }

  useEffect(() => {
    getAgents()
  }, [])
  const getAgents = async () => {
    const agents = await getAllAgents()
    console.log(agents)
    setAgentList(agents)
  }

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {agentList?.map((agent, index) => (
          <div key={index} className='p-5 border rounded-2xl shadow flex justify-between'>
            <Link className='basis-4/4' href={`/agent-builder/${agent._id}`}>
                <GitBranch className='bg-yellow-100 p-2 mb-2 h-10 w-10 rounded-sm' />
                <h2 className='text-xl px-1'>{agent.name}</h2>
            </Link>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Templates
