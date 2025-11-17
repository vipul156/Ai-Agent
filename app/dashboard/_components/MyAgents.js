'use client'
import { GitBranch } from 'lucide-react'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePreview } from '@/context/PreviewContext'
import { AgentMenu } from './AgentMenu'
import { LoaderOne } from '@/components/ui/loader'

function MyAgents() {
  const { agentList } = usePreview()

  return (
    <div className='w-full'>
      {!agentList &&
        <div className="flex justify-center items-center h-[30vh]">
          <LoaderOne />
        </div>
      }
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {agentList?.data?.map((agent, index) => (
          <div key={index} className='border flex justify-between bg-white rounded-xl p-5 shadow-xl relative'>
            <Link className='basis-3/4' href={`/agent-builder/${agent._id}`}>
              <GitBranch className='bg-yellow-100 p-2 mb-2 h-10 w-10 rounded-sm' />
              <h2 className='text-xl px-1'>{agent.name}</h2>
            </Link>
            <AgentMenu className='basis-1/4' id={agent._id} />
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default MyAgents
