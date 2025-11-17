'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../_components/Header'
import { ReactFlow } from '@xyflow/react';
import StartNode from '../../_customNodes/StartNode';
import AgentNode from '../../_customNodes/AgentNode';
import EndNode from '../../_customNodes/EndNode';
import IfElseNode from '../../_customNodes/IfElseNode';
import WhileNode from '../../_customNodes/WhileNode';
import ApiNode from '../../_customNodes/ApiNode';
import ApprovalNode from '../../_customNodes/ApprovalNode';
import ChatUi from './_components/ChatUi';
import { useParams, useRouter } from 'next/navigation';
import { getAgentbyId } from '@/actions/useractions';
import axios from 'axios';
import '@xyflow/react/dist/style.css';


const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseNode: IfElseNode,
    WhileNode: WhileNode,
    ApiNode: ApiNode,
    ApprovalNode: ApprovalNode,
};
function Preview() {
    const router = useRouter();
    const { agentId } = useParams();
    const [agent, setAgent] = useState(null)
    useEffect(() => {
        getAgent()
    }, [])

    const getAgent = async () => {
        const Agent = await getAgentbyId(agentId);
        if (!Agent) {
            router.push('/not-found')
        }
        setAgent(Agent)
    }

    return (
        <div>
            <Header previewHeader={true} agent={agent}/>
            <div className='grid grid-cols-6'>
                <div className='p-5 col-span-4 border m-5 rounded-2xl'>
                    <h2 className='px-5 pb-3 font-semibold text-gray-700'>Preview</h2>
                    <div className='bg-gray-200 rounded-2xl' style={{ width: '100%', height: '93%' }}>
                        <ReactFlow
                            nodes={agent?.nodes}
                            edges={agent?.edges}
                            fitView
                            nodeTypes={nodeTypes}
                        >
                        </ReactFlow>
                    </div>
                </div>
                <div className='col-span-2 border m-5 rounded-2xl'>
                    <ChatUi agent={agent} setAgent={setAgent}/>
                </div>
            </div>
        </div>
    )
}

export default Preview