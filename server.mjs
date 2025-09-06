//Imports
import express from "express"

//env set up
const app= express();
const PORT=3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//routes



//global error handling

app.use(function(err,req,res,next){
    res.status(err.status||500).json({msg:err.message})
})

//Incorrect path error handler
app.use((req,res,next)=>{
    res.status(404).json({msg:"Incorrect path entered"});
})

//Server listener
app.listen(PORT,(req,res)=>{
    console.log(`server running in port ${PORT}`);
})
