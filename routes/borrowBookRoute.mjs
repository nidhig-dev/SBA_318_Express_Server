//imports
import express from "express";
import { books } from "../data/books.mjs";
import { borrowBook } from "../data/borrowbook.mjs";
//env set up
const router = express.Router();

router.route("/")

    //@route GET(/admin/borrow)
    //@desc-gets user and books' loan history.
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .get((req, res, next) => {
        let role = req.query["role"];
        return res.json(borrowBook);
    })
    //@route POST(/admin/borrow)
    //@desc-create laon entry when user checks out a book
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route
    //Sample data: {
    // "userId": 2,
    // "bookId": 7,
    // "borrowDate": "2025-08-25",
    // "dueDate": "2025-09-09",
    // "returnDate": null
    // }

    .post((req, res, next) => {
        let role = req.query["role"];
        const { userId, bookId, borrowDate, dueDate, returnDate } = req.body;

        if (borrowBook.find((loan) => (userId == loan.userId) && (bookId == loan.bookId))) {
            res.status(409).json({ msg: "This entry already exists in the database." })
            return;
        }
        else {

            let loanEntry = {
                loanId: borrowBook.length + 1,
                userId,
                bookId,
                borrowDate,
                dueDate,
                returnDate
            }
            borrowBook.push(loanEntry);
            return res.json(borrowBook);

        }
    });

router.route("/userid/:id")
    //@route GET(/admin/borrow/userid/:id)
    //id= userid
    //@desc-gets all the loan history of a user
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .get((req, res, next) => {
        const userId = req.params.id;
        let role = req.query["role"];
        let loanArr = borrowBook.filter((loan) => loan.userId == userId);
        if (loanArr.length > 0) {
            res.json(loanArr);

        } else {
            const err = new Error("No loan history of this user found!");
            err.status = 404;
            next(err);
        }
    });


router.route("/bookid/:id")
    //@route GET(/admin/borrow/bookid/:id)
    //id= bookid
    //@desc-gets all the loan history of a book
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .get((req, res, next) => {
        const bookId = req.params.id;
        let role = req.query["role"];
        let loanArr = borrowBook.filter((loan) => loan.bookId == bookId);
        if (loanArr.length > 0) {
            res.json(loanArr);

        } else {
            const err = new Error("No loan history of this book found!");
            err.status = 404;
            next(err);
        }       
    });


router.route("/:id")

    //@route PATCH(/admin/borrow/:id)
    //id= loan id
    //@desc-Update loan entry based on loan id
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .patch((req, res, next) => {
        const id = req.params.id
        let role = req.query["role"];
        console.log(req.body);
        let { userId, bookId, borrowDate, dueDate, returnDate } = req.body;
        if (userId && bookId && borrowDate && dueDate) {
            //check if entry exists
            let index = borrowBook.findIndex((loan) => loan.loanId == id)
            //If admin has put release date in body, take that else put null
            if (returnDate) {
                returnDate = returnDate;
            }
            else {
                returnDate = null;
            }
            if (index != -1) {
                let loanEntry = {
                    loanId: id,
                    userId,
                    bookId,
                    borrowDate,
                    dueDate,
                    returnDate
                }
                borrowBook.splice(index, 1, loanEntry);
                return res.json(borrowBook);
            }
            else {
                const err = new Error("Loan entry not found!");
                err.status = 404;
                next(err);
            }
        }
        else {
            const err = new Error("Insufficient Loan Entry Data");
            err.status = 422;
            next(err);
        }
    })

    //@route DELETE(/admin/borrow/:id)
    //id= loan id
    //@desc-Delete loan entry based on loan id
    //@access:admin
    //@Note: This method expects query parameter role:admin to access this route

    .delete((req, res, next) => {
        const id = req.params.id
        let role = req.query["role"];
        //chk if entry exists
        let index = borrowBook.findIndex((loan) => loan.loanId == id)
        console.log(index);
        if (index != -1) {
            borrowBook.splice(index, 1);
            return res.json(borrowBook);
        }
        else {
            const err = new Error("Loan entry not found!");
            err.status = 404;
            next(err);
        }
    })

export default router;
