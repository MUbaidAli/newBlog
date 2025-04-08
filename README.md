📌 Description

This is a full-stack blog application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, read, update, and delete blog posts.

🚀 Features implimented

✅ Fully responsive Navbar

✅ CRUD operations for blogs (Create, Read, Update, Delete)
✅ CRUD operations for Categories (Create, Read, Update, Delete)

✅ MongoDB database for storing blogs and categories

✅ RESTful API using Express.js

✅ Backend error handling

✅ Separate frontend and backend structure

✅ Progress - March 14, 2025
Implemented Review Controllers for blogs and categories, separating logic from routes.
Established One-to-Many Relationship between blogs and reviews by storing review ObjectIDs in the blog schema.
Added Middleware for Review Deletion, ensuring reviews are removed from blogs when deleted.
Implemented Cascade Deletion Middleware, automatically deleting all associated reviews when a blog is deleted.
Refactored Code by moving business logic into controllers for better structure and maintainability.
Created Hero Section in Frontend, improving the UI with a well-designed introduction section.

✅ Progress - March 15, 2025
User Authentication & Authorization:

Implemented user registration and login functionality.
Applied protected routes to secure specific endpoints.
User Data Handling:

Developed API to fetch user details after authentication.
Blog Authorization & CRUD Enhancements:

Updated blog only if the user is authorized.
Implemented protected delete functionality (users can only delete their own blogs).
🚀 Authentication & Authorization added successfully!


✅ Progress - March 17, 2025
Completed HomePage Design And More Customization About Navbar and Optimize  Code fix Bugs

✅ Progress - March 18, 2025
completed About Us Page Frontend
Completed Contact Us Page Frontend
Completed 404 Page Not Found Page
Some More Modification On responsiveness and Code and fix Bugs


✅ Progress - March 19, 2025
completed Single Blog Post page (frontend)
implemented register page with backend + frontend
implemented login page with backend + frontend 
implemented backend protected routes 

✅ Progress - March 20, 2025
implemented protected Routes (frontend)
implemented more backend Protected Routes .
implemented Role base access Protected Routes for blog creating deleting and updating  
implemented http cookies for user storage and track user sessions 
fix bugs 
creating Custom Dashboard Design (in Progress) 


✅ Progress - March 21, 2025
implemented dashboard Design (frontend)
implemented blog management design .
implemented draft.js editor for writing better post.  
making frontend blog data sync with BACKEND for  reading creating and deleting blogs.
fix bugs 

✅ Progress - March 22, 2025
completed blog management with backend 
implemented feature of category management creating deleting updating backend + frontend (dashboard)
implemented feature of Reviews Management frontend + backend (dashboard)
started User Management Design (dashboard)
implemented feature of confirm model for deleting blogs

✅ Progress - March 24, 2025
completed dashboard Profile section 
implemented functionality to display all users data
implemented functionality that only admin can delete data of any user
implemented functionality that only admin can update any user related data 
implemented functionality that admin can register any user with multiple roles
implemented settings section of dashboard that any user can change his account settings
started implementing image uploading feature (Final feature of dashboard).

✅ Progress - March 29, 2025
implemented Image Uploading Feature
image Uploading feature for profile
image uploading feature for Featured Image Blog
implemented ALL Blog Post Pages on Website
implemented Dynamic navbar Categories 

✅ Progress - April 2, 2025
implemented Image Uploading Feature inside blog post
implemented Image Uploading Feature inside blog post Updating
Show Single Blog Post Page With Data

✅ Progress - April 3, 2025
implemented home page dynamic data like new Blog posts , dynamic categories , slider featured Blog posts 
dynamic category Page to show Specific Category Page with Blog Posts


✅ Progress - April 4, 2025
implemented search Functionality to search specific post 
blog post review Features to comment and give a star rating
fixed admin registration bugs



✅ Progress - April 7, 2025
fix bugs
created view functionalities (daily Visits , total Visits , per Blog Visits)
created dashboard Statistics 
show Statistics data on Dashboard Main Page 


✅ Progress - April 8, 2025
fix bugs
fix some design issues
completed Dashboard Statistics
created dashboard Statistics with Graph 
search functionality of admin
modified code on blog posts to send only the published blog to users and draft blog only to admin 
search functionality for Dashboard 
search functionality based on role admin can search all blogs drafted too but user can only search published one 

⚠️ Project is almost completed Only Pagination and user Data Updating Form Remaining and some testing and modifications remaining 


 




🛠 Tech Stack

Frontend:

⚛️ React.js

🎨 Tailwind CSS

Backend:

🖥 Node.js

⚡ Express.js

🗄 MongoDB

State Management:

🌍 Context API

API Calls:

🔗 Fetch API / Axios
