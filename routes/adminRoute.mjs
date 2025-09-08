import express from "express";
import { books } from "../data/books.mjs"
//env set up
const router = express.Router();
router.route("/")

    // These routes are called by template Engine to determine if the user is a regular user or admin.

    //@route GET(/admin)    
    //@desc-renders admin ejs view engine 
    //@access:admin
    .get((req, res) => {
        // Get the query parameter set in userRoute.mjs
        let name = req.query["name"];
        let role = req.query["role"];
        if (name && role) {
            return res.render("admin", { name: name, role: role, books });
        }
        else if (name) {
            return res.render("admin", { name: name, role: null, books });
        }
        else if (role) {
            return res.render("admin", { name: null, role: role, books });
        }
        else {
            return res.render("admin", { name: null, role: null, books });
        }
    })
export default router;
