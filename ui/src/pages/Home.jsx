import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
const Home = () => {
    const [logginUser, setLogginUser] = useState('')
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    const handleSignOut = (() => {
        handleSuccess('Logout sucessfully')
        localStorage.removeItem('loggedInUser')
        localStorage.removeItem('token');
        setLogginUser(null)
        setTimeout(() => {
            navigate('/login')
        }, 1000);

    });
    const handleFetch = async () => {
        try {
            const url = "https://mernapp-saiprakash1994s-projects.vercel.app/products";

            const responce = await axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(responce.data)
            setProducts(responce?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        setLogginUser(localStorage.getItem('loggedInUser'))
        handleFetch()
    }, [])
    return (
        <div>
            <div>
                <h1>Products</h1>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((e, index) => (
                            <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <h1>{logginUser}</h1>
            <button type='button' onClick={() => { handleSignOut() }}>SignOut</button>
            <ToastContainer />

        </div>
    )
}

export default Home
