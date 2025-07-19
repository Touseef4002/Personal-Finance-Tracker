// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  // State to manage which form is showing (login or register)
  const [isLogin, setIsLogin] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const { email, password, confirmPassword } = formData;
      
      // Basic form validation
      if (!email || !password) {
        setErrors({ general: 'Please fill in all required fields' });
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        setErrors({ general: 'Passwords do not match' });
        return;
      }

      // Call the backend API
      const response = await axios.post(`/${isLogin ? 'login' : 'register'}`, {
        email,
        password
      });

      // Handle successful authentication
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      
      // Redirect or navigate to protected route
      window.location.href = '/dashboard'; // Assuming you have a dashboard route

    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <button type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p>
          {isLogin ? 'Need an account? ' : 'Already have an account? '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;