import Header from './Header'; // Import your header
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    return (
        <div className="App">
            <Header /> 
            <p> This is Authenticated page </p>
            <Outlet />
        </div>
    );
};

export default PrivateLayout;
