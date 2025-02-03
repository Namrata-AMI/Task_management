const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");

const dbUrl = "mongodb://127.0.0.1:27017/Task";

app.use(express.json());
app.use(cors());


// create task //
app.post("/tasks",async(req,res)=>{
    try{
        const task = new Task(req.body);
        await task.save();
        res.status(200).json(task);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});


// show the takss//
app.get("/tasks", async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});


// UPdate tasks //
app.put("/tasks/:id", async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id , req.body , {new:true});
        if(!task){
            return res.status(404).json({error:"Task not found"});
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});


/// Delete Tasks //
app.delete("/tasks/:id", async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({error:"Task not found"});
        }
        res.status(200).json({message:"Task is Deleted !"});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
});


main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

app.listen(5000,()=>{
    console.log("app is listenig to port 5000");
})