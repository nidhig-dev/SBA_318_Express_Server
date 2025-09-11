import express from "express";
import { books } from "../data/books.mjs"
//env set up
const router = express.Router();
router.route("/")

    //@route GET(/books/admin)
    //@desc-gets book inventory in library 
    //@access:admin
    //@Note: If entering data through thunderclient or postman, this method expects query parameter 'role:admin' to access this route
    //@Note: optional: If you enter query parameter 'name:any name', then template view shows your name


    .get((req, res, next) => {
        //get the query parameter either from thunderclient/postman or from userRoute.mjs for admin validation
        let name = req.query["name"];
        let role = req.query["role"];
        if (name) {
            return res.render("books", { name: name, role: role, books });
        }
        else {
            return res.render("books", { name: null, role: role, books });
        }
    })

    //@route POST(/books/admin)
    //@desc-creates new book entry in library if user is admin
    //@access:admin
    //@Note: If entering data through thunderclient or postman, this method expects object in body to have 'role:admin' to access this route
    //@Note: optional: If you enter name:any name in body, then template view shows your name
    //Example data: 
    // {
    // "role": "admin",
    // "title": "The Class",
    // "releaseDate": "Jan 1, 1986",
    // "description": "A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.",
    // "pages": 560,
    // "cover": "https://m.media-amazon.com/images/I/51rIay3vijL.jpg"
    // }

    .post((req, res, next) => {
        let { name, role, title, releaseDate, description, pages, cover } = req.body;
        //chk if all the data is entered by the admin
        if (title && releaseDate && description && pages && cover) {
            //chk if title exists
            if (books.find((book) => book.title.toLowerCase() == title.toLowerCase())) {
                res.status(409).json({ msg: "This Book already exists in the database." })
                return;
            }
            if (isNaN(pages) || pages == 0) {
                res.status(422).json({ msg: "Pages can only be number greater than zero." });
                return;
            }
            //Jun 19,1997 format
            const regex = /^[A-Za-z]{3} \d{1,2},\d{4}\s*$/;
            if (!regex.test(releaseDate)) {
                res.status(422).json({ msg: "Please enter Release date in this format: Jun 19,1997" });
                return;
            };
            let parts = releaseDate.split(" ");
            let month = parts[0];
            let otherDate = parts[1];
            month = month[0].toUpperCase() + month[1].toLowerCase() + month[2].toLowerCase();
            releaseDate = month + " " + otherDate;
            //checking http or https in image url with valid extension
            const reg = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
            if(!reg.test(cover)){
                res.status(422).json({ msg: "Invalid cover image address" });
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
            if (name) {
                return res.render("books", { name: name, role: role, books });
            }
            else {
                return res.render("books", { name: null, role: role, books });
            }
        }
        else {
            //When url is typed without req.body containing 'role' property or role property is not 'admin' passed to it through thunderclient/postman
            const err = new Error("Permission Denied");
            err.status = 403;
            next(err);
        }
    });


router.route("/:id")
    //@route PATCH(/books/admin/:id)
    // id is book id
    //@desc-update a book entry in library based on book id
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .patch((req, res, next) => {
        let id = req.params.id;
        let role = req.query["role"];
        const { title, releaseDate, description, pages, cover } = req.body;
        //chk if all the data is entered by the admin
        // Assumption:id is a unique identifier, is sequentially generated in post method,hence can't be edited to preserve the sequence.
        if (title && releaseDate && description && pages && cover) {
            let index = books.findIndex((book) => book.number == id)
            //check if book id exists
            if (index != -1) {
                let book = {
                    //keeping id same as before
                    number: id,
                    title,
                    releaseDate,
                    description,
                    pages,
                    cover
                }
                books.splice(index, 1, book);
                return res.json(books);
            }
            else {
                const err = new Error("Book entry not found!");
                err.status = 404;
                next(err);
            }
        }
        else {
            const err = new Error("Permission Denied");
            err.status = 403;
            next(err);
        }

    })
    //@route DELETE(/books/admin/:id)
    //id is book id
    //@desc-delete a book entry from library based on book id
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .delete((req, res, next) => {
        let id = req.params.id;
        let role = req.query["role"];
        //check i the book to be deleted by the admin, exists in database
        let index = books.findIndex((book) => book.number == id)
        //if book exists
        if (index != -1) {
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