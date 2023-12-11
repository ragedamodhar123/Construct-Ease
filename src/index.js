const express=require('express');
const pasth=require("path");
const bcrypt=require("bcrypt");
const app=express();
const collection=require("./config");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const path=require('path');


app.use(express.static('src/views'));
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
app.get('/model', (req, res) => {

   res.render('model');
});
app.get('/model1', (req, res) => {

    res.render('model1');
 });
    app.get('/model3', (req, res) => {
    
        res.render('model3');
    });

app.post("/signup",async (req,res)=>
{
    const data={
        name:req.body.username,
        password:req.body.password
    }


    const existingUser=await collection.findOne({name:data.name}).maxTimeMS(30000);
    if(existingUser)
    {
       return  res.status(400).send("User already exists. Please choose a different Username.");
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
        const check=await collection.findOne({name:req.body.username}).maxTimeMS(30000);
        if(!check)
        {
            res.send("user name cannot find");
        }
        const ispasswordmatch=await bcrypt.compare(req.body.password,check.password);
        if(ispasswordmatch)
        {
            res.render("home");
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

