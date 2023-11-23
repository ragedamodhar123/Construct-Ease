// const mongoose=require("mongoose");
// const connect=mongoose.connect("mongodb://localhost:27017/Rage");
require('dotenv').config();
//console.log(process.env.MONGODB_URI);


const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

.then(()=>
{
    console.log("Database connected successfully");
})
.catch((error)=>
{
    console.log("Database cannot be connected");
   // console.log(error.message);
}

)
const LoginSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }

    }
);
const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;
