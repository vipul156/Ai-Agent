'use client'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
export const PreviewContext = React.createContext()

const PreviewProvider = ({ children }) => {
    const [currUser, setCurrUser] = React.useState()
    const { user } = useUser()

    useEffect(() => {
        user && saveData()
    }, [user])

    const saveData = async () => {
        const curr = await axios.post('/api/user', { user });
        setCurrUser(curr.data)
    }

    const [agentList, setAgentList] = React.useState()
    useEffect(() => {
        currUser && getMyAgents()
    }, [currUser])
    const getMyAgents = async () => {
        const MyAgents = await axios.get('/api/agent', { params: { email: currUser?.email } });
        setAgentList(MyAgents)
    }

    return <PreviewContext.Provider value={{ currUser, agentList, setAgentList }}>
        {children}
    </PreviewContext.Provider>
}

export const usePreview = () => React.useContext(PreviewContext)

export default PreviewProvider

