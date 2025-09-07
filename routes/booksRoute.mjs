//imports
import express from "express";
import { books } from "../data/books.mjs";
//env set up
const router = express.Router();

router.route("/")

    //@route GET(/books)
    //@desc-gets all the books in library
    //@access:public and admin
    .get((req, res) => {
        //to display the name of the user who wants to display books
        let name=req.query["name"];
        if(name){
            res.render("books", { name:name,books });
        }else{    
        //  res.json(books);
       // res.render("user")
        res.render("books", { name:null,books });
    }
    });

router.route("/user/id/:id")
    //@route GET(/books/user/id/:id)
    //id= number matching book id
    //@desc-gets one book in library based on book id
    //@access:public and admin

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

router.route("/user/name/:name")
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

router.route("/admin/:id")

    //@route .post(/books/admin/:id)
    //id=admin id
    //@desc-creates new book entry in library if user is admin
    //@access:admin

    .post((req, res, next) => {
        //const number=req.body["number"];
        console.log(req.params.id);
        if (req.params.id == 1) {
            const { title, releaseDate, description, pages, cover } = req.body;
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
                books.push(book);
                res.json(books);
            }
            else {
                const err = new Error("Insufficient Book Data");
                err.status = 422;
                next(err);
            }
        } else {
            console.log(`id is ${req.params.id}`);
            const err = new Error("Only admin can create a new data entry");
            err.status = 403;
            next(err);
        }

    })

    //@route .patch(/books/admin/:id/book/:id)
    //first id is admin id and second id is book id
    //@desc-update a book entry in library
    //@access:admin

    .patch((req, res) => {

    })
    //@route .delete(/books/admin/:id/book/:id)
    //first id is admin id and second id is book id
    //@desc-delete a book entry from library based on book id
    //@access:admin

    .delete((req, res) => {

    });


export default router;
