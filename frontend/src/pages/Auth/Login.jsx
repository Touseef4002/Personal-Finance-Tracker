import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = React.useContext(UserContext);

    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email) || !password) {
            setError('Please check your email and password');
            return;
        }

        setError("");

        //Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser({
                    id: user._id,           // Backend uses _id, frontend expects id
                    name: user.name,
                    email: user.email,
                    profileImageUrl: user.profileImageUrl
                });
                navigate('/dashboard');
            }
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
                <h3 className='text-3xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your credentials to log in to your account.
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        label='Email Address'
                        placeholder='john@example.com'
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        label='Password'
                        placeholder='Minimum 8 characters'
                    />

                    {error && <p className='text-red-500 tex-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-purple-500'>
                        LOGIN
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Dont have an account? {" "}
                        <Link className='font-medium text-purple-500 underline' to='/signup'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login