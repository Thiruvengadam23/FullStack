import express from "express"
import { MongoClient,ObjectId } from "mongodb"
import cors from "cors"


const app=express()

app.use(cors())
app.use(express.json())

const uri="mongodb://127.0.0.1:27017/"
const client =new MongoClient(uri)
let collection;
async function ConnectDB(){
    await client.connect();
    console.log("MongoDb Connected Successfully")

    const db=client.db("User")
    collection=db.collection("UserTable")

    app.listen(3000,()=>{
        console.log(`Server is running on http://localhost:3000`)
    })
}

ConnectDB()

app.get("/",(request,response)=>{
    response.send("Server is Running....")
})

app.post("/users",async(request,response)=>{
    const newUser=request.body 
    await collection.insertOne(newUser)
    response.send("User Added Successfully")
})

app.get("/users",async(request,response)=>{
    const users=await collection.find().toArray()
    response.send(users)
})

app.delete("/users/:id",async(req,res)=>{
    const deleteId=req.params.id
    await collection.deleteOne({_id:new ObjectId(deleteId)})
    res.send("User deleted Successfully")
})

app.put("/users/:id",async(request,response)=>{
    const userId=request.params.id
    const updateData=request.body 
    await collection.updateOne({_id:new ObjectId(userId)},{$set:updateData})
    response.send("User Updated Successfully");
})