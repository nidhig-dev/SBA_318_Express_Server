//Imports
import express from "express";
import booksAdminRoute from "./routes/booksAdminRoute.mjs";
import booksUserRoute from "./routes/booksUserRoute.mjs";
import userRoute from "./routes/userRoute.mjs";
import adminRoute from "./routes/adminRoute.mjs";
import borrowBookRoute from "./routes/borrowBookRoute.mjs";
import morgan from "morgan";
import {roleAuth} from "./middleware/chkAdminAuth.mjs";
import {countRequests} from "./middleware/countRoute.mjs";

//env set up
const app= express();
const PORT=3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(morgan('tiny'));
app.use(countRequests);

//set EJS as template view engine
app.set("view engine","ejs");
app.set("views","./views");

//routes

app.use("/books/user",booksUserRoute);
// middleware to chk if user is a admin
app.use("/books/admin",roleAuth(),booksAdminRoute);
// middleware to chk if user is a admin
app.use("/admin/borrow", roleAuth(),borrowBookRoute);
app.use("/",userRoute);
app.use("/admin",adminRoute)

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
