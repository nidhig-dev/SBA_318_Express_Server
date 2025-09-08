import express from "express";

import { books } from "../data/books.mjs"
//env set up
const router = express.Router();
router.route("/")

    //@route GET(/books/admin)
    //@desc-gets book inventory in library 
    //@access:admin

    .get((req, res) => {


        //  const backUrl = req.get("Referer") || "/"; // fallback to home if no referer
        //to display the name (set in userRoute.mjs) of the user who wants to display books
        let name = req.query["name"];
        let role = req.query["role"];
        console.log(name, role);
        if (name) {
            return res.render("books", { name: name, role: role, books });
        } else {
            //   res.json(books);
            //res.render("user")
            //When url is typed without name and role passed to it
            return res.render("books", { name: null, role: null, books });
            // return res.render("books", { books});
        }
        //console.log(req.url);
        //const backUrl = req.get("Referer") || "/"; // fallback to home if no referer
        //return res.render("admin",{books});

    })

    //@route POST(/books/admin)    
    //@desc-creates new book entry in library if user is admin
    //@access:admin


    .post((req, res, next) => {
        const {name,role, title, releaseDate, description, pages, cover } = req.body;
        if (name) {
            //chk if all the data is entered by the admin
            if (title && releaseDate && description && pages && cover) {
                //chk if title exists
                if (books.find((book) => book.title == title)) {
                    res.status(409).json({ msg: "This Book already exists in the database." })
                    return;
                }
                let book = {
                    number: books.length + 1,
                    title,
                    releaseDate,
                    description,
                    pages,
                    cover
                }
                console.log(book);
                books.push(book);
                return res.render("books", { name: name, role: role, books });
            } 
            else {
                const err = new Error("Insufficient Book Data");
                err.status = 422;
                next(err);
            }

        } else {
            return res.render("books", { name: null, role: null, books });        
        }

    });


router.route("/:id")


    //@route PATCH(/books/admin/:id)
    // id is book id
    //@desc-update a book entry in library based on book id
    //@access:admin

    .patch((req, res,next) => {
        let id=req.params.id;
        const { title, releaseDate, description, pages, cover } = req.body;
        //chk if all the data is entered by the admin
        
            if (title && releaseDate && description && pages && cover) {
                let index=books.findIndex((book) => book.number == id)
                console.log(index)
                //chk if title exists
                if (index!=-1) {
                    let book = {
                        number:id,
                        title,
                        releaseDate,
                        description,
                        pages,
                        cover
                    }
                    books.splice(index,1,book);   
                    return res.json(books);                
                   
                }
                else{
                    const err = new Error("Book entry not found!");
                    err.status = 404;
                    next(err);
                }               
            }
            else {
                const err = new Error("Insufficient Book Data");
                err.status = 422;
                next(err);
            }
    })
    //@route DELETE(/books/admin/:id)
    //id is book id
    //@desc-delete a book entry from library based on book id
    //@access:admin

    .delete((req, res,next) => {
        let id = req.params.id;
        //chk if all the data is entered by the admin
            let index = books.findIndex((book) => book.number == id)
            //chk if title exists
            if (index!=-1) {
                
                books.splice(index, 1);
                return res.json(books);

            }
            else {
                const err = new Error("Book entry not found!");
                err.status = 404;
                next(err);
            }
    });


export default router;