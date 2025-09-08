//imports
import express from "express";
import { books } from "../data/books.mjs";
//env set up
const router = express.Router();

router.route("/")

    //@route GET(/books/user)
    //@desc-gets all the books in library
    //@access:public
    .get((req, res) => {
        //to display the name dynamically on books.ejs of the user who wants to see all the books (set in userRoute.mjs)
        let name = req.query["name"];
        let role = req.query["role"];
        
        if (name && role) {
            return res.render("books", { name: name, role: role, books });
        }
        else if (name) {
            return res.render("books", { name: name, role: null, books });
        }
        else if (role) {
            return res.render("books", { name: null, role: role, books });
        }
        else {
            //When url is typed without query parameters 'name' and 'role' passed to it through thunderclient/postman
            return res.render("books", { name: null, role: null, books });           
        }
    });

router.route("/id/:id")
    //@route GET(/books/user/id/:id)
    //id= number matching book id
    //@desc-gets one book in library based on book id
    //@access:public

    .get((req, res, next) => {
        const number = req.params.id;
        let book = books.find((book) => book.number == number);
        if (book) {
            res.json(book);

        } else {
            const err = new Error("No Book found!");
            err.status = 404;
            next(err);
        }

    });

//@route .get(/books/user/name/:name)
//name= string  
//@desc-gets all books in library whose title begins with 'name'
//@access:public

router.route("/name/:name")
    .get((req, res, next) => {
        let name = req.params.name.toLowerCase();
        let newBookArr = [];
        newBookArr = books.filter((book) => book.title.toLowerCase().startsWith(name));
        if (newBookArr.length > 0) {
            res.json(newBookArr);
        } else {
            const err = new Error("No Book found!");
            err.status = 404;
            next(err);
        }
    })


export default router;
