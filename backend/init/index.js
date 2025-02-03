const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/Task";
const initData = require("./data");
const Task = require("../models/task");

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

const initDB = async()=>{
    await Task.deleteMany({});
    initData.tasks = initData.tasks.map((obj)=>({
        ...obj,
        owner:'6606423fd4b7ebd8ad6efbc1',
    }));
    await Task.insertMany(initData.tasks);
    console.log("data was initialised");
}

initDB();
console.log(initData);