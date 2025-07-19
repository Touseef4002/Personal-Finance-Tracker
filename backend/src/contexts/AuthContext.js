import React, {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || document.cookie.split('; ').find(row => row.startsWith('authToken='));
    
        if(storedToken) setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}