import { model, models, Schema } from "mongoose"

const UsersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    imgUrl :{
        type: String,
    },
    subsription :{
        type: Boolean,
        default: false
    },
    token :{
        type: String,
    },
    createdAt :{
        type: Date,
        default: Date.now
    },
    updatedAt :{
        type: Date,
        default: Date.now
    }
})

export default models.Users || model("Users", UsersSchema)