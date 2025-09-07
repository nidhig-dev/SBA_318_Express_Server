//Imports
import express from "express";
import booksRoute from "./routes/booksRoute.mjs"

//env set up
const app= express();
const PORT=3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//routes

app.use("/books",booksRoute);

//global error handling

app.use(function(err,req,res,next){
    res.status(err.status||500).json({msg:err.message});
})

//Incorrect path error handler
app.use((req,res)=>{
    res.status(404).json({msg:"Incorrect path entered"});
})

//Server listener
app.listen(PORT,(req,res)=>{
    console.log(`server running in port ${PORT}`);
})
