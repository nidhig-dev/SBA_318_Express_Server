import express from "express";
import {books} from "../data/books.mjs"
//env set up
const router = express.Router();
router.route("/")

// These routes are called by template Engine to determine if the user is a regular user or admin.
    
//@route GET(/admin)    
//@desc-renders admin ejs view engine 
//@access:admin
.get((req, res) => {
    //to display the query parameters (set in userRoute.mjs) of the user who wants to display books
    let name = req.query["name"];
    let role = req.query["role"];
    if (name) {
        return res.render("admin", { name: name, role: role, books });
    } else {
        
        //When url is typed without name and role passed to it
        return res.render("admin", { name: null, role: null, books });
        // return res.render("books", { books});
    }
    //console.log(req.url);
    //const backUrl = req.get("Referer") || "/"; // fallback to home if no referer
    //return res.render("admin",{books});

})
export default router;
