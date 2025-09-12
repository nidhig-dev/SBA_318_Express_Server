# Library Management System 📚

This project is a **Node.js + Express** web application that manages a library’s books, users, and borrowing system.  
It uses **EJS view engine** for rendering pages and supports both **admin** and **user** roles.

## 📚 Library API Endpoints

**Public/User Route**
| Method | Route                      | Description                         | Required route parameter    |
| ------ | -------------------------- | ---------------------------------   |---------------------------- |
| GET    | `/`                        | Login with library number/User Id   | None (Template View Engine) |
| POST   | `/`                        | user/admin redirect                 | None (Template View Engine) |
| GET    | `/books/user`              | Show all books to user              | None (Template View Engine) |
| GET    | `/books/user/id/:id`       | Get book details by **book Id**     | :Book Id                    |
| GET    | `/books/user/name/:name`   |  Get books starting with **name**   | :name                       |   

**Admin**
| Method | Route                      | Description                  |Required route parameter                               |
| ------ | -------------------------- | -----------------------------|------------------------------------------------------ |
| GET    | `/books/admin`             | view all books               | req.query parameter role:admin (  Template ViewEngine)|
| POST   | `/books/admin`             | Add a new book               | req.body object:"role":"admin"(Template View Engine)  |
| PATCH  | `/books/admin/:id`         | Update book details          | req.query parameter role:admin                        |
| DELETE | `/books/admin/:id`         | Delete a book                | req.query parameter role:admin                        |
| GET    | `/admin/borrow`            | View all borrow records      | req.query parameter role:admin                        |
| GET    | `/admin/borrow/bookid/:id` | Loan history of a book       | req.query parameter role:admin                        |
| GET    | `/admin/borrow/userid/:id` | Loan history of a user       | req.query parameter role:admin                        |
| POST   | `/admin/borrow`            | Create new loan record       | req.query parameter role:admin                        |
| PATCH  | `/admin/borrow/:id`        | Update loan record           | req.query parameter role:admin                        |
| DELETE | `/admin/borrow/:id`        | Delete loan record           | req.query parameter role:admin                        |

---
## 🛠️ Tools & Technologies Used

- **Node.js** – JavaScript runtime.
- **Express.js** – Web application framework.
- **EJS** – Template engine for dynamic HTML.
- **Morgan** – HTTP request logger middleware.
- **nodemon** – Automatically restarts the server during development.
- **Thunder Client/Postman** – API testing and development tool.
------

## How to Test

### Assumption
**number (userId), BookId, loadId** are unique identifiers, are sequentially generated in post method, hence can't be edited to preserve the sequence.

**With Thunderclient/Postman**
- GET method: `http://localhost:3000/books/admin`-Get all books
    - Query Parameter: role:admin

- POST method:`http://localhost:3000/books/admin`-Add a book
    - Body:needs a property role with value admin.
    - Sample data:

    `{
     "role": "admin",
     "title": "The Class",
     "releaseDate": "Jan 1,1986",
     "description": "A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.",
     "pages": 560,
     "cover": "https://m.media-amazon.com/images/I/51rIay3vijL.jpg"
    }`

- PATCH method:`http://localhost:3000/books/admin/:id`-Update a book using book id

    - Query parameter: role:admin

    Sample Data-    
    `{
     "role": "admin",
     "title": "The Class",
     "releaseDate": "Jan 1,1986",
     "description": "A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.",
     "pages": 560,
     "cover": "https://m.media-amazon.com/images/I/51rIay3vijL.jpg"
    }`

- DELETE method:`http://localhost:3000/books/admin/:id`-Delete a book based on book id
    - Query parameter: role:admin


