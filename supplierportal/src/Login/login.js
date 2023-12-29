import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchLoginUser } from './login.action';
import backgroundImage from './BackGround.png';
import logo from './Logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signInOption, setSignInOption] = useState('email');
    
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

    const handleCreateAccount = () => {
        navigate('/register');
      };

    return (
        <div style={{ border: '2px solid pink', padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
            </div>
            <div>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Supplier Connect</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        <input
                            type="radio"
                            value="email"
                            checked={signInOption === 'email'}
                            onChange={() => setSignInOption('email')}
                        />
                        Sign In Using Email Address
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="supplierNumber"
                            checked={signInOption === 'supplierNumber'}
                            onChange={() => setSignInOption('supplierNumber')}
                        />
                        Sign In Using Supplier Number
                    </label>
                </div>
                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder={signInOption === 'supplierNumber' ? "Supplier Number" : "Email Address"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width : '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width : '100%' }}
                    />
                </div>
                <div>
                    <button onClick={handleLogin} style={{ width : '100%', marginBottom: '10px' }}>Sign In</button>
                </div>
                <div>
                    <button onClick={handleCreateAccount} style={{ width : '100%', marginBottom: '10px' }}>Create an Account</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
