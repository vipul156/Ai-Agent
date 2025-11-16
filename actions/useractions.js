'use server'
import Users  from "@/models/Users"
import connectDB from "@/db/ConnectDB";
import Agents  from "@/models/Agents"

export const createUser = async (user) => {
        await connectDB();
        const u = await Users.findOne({ email: user.primaryEmailAddress?.emailAddress });
        if (u) {
            return u;
        }
        const newUser = await Users.create({
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
        });
        return newUser;
};

export const createAgent = async(email, name) => {
    await connectDB();
    const newAgent = await Agents.create({
        name: name,
        userEmail: email,
    });
    return newAgent;
}

export const getAgent = async(email) => {
    await connectDB();
    const agent = await Agents.find({ userEmail: email });
    return agent;
}

export const getAgentbyId = async(id) => {
    try{
    await connectDB();
    const agent = await Agents.findById(id);
    return JSON.parse(JSON.stringify(agent));
    }catch(e){
        return null
    }
}

export const saveNodeEdges = async (agentId, edges, nodes) => {
    await connectDB();
    const agent = await Agents.findByIdAndUpdate(
    agentId,{
        edges: edges,
        nodes: nodes
    });
    return {saved : true};
}

export const deleteAgent = async (agentId) => {
    await connectDB();
    const agent = await Agents.findByIdAndDelete(agentId);
    return {deleted : true};
}

export const updateConfig = async (agentId, config) => {
    await connectDB();
    const agent = await Agents.findByIdAndUpdate(agentId, { agentConfigTool: config }, { new: true });
    return JSON.parse(JSON.stringify(agent))
}

export const publishAgent = async (agentId) => {
    await connectDB();
    const agent = await Agents.findByIdAndUpdate(agentId, { publish: true }, { new: true });
}