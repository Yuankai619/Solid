import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routesConfig } from "./routes/routesConfig";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProcessedRoutes from "./routes/ProcessedRoutes";
import { ClassDataProvider } from "./context/ClassDataContext.jsx";
import { UserInfoProvider } from "./context/UserInfoContext.jsx";
function App() {
    const queryClient = new QueryClient();
    const router = createBrowserRouter(ProcessedRoutes(routesConfig), {
        future: {
            v7_startTransition: true,
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserInfoProvider>
                    <ClassDataProvider>
                        <RouterProvider router={router} />
                    </ClassDataProvider>
                </UserInfoProvider>
            </AuthProvider>
            <ReactQueryDevtools />
        </QueryClientProvider >
    );
}

export default App;
