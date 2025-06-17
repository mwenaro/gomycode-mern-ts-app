import express from "express"
import {config} from 'dotenv'
import cors from 'cors'
import { dbConnect } from "./db/dbConnect"
import { todoRouter } from "./routes/todoRoute"

//load env vars
config()

//variables
const PORT = process.env.PORT || 5000
const app = express()



//middlesraes
app.use(express.json())
app.use(express.urlencoded())



//db connection

dbConnect()
//routes
app.get("/", (req, res)=>{
res.json({message:"Welcome to backend"})
})
//todos route
app.use("/todos", todoRouter)




//error cathcxer
app.use((req, res)=>{
    res.status(404).json({error:"Invalid path"})
})
//start app

app.listen(PORT, ()=>console.log(`App is running on PORT ${PORT}`))