import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegistrationUser } from './Registration.action';
import backgroundImage from './BackGround.png';
import logo from './Logo.png';
import countryCodes from './countryCodes.json';
import InputField from '../Component/InputField ';

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
    const [location, setLocation] = useState('UAE');

    const [touchedFields, setTouchedFields] = useState({
        companyName: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
        agreeTerms: false,
        location: false,
    });

    const handleSendOTP = async () => {
        try {
            setTouchedFields({
                companyName: true,
                email: true,
                phoneNumber: true,
                password: true,
                confirmPassword: true,
                agreeTerms: true,
            });

            if (!companyName || !email || !phoneNumber || !password || !confirmPassword || !agreeTerms) {
                return;
            }

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
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', maxWidth: '400px', maxWidth: '600px', textAlign: 'center', marginLeft: 'auto', marginRight: '10%' }}>
                <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                <h2>Supplier Connect</h2>
                <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                    <label>
                        <input
                            type="radio"
                            value="UAE"
                            checked={location === 'UAE'}
                            onChange={() => {
                                setLocation('UAE');
                                setSelectedCountry(countryCodes.find(country => country.code === 'AE'));
                            }}
                        />
                        UAE
                    </label>
                    <label style={{ marginLeft: '20px' }}>
                        <input
                            type="radio"
                            value="OUTSIDE UAE"
                            checked={location === 'OUTSIDE UAE'}
                            onChange={() => setLocation('OUTSIDE UAE')}
                        />
                        OUTSIDE UAE
                    </label>
                </div>
                <InputField
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    touched={(isTouched) => setTouchedFields({ ...touchedFields, companyName: isTouched })}
                    error={touchedFields.companyName && !companyName && "Company Name is required field"}
                />
                <InputField
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    touched={(isTouched) => setTouchedFields({ ...touchedFields, email: isTouched })}
                    error={touchedFields.email && !email && "Email is required field"}
                />
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const selectedCode = e.target.value;
                            const country = countryCodes.find((c) => c.code === selectedCode);
                            setSelectedCountry(country);
                        }}
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name} ({country.dialCode})
                            </option>
                        ))}
                    </select>
                    <InputField
                        type="text"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        touched={(isTouched) => setTouchedFields({ ...touchedFields, phoneNumber: isTouched })}
                        error={touchedFields.phoneNumber && !phoneNumber && "Phone Number is required field"}
                        style={{ marginLeft: '10px', width: '100%' }}
                    />
                </div>
                <InputField
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    touched={(isTouched) => setTouchedFields({ ...touchedFields, password: isTouched })}
                    error={touchedFields.password && !password && "Password is required field"}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <InputField
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    touched={(isTouched) => setTouchedFields({ ...touchedFields, confirmPassword: isTouched })}
                    error={touchedFields.confirmPassword && !confirmPassword && "Confirm Password is required field"}
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <InputField
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                        touched={(isTouched) => setTouchedFields({ ...touchedFields, agreeTerms: isTouched })}
                        error={touchedFields.agreeTerms && !agreeTerms && "Agree Terms is required field"}
                        style={{ marginRight: '10px' }}
                    />
                    <label style={{ flex: 1 }}>
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
