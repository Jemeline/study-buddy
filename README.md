# [Study Buddy](https://study-buddy-d452c.web.app/)

Study Buddy helps students at UNC connect with each other to find their ideal study partners. This is a MERN (MongoDB, Express, React, Node) stack web app that is hosted on Google’s Firebase platform. The backend Express API is deployed using Firebase Cloud Functions and the database is hosted on MongoDB Atlas. Created for COMP-523 Software Engineering Lab.

## Developers

- Clayton Saunders
- Jada Pfeiffer - [Github](https://github.com/Jemeline)
- Randy Sievers - [Github](https://github.com/rsievers82)
- Sai Gongidi - [Github](https://github.com/sgongidi)

***

## Installation

- Make sure the necessary programs are downloaded
  - [Node.js](https://nodejs.org/en/download/)
  - [Git](https://git-scm.com/downloads)
  - An IDE that supports JS. We used [VSCode](https://code.visualstudio.com/)
- Clone the repository
  - In VSCode, Open the Source Control tab (Ctrl-Shift-G)
  - Click the Clone Repository Button
  - Paste the following link in the textbox: `https://github.com/Jemeline/study-buddy.git`
  - Choose a download location
- Initialize the project
  - Open the project folder in the VSCode terminal
  - Enter the command **npm run init**
    - This will install the necessary dependencies and then prompt the user to login to Firebase
    - Login using the Gmail account that has access to the [Firebase console](https://console.firebase.google.com/)
    - If you don't have access to the console then you don't need to login, however certain commands (indicated below) will be unavailable.

## NPM Scripts

The following commands can be entered into the Terminal to execute the described task.

- **npm run init**
  - Install dependencies and login to Firebase (Google account must have access to the Firebase console)

- **npm start**
  - Run react app with live reload on <http://localhost:3000>
  - Frontend (src folder) changes will be shown in the browser after saving

- **npm run serve**
  - Build optimized react app and serve on <http://localhost:5000>
  - Testing API will be available at: <http://localhost:5001/study-buddy-d452c/us-central1/app8/api>
  - Backend (functions folder) changes will be reflected in the API after saving
  - Must have Firebase console access

- **npm run test**
  - Run test suites found in src/tests
  - [Docs](https://testing-library.com/docs/)

- **npm run deploy**
  - Deploy changes to the live site
  - This command can also be run from the functions folder to only deploy changes to the backend API (functions folder)
  - Must have Firebase console access
