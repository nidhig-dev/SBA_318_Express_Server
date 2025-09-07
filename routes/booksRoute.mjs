//imports
import express from "express";
import { books } from "../data/books.mjs";
//env set up
const router = express.Router();


router.route("/")

    //@route .get(/books)
    //@desc-gets all the books in library
    //@access:public
    .get((req, res) => {
        res.json(books);

    });

router.route("/:id")
    //@route .get(/books/:id)
    //id=book id
    //@desc-gets one book in library based on book id
    //@access:public
    
    .get((req, res) => {

    })

    //@route .post(/books/:id)
    //id=admin id
    //@desc-creates new book entry in library if user is admin
    //@access:admin

    .post((req, res,next) => {
        //const number=req.body["number"];
        if (req.params.id == 1) {
            const { title, releaseDate, description, pages, cover, copies } = req.body;
            //chk if all the data is entered by the admin
            if (title && releaseDate && description && pages && cover && copies) {
                //chk if title exists
                if(books.find((book)=>book.title==title)){
                    res.status(409).json({msg:"This Book already exists in the database."})
                    return;
                }
                let book={
                    number: books.length+1,
                    title,
                    releaseDate,
                    description,
                    pages,
                    cover,
                    copies
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

    //@route .patch(/books/:id)
    //@desc-update a book entry in library
    //@access:admin

    .patch((req, res) => {

    })
    //@route .delete(/books/:id)
    //@desc-delete a book entry from library based on book id
    //@access:admin

    .delete((req, res) => {

    });
export default router;
