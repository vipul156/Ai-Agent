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
        <div className='flex flex-col justify-center items-center mt-24 gap-2'>
            <h2 className='text-2xl font-bold'>Create Your Own AI Agent</h2>
            <p className='text-lg'>Build a AI Agent workflow with custom logics and tools</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'lg'}><Plus />Create</Button>
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
    )
}

export default CreateAgentSection