"use client"

import { useState } from "react"
import { Copy, MoreHorizontalIcon, Share2, Trash2 } from "lucide-react"
import { showToast } from "nextjs-toast-notify"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { deleteAgent } from "@/actions/useractions"
import { usePreview } from "@/context/PreviewContext"

export function AgentMenu({ id }) {
    const [showNewDialog, setShowNewDialog] = useState(false)
    const [showShareDialog, setShowShareDialog] = useState(false)
    const { setAgentList } = usePreview();

    const handleDelete = async () => {
        await deleteAgent(id);
        setAgentList(prev => ({
            ...prev,
            data: (prev?.data || []).filter(a => a._id !== id)
        }));
        showToast.success('Agent deleted successfully');
    }

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" aria-label="Open menu" size="icon-sm">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className={'flex justify-between'} onSelect={() => setShowNewDialog(true)}>
                            Delete <Trash2 />
                        </DropdownMenuItem>
                        <DropdownMenuItem className={'flex justify-between'} onSelect={() => setShowShareDialog(true)}>
                            Share <Share2 />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Agent</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this agent?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleDelete} className={'bg-red-600 hover:bg-red-700'} type="submit">Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Share Agent</DialogTitle>
                        <DialogDescription>
                            Share this agent with others
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Input value={`${process.env.NEXT_PUBLIC_URL}/agent-builder/${id}`} disabled />
                        <DialogClose asChild>
                            <Button onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/agent-builder/${id}`)} variant="outline"><Copy /></Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
