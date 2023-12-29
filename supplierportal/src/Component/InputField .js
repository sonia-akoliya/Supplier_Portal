import React from 'react';

const InputField = ({type, placeholder, value, onChange, error, touched, required }) => (
    <div style={{ marginBottom: '10px' }}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{ width: '100%' }}
            required={required}
            onBlur={() => touched(true)}
        />
        {touched && error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    </div>
);

export default InputField;
