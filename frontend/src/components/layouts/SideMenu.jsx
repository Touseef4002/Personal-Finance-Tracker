import { React, useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import userContext from '../../context/userContext'

const SideMenu = () => {
    const { user, clearUser } = useContext(userContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === '/logout') {
            handleLogout();
            return;
        }

        navigate(route);
    }

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    }

    return (
        <div>SideMenu</div>
    )
}

export default SideMenu