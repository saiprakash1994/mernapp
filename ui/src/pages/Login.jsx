import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../utils'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = "https://mernapp-sage.vercel.app/auth/login";
            const response = await axios.post(url, loginInfo)
            console.log(response, 'dddddddd')
            const { success, message, jwtToken, name } = response.data;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name)
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        } catch (error) {
            console.error('Signup error:', error?.response?.data)
            handleError(error?.response?.data?.error?.details[0].message || error?.response?.data?.message || 'An unexpected error occurred');
        }
    };
    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => { handleChange(e) }}
                        type='text'
                        name='email'
                        placeholder='Enter your Email ..'
                        value={loginInfo.email}

                    ></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={(e) => { handleChange(e) }}
                        type='text'
                        name='password'
                        placeholder='Enter your Password ..'
                        value={loginInfo.password}

                    ></input>
                </div>
                <button type='submit'>Login</button>
                <span>Create a New Account</span>
                <Link to="/signup">Signup</Link>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
