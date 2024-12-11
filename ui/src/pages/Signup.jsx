import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../utils'
import axios from 'axios'
const Signup = () => {
    const navigate = useNavigate()
    const [signUpInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }
    const handleSignUp = async (e) => {
        console.log('click')
        e.preventDefault();
        const { name, email, password } = signUpInfo;
        if (!name || !email || !password) {
            return handleError('name,email and password are required')
        }
        try {
            const url = "https://mernapp-saiprakash1994s-projects.vercel.app/auth/signup";
            const response = await axios.post(url, signUpInfo)
            console.log(response, 'dddddddd')
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (error) {
            console.error('Signup error:', error?.response?.data)
            handleError(error?.response?.data?.error?.details[0].message || error?.response?.data?.message || 'An unexpected error occurred');
        }
    };
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={(e) => { handleChange(e) }}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your Name ..'
                        value={signUpInfo.name}
                    ></input>
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => { handleChange(e) }}
                        type='text'
                        name='email'
                        placeholder='Enter your Email ..'
                        value={signUpInfo.email}

                    ></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={(e) => { handleChange(e) }}
                        type='text'
                        name='password'
                        placeholder='Enter your Password ..'
                        value={signUpInfo.password}

                    ></input>
                </div>
                <button type='submit'>SignUp</button>
                <span>Already have account</span>
                <Link to="/login">Login</Link>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
