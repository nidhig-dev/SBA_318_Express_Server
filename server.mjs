//Imports
import express from "express";
import booksRoute from "./routes/booksRoute.mjs"
import userRoute from "./routes/userRoute.mjs"

//env set up
const app= express();
const PORT=3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//set EJS as template view engine
app.set("view engine","ejs");
app.set("views","./views");

//routes

app.use("/books",booksRoute);
app.use("/",userRoute);

//global error handling

app.use(function(err,req,res,next){
    res.status(err.status||500).json({msg:err.message});
})

//Incorrect path error handler route. It triggers when none of the routes match.
app.use((req,res)=>{
    res.status(404).json({msg:"Incorrect path entered"});
})

//Server listener
app.listen(PORT,(req,res)=>{
    console.log(`server running in port ${PORT}`);
})
