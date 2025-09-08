import express from "express";
import {users} from "../data/users.mjs"
//env set up
const router = express.Router();
//These methods are called only via template view engine.


router.route("/")

//@route GET(/)
//@desc-displays a form to enter library number
//@access:public
    .get((req, res) => {
        res.render("libNum")
    })

//@route POST(/)
//@desc-gets the library number/userId from the text box in HTML form
//@access:public
    .post((req,res,next)=>{
        //get library number from the HTML form
        let libraryNum=parseInt(req.body.libraryNum);
        if(isNaN(libraryNum)){
            const err = new Error("Invalid Library Number!");
            err.status = 422;
            next(err);
        }
        let user=users.find((user)=> user.id==libraryNum);        
        if(user){
            //if user is a admin,redirect to admin page
            if(user.role=="admin"){
                return res.redirect(`/admin?name=${user.name}&role=${user.role}`);
            }
            //if user is a regular user, redirect to books page
            else{
                console.log("I am a user",user.name);
               return res.redirect(`/books/user?name=${user.name}&role=${user.role}`);
            }
        } 
        else{
            const err = new Error("Library Number not found!");
            err.status = 404;
            next(err);
        }

    })

export default router;