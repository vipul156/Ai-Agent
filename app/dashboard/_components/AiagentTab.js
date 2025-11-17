import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyAgents from './MyAgents'
import Templates from './Templates'

function AiagentTab() {
    return (
        <div className='px-10 md:px-24 lg:px-32 mt-5'>
            <Tabs defaultValue="agents" className="w-full my-2">
                <TabsList className={'border-2 border-black bg-gray-300'}>
                    <TabsTrigger value="agents">My Agents</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="agents"><MyAgents/></TabsContent>
                <TabsContent value="templates"><Templates/></TabsContent>
            </Tabs>
        </div>
    )
}

export default AiagentTab