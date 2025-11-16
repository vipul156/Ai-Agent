import { Schema, model, models } from "mongoose";
import { boolean } from "zod/v4";

const AgentsSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    publish :{
        type: Boolean,
        default: false
    },
    nodes : {
        type: Array,
    },
    edges : {
        type: Array,
    },
    agentConfigTool :{
        type: Object,
    },
    userEmail :{
        type: String,
        default : 'ak4780321@gmail.com'
    }
})

export default models.Agents || model('Agents', AgentsSchema)