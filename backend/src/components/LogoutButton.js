import React from "react";
import { useAuth } from '../contexts/AuthContext';

export function LogoutButton() {
    const { setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}