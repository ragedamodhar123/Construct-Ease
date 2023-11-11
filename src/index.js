const express=require('express');
const pasth=require("path");
const bcrypt=require("bcrypt");
const app=express();
const collection=require("./config");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const path=require('path');


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("login")
});
app.get("/signup",(req,res)=>
{
    res.render("signup");
});

app.post("/signup",async (req,res)=>
{
    const data={
        name:req.body.username,
        password:req.body.password
    }


    const existingUser=await collection.findOne({name:data.name});
    if(existingUser)
    {
        res.send("User already exists. Please choose a different Username.");
    }
    else
    {
        const saltRounds=10;
        const hashedpassword=await bcrypt.hash(data.password,saltRounds);
        data.password=hashedpassword;
        const userdata=await collection.insertMany(data);
    console.log(userdata);
    }
});

app.post("/login",async(req,res)=>
{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check)
        {
            res.send("user name cannot find");
        }
        const ispasswordmatch=await bcrypt.compare(req.body.password,check.password);
        if(ispasswordmatch)
        {
            res.render("Home");
        }
        else
        {
            res.send("Wrong Password");
        }
    }
    catch
    {
        res.send("Wrong Details");
    }
})



const port=3001;
app.listen(port,()=>
{
    console.log(`Server running on port : ${port}`);
});
