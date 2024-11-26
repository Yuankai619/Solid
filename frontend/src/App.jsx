import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./routes/routesConfig";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProcessedRoutes from "./routes/ProcessedRoutes";
import { ClassDataProvider } from "./context/ClassDataContext.jsx";
function App() {
    const router = createBrowserRouter(ProcessedRoutes(routesConfig), {
        future: {
            v7_startTransition: true,
        },
    });
    return (
        <AuthProvider>
            <ClassDataProvider>
                <RouterProvider router={router} />
            </ClassDataProvider>
        </AuthProvider>
    );
}

export default App;
