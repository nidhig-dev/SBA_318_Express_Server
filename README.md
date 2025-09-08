# Library Management System 📚

This project is a **Node.js + Express** web application that manages a library’s books, users, and borrowing system.  
It uses **EJS view engine** for rendering pages and supports both **admin** and **user** roles.

---
## How to Test

### Assumption
number,BookId,loadId are unique and cannot be updated in patch request.

**With Thunderclient/Postman**
GET method: `http://localhost:3000/books/admin`-Get all books
Query Parameter: role:admin

POST method:`http://localhost:3000/books/admin`-Add a book
Body:needs a property role with value admin.
`{
     "role": "admin",
     "title": "The Class",
     "releaseDate": "Jan 1, 1986",
     "description": "A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.",
     "pages": 560,
     "cover": "https://m.media-amazon.com/images/I/51rIay3vijL.jpg"
    }`
PATCH method:`http://localhost:3000/books/admin/:id`-Update a book using book id
Query parameter: role:admin
{
     "role": "admin",
     "title": "The Class",
     "releaseDate": "Jan 1, 1986",
     "description": "A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.",
     "pages": 560,
     "cover": "https://m.media-amazon.com/images/I/51rIay3vijL.jpg"
    }

DELETE method:`http://localhost:3000/books/admin/:id`-Delete a book based on book id
Query parameter: role:admin


**With Template engine**
- `http://localhost:3000/` renders login page (libNum.ejs) via userRoute.mjs. 
- Ids 2,3,4,5 are regular users and will take you to user books page.
- If you enter "1" you will be rendered Admin Page (admin.ejs) via adminRoute.ejs.

    - This page gives you access to see book inventory. The admin will also see **bookId** of a book.
    - Add/Create a new book entry using post method.
    ## Validation: 
    - If book title (case insensitive)matches exactly with entered title, it will throw error.
    - If any field is empty, it will throw error.

    - Sample data of book entry:

    * Title- The Class
    * Release Date- Jan 1, 1986
    * Description- A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.
    * Pages- 560,
    * Cover-https://m.media-amazon.com/images/I/51rIay3vijL.jpg



## Routes
- **booksAdminRoute** is restricted to admins only.
- GET/PATCH/DELETE method needs query parameter **role:admin** with thunderclient.Check with template engine to avoid this.
- POST method needs body property **"role":"admin"** with thunderclient.Check with template engine to avoid this.

- **userRoute** is used by template view engine only to redirect the user based on userId/Library Number.
- **adminRoute** is used only by admin requests to render admin page
- **booksUserRoute** User gets routed to this route. He only has read access.
- GET
- GET by id,name
- **borrowBookRoute** only Admin has access to all methods - GET
Query parmeter: role:admin
- GET by userId
Query paramter:role:admin
- GET by bookId
Query paramter:role:admin

- POST
Query parameter: role:admin
    Sample data-
`{
    "userId": 2,
    "bookId": 7,
    "borrowDate": "2025-08-25",
    "dueDate": "2025-09-09",
    "returnDate": null
  }`

- PATCH
Query parameter: role:admin
    Sample data-
`{
    "userId": 2,
    "bookId": 7,
    "borrowDate": "2025-08-25",
    "dueDate": "2025-09-09",
    "returnDate": null
  }`

- DELETE
Query parameter: role:admin
    Sample data-
`{
    "userId": 2,
    "bookId": 7,
    "borrowDate": "2025-08-25",
    "dueDate": "2025-09-09",
    "returnDate": null
  }`

## 🚀 Features

- **Login with Library Number**  
  - Admins (user id/library number 1) will be rendered a admin page. 
  - Users (any other user id in database) will be rendered a books page.  

- **Admin Features**
  - View all books. This is done via template engine.
  - Add a book.This is done via template engine.
  - Update, and delete books.
  - View loan history of users and books
  - Manage (Create/Update and delete)records of loans/returns 

- **User Features**
  - View available books.This is done via template engine.
  
---

## 📚 Library API Endpoints


Public/User Route
| Method | Route                      | Description                       |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/`                        | Login with library number         | Template View Engine
| POST   | `/`                        | user/admin redirect               | Template View Engine
| GET    | `/books/user`              | Show available books              | Template View Engine
| GET    | `/admin/borrow/userid/:id` | User’s loan history               |
| GET    | `/books/user/id/:id`       | Get book details by **book ID**   | 
| GET    | `/books/user/name/:name`   |  Get books starting with **name** |  

Admin
| Method | Route                      | Description                     |
| ------ | -------------------------- | ------------------------------- |
| GET    | `/books/admin`             | view books with id              | Template View Engine
| POST   | `/books/admin`             | Add a new book                  | Template View Engine
| GET    | `/books/user/id/:id`       | Get book details by **book ID** | 
| DELETE | `/books/admin/:id`         | Delete a book                   |
| PATCH  | `/books/admin/:id`         | Update book details             |
| GET    | `/admin/borrow`            | View all borrow records         |
| GET    | `/admin/borrow/bookid/:id` | Loan history of a book          |
| GET    | `/admin/borrow/userid/:id` | Loan history of a user          |
| POST   | `/admin/borrow`            | Create new loan record entry    |
| PATCH  | `/admin/borrow/:id`        | Update loan record              |
| DELETE | `/admin/borrow/:id`        | Delete loan record              |

| POST   | `/loans`                | Borrow a book (creates a loan entry)          | User        |
| PATCH  | `/loans/:id`            | Return a borrowed book                        | User        |

---
### Example Book Entry
| NUMBER | TITLE   | RELEASE DATE | DESCRIPTION| PAGES   | COVER |
|---------|---------|---------     |-------------|------------|-------------|
| auto-gen| 1       | 5            | 2025-09-08  | 223    | Null        |

### Example Loan Entry
| Loan ID | User ID | Book ID | Borrow Date | Due Date   | Return Date |
|---------|---------|---------|-------------|------------|-------------|
| auto-gen| 1       | 5       | 2025-09-08  | 2025-09-22 | Null        |



