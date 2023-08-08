const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const compiler=require("compilex")
const options={stats:true}

compiler.init(options)
app.use(bodyParser.json());
app.use("/codemirror",express.static("C:/Users/Shirish Shetty/OneDrive/Desktop/Code Complier/codemirror"))

app.get("/",function(req,res){
    compiler.flush(function(){
        console.log("deleted");
    })
    res.sendFile("C:/Users/Shirish Shetty/OneDrive/Desktop/Code Complier/index.html")
})

app.get("/app",function(req,res){

res.sendFile("C:/Users/Shirish Shetty/OneDrive/Desktop/Code Complier/app.html")
})
app.post("/compile",function(req,res){
   
   var code=req.body.code
   var input=req.body.input
   var lang=req.body.lang
   try {
    if(lang=="Cpp")
    {
        if(!input){
            var envData = { OS : "windows" , cmd : "g++" ,options:{timeout:10000}}; // (uses g++ command to compile )
            compiler.compileCPP(envData , code , function (data) {
                if(data.output)
                 {
               res.send(data)
                 }
                else
                 {
             res.send({output:"error"})
                }
                //data.error = error message 
                //data.output = output value
            });
        }
        else{
            var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
        
            compiler.compileCPPWithInput(envData , code , input , function (data) {
                if(data.output)
                {
                 res.send(data)
                }
                else
                {
                res.send({output:"error"})
                }
            });
        }
    }
    else if(lang=="Java")
    {
        if(!input)
        {
            var envData = { OS : "windows"}; 
            compiler.compileJava( envData , code , function(data){
                if(data.output)
                {
                res.send(data)
                }       
                else
                {
                res.send({output:"error"})
                }
            });    
        }
        else{
                //if windows  
             var envData = { OS : "windows"}; 
              compiler.compileJavaWithInput( envData , code , input ,  function(data){
               if(data.output)
                {
                 res.send(data)
                }
                else
                {
                 res.send({output:"error"})
                }
            });
        }
    }
    else if(lang=="Python")
    {
        if(!input)
        {
            var envData = { OS : "windows"}; 
          
            compiler.compilePython( envData , code , function(data){
                if(data.output)
                {
                res.send(data)
                }       
                else
                {
                res.send({output:"error"})
                }
            });    
        }
        else{
            var envData = { OS : "windows"}; 
        
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                if(data.output)
                {
                res.send(data)
                }       
                else
                {
                res.send({output:"error"})
                }        
            });
        }
    }
    
   } catch (error) {
    console.log(error);
   }  
})
app.listen(8000,(req,res)=>{
    console.log("LISTENING ON PORT")
})