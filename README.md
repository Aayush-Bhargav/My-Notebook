# My-Notebook
The Notes App is a full-featured MERN stack application designed for managing personal notes and to-dos. It provides a secure and interactive platform where users can log in, create, edit, and delete notes. This was my first full stack project!

## Screenshots

### Home Page
![Home Page](screenshots/homePage.png)

### Another User's Home Page
![Another User Home Page](screenshots/anotherGuyHomePage.png)

### Edit Note
![edit note](screenshots/editNote.png)

### Sign Up Page
![Sign up page](screenshots/signupPage.png)

### Login Page
![Login page](screenshots/loginPage.png)

### Security Against Invalid Login
![security](screenshots/security.png)

### Mongo DB
![mongoDB](screenshots/mongoDB.png)

### Mobile View
![mobile view](screenshots/mobileView.png)


### Mobile View 1
![mobile view 1](screenshots/mobileView1.png)

## Install
Clone the repo using:
```
git clone https://github.com/Aayush-Bhargav/My-Notebook.git
```
Install the packages for the front end using:
```
cd My-Notebook
npm install
```
Install the packages for the back end using:
```
cd My-Notebook/backend
npm install
```
Launch the backend server:
```
nodemon index.js
```
Launch the frontend application:
```
npm start
```
Make sure mongo DB server is running on your localhost and listening on the default port 27017.
  
## Features

- **User Authentication**: Secure login system requiring users to provide a valid email and password. Authentication ensures that only authorized users can access and manage their notes.
- **Note Management**: Users can add, edit, and delete notes. The application supports full CRUD (Create, Read, Update, Delete) operations on notes.
- **Persistent Storage**: Notes are stored in MongoDB, ensuring that data is saved and accessible across sessions.
- **Responsive UI**: The application features a clean and responsive interface for managing notes efficiently.
- **Dynamic Note Display**: The app dynamically displays notes, allowing users to view all their notes or manage them as needed.



## Technologies Used

- **MERN Stack**: Utilizes MongoDB, Express.js, React, and Node.js to provide a seamless and interactive user experience.
- **Node.js & Express**: The backend is built with Node.js and Express, providing APIs for user authentication and note management.
- **MongoDB**: Stores user data and notes persistently, ensuring data integrity and accessibility.
- **React**: Used for building the user interface, allowing for a responsive and dynamic front-end experience.

## How It Works

1. **User Authentication**: Users must log in with their email and password. The authentication process verifies credentials against the database to ensure secure access.
2. **Note Operations**: Once logged in, users can perform various operations on their notes, including adding new notes, editing existing ones, and deleting notes.
3. **Data Persistence**: All notes and user data are stored in MongoDB, ensuring that changes are saved and can be retrieved even after logging out and logging back in.
