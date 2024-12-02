import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import Discussion from "../pages/Discussion";
import JoinedDisscussion from "../pages/JoinedDisscussion";
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
    },
    {
        path: "conversation/:conversationId/host",
        element: <Discussion />,
        protected: true
    },
    {
        path: "conversation/:conversationId",
        element: <JoinedDisscussion />,
        protected: true
    }
];

