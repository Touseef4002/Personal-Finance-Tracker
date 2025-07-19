import {useAuth} from './contexts/AuthContext';
import { use, useEffect } from 'react';
import AuthForm from './components/AuthForm';

function App() {
    const { token, setToken } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            if(token){
                try{
                    const response = await fetch('http://localhost:5000/api/validate', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        setToken(null);
                        localStorage.removeItem('token');
                        document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    }
                }
                catch (error) {
                    console.error('Error validating token:', error);
                    setToken(null);
                    localStorage.removeItem('authToken');
                    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }
            }
        }
        checkAuth();
    }
    , [token, setToken]);

    return (
    <div className="App">
      <AuthForm />
    </div>
    )
}