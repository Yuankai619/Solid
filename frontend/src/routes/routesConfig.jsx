import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
export const routesConfig = [
    {
        path: "/",
        element: <HomePage />,
        protected: true
    },
    {
        path: "/home",
        element: <HomePage />,
        protected: true
    },
    {
        path: "/login",
        element: <LoginPage />,
        protected: false
    },
    {
        path: "/signup",
        element: <SignupPage />,
        protected: false
    }
];

