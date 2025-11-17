'use client'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, reconnectEdge, applyEdgeChanges, addEdge, Background, BackgroundVariant, Controls, MiniMap, Panel, useOnSelectionChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StartNode from '../_customNodes/StartNode';
import AgentNode from '../_customNodes/AgentNode';
import EndNode from '../_customNodes/EndNode';
import IfElseNode from '../_customNodes/IfElseNode';
import WhileNode from '../_customNodes/WhileNode';
import ApiNode from '../_customNodes/ApiNode';
import ApprovalNode from '../_customNodes/ApprovalNode';
import AgentSetting from '../_components/AgentSetting';
import AgentPanel from '../_components/AgentPanel';
import { useParams } from 'next/navigation';
import { getAgentbyId, saveNodeEdges } from '@/actions/useractions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { showToast } from 'nextjs-toast-notify';
import { LoaderOne } from '@/components/ui/loader';


function AgentBuilder() {
    const edgeReconnectSuccessful = useRef(true);
    const router = useRouter();
    const { agentId } = useParams();
    const [addedNode, setAddedNode] = useState([{
        id: 'start',
        position: { x: 0, y: 0 },
        data: { label: 'Start' },
        type: 'StartNode'
    }])
    const [nodeEdges, setNodeEdges] = useState([{ id: 'n1-n2', source: 'n1', target: 'n2' }])
    const [selectedNode, setSelectedNode] = useState([])
    const [agent, setAgent] = useState()

    useEffect(() => {
        getAgent()
    }, [])

    const getAgent = async () => {
        const Agent = await getAgentbyId(agentId);
        if (!Agent) {
            router.push('/not-found')
        }
        setAgent(Agent)
        Agent.nodes[0] && setAddedNode(Agent.nodes);
        Agent.edges[0] && setNodeEdges(Agent.edges);
    }

    const nodeTypes = {
        StartNode: StartNode,
        AgentNode: AgentNode,
        EndNode: EndNode,
        IfElseNode: IfElseNode,
        WhileNode: WhileNode,
        ApiNode: ApiNode,
        ApprovalNode: ApprovalNode,
    };

    const onNodesChange = useCallback(
        (changes) => setAddedNode((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes) => setNodeEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params) => setNodeEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onChange = useCallback(({ nodes }) => {
        setSelectedNode(nodes[0]);
    }, []);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback((oldEdge, newConnection) => {
        edgeReconnectSuccessful.current = true;
        setNodeEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);

    const onReconnectEnd = useCallback((_, edge) => {
        if (!edgeReconnectSuccessful.current) {
            setNodeEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeReconnectSuccessful.current = true;
    }, []);


    const handleSave = () => {
        saveNodeEdges(agentId, JSON.parse(JSON.stringify(nodeEdges)), JSON.parse(JSON.stringify(addedNode)))
        showToast.success("Workflow Saved", {
            duration: 4000,
            progress: true,
            position: "top-right",
            transition: "bounceIn",
            icon: '',
            sound: true,
        });
    }
    return (
        <>
            {!agent && <div className='flex justify-center items-center h-screen'>
                <LoaderOne />
            </div>
            }
            {agent &&
                <div>
                    <Header agent={agent} />
                    <div style={{ width: '100vw', height: '91vh' }}>
                        <ReactFlow
                            nodes={addedNode}
                            edges={nodeEdges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            onSelectionChange={onChange}
                            snapToGrid
                            onReconnect={onReconnect}
                            onReconnectStart={onReconnectStart}
                            onReconnectEnd={onReconnectEnd}
                            fitView
                            attributionPosition="top-right"
                        >
                            <Controls />
                            <MiniMap />
                            <Background
                                id="1"
                                gap={25}
                                color="#f1f1f1"
                                variant={BackgroundVariant.Lines}
                            />
                            <Panel position="top-left" >
                                <AgentPanel addedNode={addedNode} setAddedNode={setAddedNode} />
                            </Panel>
                            <Panel position="top-right" >
                                <AgentSetting selectedNodes={selectedNode} setAddedNode={setAddedNode} />
                            </Panel>
                        </ReactFlow>
                    </div>
                    <div className='fixed bottom-10 left-1/2 transition-x-1/2'><Button onClick={handleSave} className={'p-5 text-2xl'}>Save</Button></div>
                </div>
            }
        </>
    )
}

export default AgentBuilder
