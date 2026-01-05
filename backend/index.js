let express = require('express');
let mongoose = require('mongoose');
let app = express();
let TaskSchema = require('./model');
let cors = require('cors');



mongoose.connect("mongodb+srv://mern_user:backend123@cluster0.gt54d7r.mongodb.net/?appName=Cluster0").then(
    ()=> console.log("DB Connected")
)
 app.use(express.json());

 app.use(cors({
    origin : '*'
 }))

app.post('/addTask', async(req, res) =>{
    let {todo} = req.body;
    try{
     let newData = new TaskSchema({
        todo : todo
     });
     await newData.save();
     return res.json(await TaskSchema.find());
    }
    catch(err){
    console.log(err);
    }
})

app.get('/getTask', async(req, res) =>{
    try{
    return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.delete('/deleteTask/:id', async(req, res) =>{
    try{
    await TaskSchema.findByIdAndDelete(req.params.id);
    return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.listen(5000, () => console.log('server running...'));