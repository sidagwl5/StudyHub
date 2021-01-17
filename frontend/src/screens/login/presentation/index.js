import React from 'react';
import Axios from 'axios';


const Login = () => {

    const handleClick = () => {
        window.open("http://localhost:5000/user/google");
    }

    return (
        <div>
            <p>Login</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default Login