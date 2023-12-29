import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectLoginUser } from './login.selector';
import { fetchLoginUser } from './login.action';
import backgroundImage from './BackGround.png';
import {logo} from './Logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const selectedLoginUser = useSelector(selectLoginUser);

    const handleLogin = async () => {
        try {
            const queryFilter = {
                "Username": username,
                "Password": password
            }
            dispatch(fetchLoginUser({ body: queryFilter }));
             navigate('/welcome');
        } catch (error) {
            console.error('POST request failed', error);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex'}}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', maxWidth: '400px', width: '80%' }}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <button onClick={handleLogin} style={{ width: '100%' }}>Login</button>
            </div>
        </div>
    );
};

export default Login;
