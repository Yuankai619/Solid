import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();
    console.log('currentUser = ', currentUser);
    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;