# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

///////////////////////////////////////////////////////////////////////////////////////////

Notes Application (MERN Stack with Auth0)
This is a full-stack notes application built with React (Frontend), Node.js/Express (Backend), MongoDB (Database), and Auth0 for authentication and authorization.

Features
User Authentication:

Custom Login and Signup forms with client-side validation (email, password, name).

Auth0 integration for secure user management and authentication.

Login/Signup with Email/Password (via Auth0 Database Connection).

Login/Signup with Google (via Auth0 Social Connection).

Protected routes for authenticated users.

Notes Management:

Create new notes.

View notes (specific to the logged-in user).

Delete existing notes.

Responsive Design: Custom CSS for a mobile-friendly user interface.

Secure API: Backend API protected with JWT verification using Auth0 access tokens.

Technologies Used
Frontend:

React.js

React Router DOM

Axios (for API calls)

@auth0/auth0-react (Auth0 SDK for React)

Custom CSS

Backend:

Node.js

Express.js

Mongoose (MongoDB ODM)

dotenv (for environment variables)

cors (for Cross-Origin Resource Sharing)

express-oauth2-jwt-bearer (for Auth0 JWT verification)

Database:

MongoDB

Authentication:

Auth0

Prerequisites
Before you begin, ensure you have the following installed:

Node.js and npm: https://nodejs.org/

MongoDB: https://www.mongodb.com/docs/manual/installation/ (Ensure MongoDB server is running)

Auth0 Account: https://auth0.com/signup

Auth0 Configuration (Crucial Step!)
This project relies heavily on Auth0 for authentication. You need to configure your Auth0 application and API correctly.

Log in to your Auth0 Dashboard: https://manage.auth0.com/

Create an Application (for your Frontend):

Go to Applications -> Applications.

Click "+ Create Application".

Choose "Single Page Web Applications" and click "Create".

Go to the "Settings" tab of your new application.

Allowed Callback URLs: Add http://localhost:5173 (or the port your frontend runs on).

Allowed Logout URLs: Add http://localhost:5173.

Allowed Web Origins: Add http://localhost:5173.

Under "Advanced Settings" -> "Grant Types": Ensure Authorization Code and Refresh Token are enabled.

Connections: Go to the "Connections" tab for your application.

Enable your Database Connection (e.g., Username-Password-Authentication). The name must match what's in frontend/src/pages/Login.jsx and Signup.jsx.

Enable Google social connection (if you want Google login/signup). The name google-oauth2 is used in the frontend.

Create an API (for your Backend):

Go to Applications -> APIs.

Click "+ Create API".

Provide a Name (e.g., "Notes API").

Identifier: This is your AUTH0_AUDIENCE. It must be exactly https://dev-tae7yw0z4q6lb3f0.us.auth0.com/api/v2/ as used in the code.

Signing Algorithm: Set to RS256.

Click "Create".

Installation and Setup

1. Backend Setup
   Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file:

In the backend directory, create a file named .env.

Add the following content, ensuring AUTH0_DOMAIN and AUTH0_AUDIENCE match your Auth0 configuration:

MONGODB_URI=mongodb://localhost:27017/authapp
PORT=5000

# Auth0 Configuration for Backend

AUTH0_DOMAIN=dev-tae7yw0z4q6lb3f0.us.auth0.com
AUTH0_AUDIENCE=https://dev-tae7yw0z4q6lb3f0.us.auth0.com/api/v2/

Start the backend server:

node index.js

# Or, if you have nodemon installed for auto-restarts:

# nodemon index.js

You should see "MongoDB Connected Successfully" and "Server is listening at http://localhost:5000" in your console.

2. Frontend Setup
   Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

No .env file needed for frontend specific Auth0 config as it's hardcoded in AuthProvider.jsx for simplicity based on your provided code.

Start the frontend development server:

npm run dev

This will typically open your application in your browser at http://localhost:5173 (or another port if 5173 is in use).

Usage
Access the Application: Open your browser and go to http://localhost:5173.

Login/Signup:

Use the custom forms to sign up with an email and password.

Alternatively, use the "Login with Google" or "Signup with Google" buttons to authenticate via your Google account.

Client-side validation will provide immediate feedback for incorrect inputs.

Dashboard: After successful login/signup, you will be redirected to the Dashboard.

Your user information (name, email) will be displayed.

You can add new notes using the input field and "Add Note" button.

You can delete existing notes using the "X" button next to each note.

Logout: Click the "Sign Out" button to log out of the application.

Troubleshooting
MongoDB Connected Successfully not showing: Ensure your MongoDB server is running. Check the MONGODB_URI in backend/.env.

Frontend/Backend communication errors (e.g., 401 Unauthorized, 403 Forbidden):

Double-check your Auth0 Dashboard configuration:

Are the "Allowed Callback URLs," "Allowed Logout URLs," and "Allowed Web Origins" correct for your frontend application?

Does the "Identifier" of your Auth0 API exactly match the AUTH0_AUDIENCE in your backend/.env and frontend/src/auth/AuthProvider.jsx?

Are the "Connection" names in your Auth0 Application (e.g., Username-Password-Authentication, google-oauth2) correctly spelled and enabled?

Ensure both frontend and backend servers are running.

Check your browser's developer console (F12) for frontend errors and the backend terminal for server errors.

Shake animation not working: Ensure Auth.css is correctly linked and the shake keyframes are present. Check for typos in class names in Login.jsx and Signup.jsx.
