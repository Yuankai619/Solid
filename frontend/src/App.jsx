import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { routesConfig } from "./routes/routesConfig";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProcessedRoutes from "./routes/ProcessedRoutes";
function App() {

  const router = createBrowserRouter(
    ProcessedRoutes(routesConfig),
    {
      future: {
        v7_startTransition: true
      }
    }
  );
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
