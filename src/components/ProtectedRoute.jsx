import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../store';

const ProtectedRoute = ({ children }) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated  && localStorage.getItem('accessToken')) {
        return children;
    }

    if(authStore.loading){
        return <div>Loading...</div>;
    }

    return <Navigate to="/" replace={true} />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
