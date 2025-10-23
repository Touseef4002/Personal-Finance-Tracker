import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';
import { UserContext } from '../../context/userContext';

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { updateUser } = React.useContext(UserContext);

    // Handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        let profilePicURL = "";

        if (!name) {
            setError('Please enter your full name');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setError("");

        //Signup API call
        // If a profile picture is selected, upload it and get the URL
        if (profilePic) {
            const imgUploadResponse = await uploadImage(profilePic);
            console.log('Image upload response:', imgUploadResponse);
            profilePicURL = imgUploadResponse.data.imageUrl || ""; // Assuming the response contains the image URL
        }


        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
                name,
                email,
                password,
                profileImageUrl: profilePicURL
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            }

        }
        catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message || 'Signup failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

                <form onSubmit={handleSignup}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            label='Full Name'
                            placeholder='John Doe'
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            label='Email Address'
                            placeholder='john@example.com'
                        />
                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                label='Password'
                                placeholder='Minimum 8 characters'
                            />
                        </div>
                    </div>
                    {error && <p className='text-red-500 tex-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-purple-500'>
                        SIGN UP
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account? {" "}
                        <Link className='font-medium text-purple-500 underline' to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Signup