import mongoose from "mongoose"

export interface ITodo{
    title:string 
    completed : boolean 
    createdAt?: Date 
    updatedAt?: Date 
}


//schema
const todoSchema = new mongoose.Schema({
     title:{type:String, required:true, lowercase:true},
    completed :{type:Boolean, default:false}
}, {timestamps:true})



//model
export const TodoModel = mongoose.models.Todo     || mongoose.model("Todo", todoSchema )