import { Button } from '@/components/ui/button'
import { ChevronLeft, Code, Upload, Play, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Publish from '../[agentId]/preview/_components/Publish'

function Header({agent, previewHeader = false}) {
  return (
    <div className='w-full p-3 flex justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href={previewHeader ? `/agent-builder/${agent?._id}` : '/dashboard'}><ChevronLeft className='h-8 w-8' /></Link>
        <h2 className='text-xl'>{agent?.name}</h2>
      </div>
      <div className='flex gap-2'>
        <Button variant={'ghost'}><Code/>Code</Button>
        {!previewHeader && <Link href={`/agent-builder/${agent?._id}/preview`}><Button><Play/>Preview</Button></Link>}
        {previewHeader && <Link href={`/agent-builder/${agent?._id}`}><Button variant={'outline'}><X/>Close Preview</Button></Link>}
        <Publish/>
      </div>
    </div>
  )
}

export default Header
