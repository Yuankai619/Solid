# HandsUp Free

## Introduction

**HandsUp Free** is an anonymous real-time Q&A platform designed to address common issues in classroom settings, such as students hesitating to answer questions or teachers only calling on students in the front rows. This platform allows students to participate anonymously, ensuring every voice is heard without fear of judgment. Teachers can also provide feedback on answers, marking them with grades or annotations.

Key Features:

-   Real-time, anonymous question-answering during lectures.
-   Teachers can provide feedback and scores on student responses.
-   Students can choose whether or not to remain anonymous during or after submitting their answers.

## Motivation

In traditional classrooms, students often hesitate to answer questions, even when they know the answers, due to fear of embarrassment or being singled out. Additionally, teachers often only call on students in the front rows, leaving others with fewer opportunities to participate. HandsUp Free was created to address these issues, promoting equal participation and allowing students to answer questions freely and anonymously.

## Previous Version Demo

[https://www.youtube.com/watch?v=2ZzjDLvxDAM](https://www.youtube.com/watch?v=2ZzjDLvxDAM)

## Detail Features Notes

[HandsUp Free Feature Notes](https://docs.google.com/presentation/d/1dY1nb_hz9sfKGWLgmrRZbKo1sCTNKKOH5hrr3aSfE80/edit?usp=sharing)

---

## Tech Stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232a.svg?logo=react&logoColor=61DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Frontend:

-   **Vite** - A fast development build tool that improves the development experience.
-   **React** - For building a responsive and dynamic user interface.
-   **MUI** - Material-UI for React components, providing an intuitive and consistent UI.
-   **Axios** - Promise-based HTTP client for making API requests.
-   **Tanstack-Query** - For data fetching and state management.
-   **React-Router-Dom** - Routing library for single-page applications.
-   **Socket.io-client** - Enables real-time communication for the Q&A feature.
-   **Firebase** - Google Authentication and session management.

### Backend:

-   **Node.js** - JavaScript runtime for building the backend server.
-   **Express** - Web framework for Node.js, handling HTTP requests.
-   **Firebase-admin** - Admin SDK for interacting with Firebase services.
-   **Mongoose** - ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **Nodemon** - Development tool that automatically restarts the server when changes are made.
-   **Socket.io** - Enables real-time communication on the backend.

### Database:

-   **MongoDB (Atlas)** - Cloud-hosted NoSQL database to store user and Q&A data.

---

## Future Plans

1. **Statistics Feature**: Track and visualize scores assigned by teachers during courses. Include functionality for exporting data as CSV for easy grading and analysis.
2. **Course-Based Q&A**: Instead of a generic Q&A system, allow Q&A to be tied directly to specific courses, displaying all questions and answers related to the course.
3. **Course Sorting, Filtering, and Search**: Enhance the course list with sorting and search functionalities to improve user navigation.
4. **Additional Login Methods**: Integrate other authentication methods such as Google, Facebook, etc.
5. **Profile Picture Updates**: Allow users to upload or change their profile pictures (pending database upgrade for storage).
6. **Navigation Enhancements**: Add a button to quickly scroll back to the top of the Q&A page during high-paced Q&A sessions.
7. **SEO Improvements**: Optimize the platform for search engines to enhance discoverability.

---

## Installation

To run the project locally, follow these steps:

### Frontend:

1.  Clone the repository:
    ```bash
    https://github.com/Yuankai619/HandsUp-Free.git
    ```
2.  Navigate to the frontend directory:
    ```bash
    cd handsup-free/frontend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Backend:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/handsup-free.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd handsup-free
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run server
    ```

### Environment Variables:

Ensure you have the following environment variables set for Firebase and MongoDB:

#### Frontend:

`.env`

```bash
VITE_API_URL = http://localhost:3000
```

`src/config/firebase.js`

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //your firebase config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```

#### Backend:

`.env`

```bash
PORT = 3000
MONGODB_URI = //your mongodb uri
```

`config/firebase-env.json`

```json
//your firebase config
```

---

## Contributing

Contributions are welcome! If you'd like to help improve the project, feel free to fork the repository and submit a pull request. Please make sure to follow the code style guidelines and write tests for any new features or bug fixes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This template should give you a clean and professional README for your GitHub project. Let me know if you'd like to tweak or add anything!