**With Template engine**
- `http://localhost:3000/` renders login page (libNum.ejs) via userRoute.mjs. 
- Ids 2,3,4,5 are regular users and will take you to user books page.
- If you enter **"1"** you will be rendered Admin Page (admin.ejs) via adminRoute.ejs.

    - This page gives you access to see book inventory. The admin will also see **bookId** of a book.
    - Add/Create a new book entry using post method.
    #### Validation for post method: 
    - If book title matches exactly with entered title, it will throw error. Book title validation is case insensitive. It will ignore Uppercase/LowerCase.
    - If any field is empty, it will throw error.
    - Pages need to be an integer. Else error will be thrown.
    - Release date needs to be in format "Jun 19,2005". 
        - Month needs to be **3 letters** followed by **space** followed by **1 or 2 digit** followed by **comma** followed by **4 digits**.
    - Cover page image format is http or https and valid extension.


 - Sample data of book entry:

    * Title- `The Class`
    * Release Date- `Jan 1,1986`
    * Description- `A powerful and moving saga of five extraordinary members of the Harvard class of 1958 and the women with whom their lives are intertwined. Their explosive story begins in a time of innocence and spans a turbulent quarter century, culminating in their dramatic twenty-five reunion at which they confront their classmates--and the balance sheet of their own lives. Always at the center; amid the passion, laughter, and glory, stands Harvard--the symbol of who they are and who they will be. They were a generation who made the rules--then broke them--whose glittering successes, heartfelt tragedies, and unbridled ambitions would stun the world.`
    * Pages- `560`,
    * Cover-`https://m.media-amazon.com/images/I/51rIay3vijL.jpg`

## Routes
- **booksAdminRoute** is restricted to admins only.
    - GET/PATCH/DELETE method needs query parameter **role:admin** with thunderclient.Check with template engine to avoid this.
    - POST method needs body property **"role":"admin"** with thunderclient.Check with template engine to avoid this.

- **userRoute** is used by template view engine only to redirect the user based on userId/Library Number.
- **adminRoute** is used only by admin requests to render admin page
- **booksUserRoute** User gets routed to this route. He only has read access.
    - GET
    - GET by :id, :name
- **borrowBookRoute** only Admin has access to all methods - 

    - GET
        - Query parmeter: role : admin
    - GET by userId
        - Query paramter:role : admin
    - GET by bookId
        - Query paramter:role : admin

    - POST
        - Query parameter: role : admin
    
    Sample data-

    `{
        "userId": 2,
        "bookId": 7,
        "borrowDate": "2025-08-25",
        "dueDate": "2025-09-09",
        "returnDate": null
    }`

    - PATCH
        - Query parameter: role: admin

    Sample data-

    `{
        "userId": 2,
        "bookId": 7,
        "borrowDate": "2025-08-25",
        "dueDate": "2025-09-09",
        "returnDate": null
    }`

    - DELETE
        - Query parameter: role : admin

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
  - Admin (user id/library number -  **1**) will be rendered a admin page. 
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
## REQUIREMENTS

- ✅Create and use at least two pieces of custom middleware.
- ✅Create and use error-handling middleware.
- ✅Use at least three different data categories (e.g., users, posts, or comments).
- ✅Utilize reasonable data structuring practices.
- ✅Create GET routes for all data that should be exposed to the client.
- ✅Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
- ✅Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
- ✅Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.
- ✅Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.
- ✅Utilize route parameters, where appropriate.
- ✅Adhere to the guiding principles of REST.
- ✅Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
- ✅Use simple CSS to style the rendered views.
- ✅Include a form within a rendered view that allows for interaction with your RESTful API
- ✅Utilize reasonable code organization practices.
- ✅Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
- ✅Commit frequently to the git repository.
- ✅Include a README file that contains a description of your application.
- ✅Level of effort displayed in creativity, presentation, and user experience.

## REFLECTIONS

- What could you have done differently during the planning stages of your project to make the execution easier?

    - I was manually checking in each admin method if the req.query.role is admin. I thought of adding middleware for the same at the end. If I had thought of it earlier, I could have saved a lot of time.

- what would you add or change about your application if you had more time?

    - I would add book checkout functionality for users on the books page if I had more time.




