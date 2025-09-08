# Library Management System 📚

This project is a **Node.js + Express** web application that manages a library’s books, users, and borrowing system.  
It uses **EJS view engine** for rendering pages and supports both **admin** and **user** roles.

---
## How to Test
**With Thunderclient/Postman**

**With Template engine**
- `http://localhost:3000/` renders login page (libNum.ejs) via userRoute.mjs. 
- If you enter "1" you will be rendered Admin Page (admin.ejs).
    - This page gives you access to see book inventory. The admin will also see **bookId**
    - Add/Create a new book entry using post method.
    ## Validation: 
    - If book title (case insensitive)matches exactly with entered title
    - If any field is empty
    - Sample data of book entry:



- Other ids of user databse are regular users and will take you to books page.
- booksAdminRoute is restricted to admins only. needs query parameters and body property `admin`.Best to check with template engine.
- userRoute is used by template view engine only to redirect the user based on userId/Library Number.

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



