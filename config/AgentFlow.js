// GenerateWorkflow.js
// Builds a complete flow configuration for the AI Agent Builder

export const GenerateWorkflow = (agentDetail, setConfig) => {
    if (!agentDetail) {
        console.warn("⚠️ No agentDetail provided");
        return null;
    }

    // 🧩 Build Edge Map (for quick lookup)
    const edgeMap = (agentDetail.edges || []).reduce((acc, edge) => {
        if (!acc[edge.source]) acc[edge.source] = [];
        acc[edge.source].push(edge);
        return acc;
    }, {});

    // 🔄 Build Flow Configuration
    const flow = (agentDetail.nodes || []).map((node) => {
        const connectedEdges = edgeMap[node.id] || [];
        let next = null;

        switch (node.type) {
            // 🧭 Conditional branching
            case "IfElseNode": {
                const ifEdge = connectedEdges.find((e) => e.sourceHandle === "if");
                const elseEdge = connectedEdges.find((e) => e.sourceHandle === "else");

                next = {
                    if: ifEdge ? ifEdge.target : null,
                    else: elseEdge ? elseEdge.target : null,
                };
                break;
            }

            // 🧠 Agent or AI Node
            case "AgentNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e) => e.target);
                }
                break;
            }

            // 🔗 API Call Node
            case "ApiNode":
            case "UserApprovalNode":
            case "StartNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // 🏁 End Node
            case "EndNode": {
                next = null; // No next node
                break;
            }

            // 🔧 Default handling
            default: {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e) => e.target);
                }
                break;
            }
        }

        return {
            id: node.id,
            type: node.type,
            label: node.data?.label || node.type,
            settings: node.data?.settings || {},
            next,
        };
    });

    // 🎯 Identify Start Node
    const startNode = (agentDetail.nodes || []).find((n) => n.type === "StartNode");

    // 🧱 Final Config
    const config = {
        startNode: startNode ? startNode.id : null,
        flow,
    };
    return config;
};