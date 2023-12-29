import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegistrationUser } from './Registration.action';
import backgroundImage from './BackGround.png';
import logo from './Logo.png';
import countryCodes from './countryCodes.json';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSendOTP = async () => {
        try {
            if (!agreeTerms) {
                // Display an error message or handle the case where terms are not agreed
                return;
            }

            // Your registration logic here
            // dispatch(fetchRegistrationUser({ body: yourRegistrationData }));
            dispatch(fetchRegistrationUser());
            navigate('/welcome');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const navigateToSignIn = () => {
        navigate('/login');
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', maxWidth: '400px', textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                <h2>Registration</h2>
                <input
                    type="text"
                    placeholder="COMPANY NAME"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    required
                />
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const selectedCode = e.target.value;
                            const country = countryCodes.find((c) => c.code === selectedCode);
                            setSelectedCountry(country);
                        }}
                        required
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name} ({country.dialCode})
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ marginLeft: '10px', width: '100%' }}
                        required
                    />
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                    required
                />
                <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                            required
                        />
                        I agree to the Al Shirawi Group credit terms and policy
                    </label>
                </div>
                <button onClick={handleSendOTP} style={{ width: '30%' }}>Send OTP</button>
                <button onClick={navigateToSignIn} style={{ width: '30%' }}>Sign In</button>
            </div>
        </div>
    );
};

export default Registration;
