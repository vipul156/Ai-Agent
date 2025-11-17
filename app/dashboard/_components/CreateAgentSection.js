'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { usePreview } from '@/context/PreviewContext'
import { showToast } from 'nextjs-toast-notify'
import Image from 'next/image'

function CreateAgentSection() {
    const { currUser, setAgentList } = usePreview()
    const router = useRouter();
    const [agentName, setAgentName] = React.useState('')

    const onChange = (e) => {
        setAgentName(e.target.value)
    }

    const handleAgent = async () => {
        const agent = await axios.post('/api/agent', { name: agentName, email: currUser?.email });
        setAgentList(prev => ({
            ...prev,
            data: [...(prev?.data || []), agent.data]
        }));

        showToast.success("New Agent Created", {
            duration: 4000,
            progress: true,
            position: "top-right",
            transition: "bounceIn",
            icon: '',
            sound: true,
        });
        router.push('/agent-builder/' + agent.data._id);
    }
    return (
        <div className='px-10 md:px-24 lg:px-32 mt-1 flex justify-between items-center'>
            <div>
                <h2 className='text-4xl mb-2 font-bold'>Build Powerful AI Agents with Ease</h2>
                <p className='text-xl mb-10'>Craft Intelligent workflow instantly</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-blue-900 text-white shadow-inner">
                            <span className="text-2xl">+</span>
                            <span className="font-medium">Create New Agent</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter Agent Name</DialogTitle>
                            <DialogDescription>
                                <Input onChange={onChange} type="text" placeholder='Agent Name' />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={handleAgent}>Create</Button>
                            <DialogClose className='text-red-600'>
                                Cancle
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Image src="/ai-agent.png" width={300} height={300} alt="agent" />
        </div>
    )
}

export default CreateAgentSection