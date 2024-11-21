import ProtectedRoute from "./ProtectedRoute";
const ProcessedRoutes = (routes) => {
    return routes.map(route => {
        // process children routes
        if (route.children) {
            route.children = ProcessedRoutes(route.children);
        }

        // process protected routes
        if (route.protected) {
            const element = route.element;
            route.element = <ProtectedRoute>{element}</ProtectedRoute>;
        }

        return route;
    })
};

export default ProcessedRoutes;