import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("DB connected successfully")
        
    } catch (error:any) {
        console.log(`DB connection error = > ${error.message}`)
    }
}