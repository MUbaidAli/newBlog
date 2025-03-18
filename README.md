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
