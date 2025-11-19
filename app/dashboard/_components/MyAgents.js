'use client'
import { GitBranch } from 'lucide-react'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePreview } from '@/context/PreviewContext'
import { AgentMenu } from './AgentMenu'
import { LoaderOne } from '@/components/ui/loader'
import { motion } from 'framer-motion'

function MyAgents() {
  const { agentList } = usePreview()

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.12
      }
    }
  }

  const itemA = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 14
      }
    }
  }

  return (
    <>
      {!agentList &&
        <div className="flex justify-center items-center h-[30vh]">
          <LoaderOne />
        </div>
      }
      {agentList &&
        <div className='w-full'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            variants={container}
            initial="hidden"
            animate="show">
            {agentList.data.map((agent, index) => (
              <motion.div key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={itemA}
                className='border flex justify-between bg-white rounded-xl p-5 shadow-xl relative'>
                <Link className='basis-3/4' href={`/agent-builder/${agent._id}`}>
                  <GitBranch className='bg-yellow-100 p-2 mb-2 h-10 w-10 rounded-sm' />
                  <h2 className='text-xl px-1'>{agent.name}</h2>
                </Link>
                <AgentMenu className='basis-1/4' id={agent._id} />
              </motion.div>
            ))
            }
          </motion.div>
        </div>}
    </>
  )
}

export default MyAgents
