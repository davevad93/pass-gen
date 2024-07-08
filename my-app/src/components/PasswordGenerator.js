import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');

    const generatePassword = async () => {
        const response = await fetch('http://localhost:5000/generate-password');
        const data = await response.json();
        setPassword(data.password);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard");
    };

    return (
        <div className="password-generator">
            <h1>Password Generator</h1>
            <button onClick={generatePassword}>Generate Password</button>
            {password && (
                <div>
                    <p>{password}</p>
                    <button onClick={copyToClipboard}>Copy to Clipboard</button>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
