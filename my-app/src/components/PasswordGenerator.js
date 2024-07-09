import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSpecial, setUseSpecial] = useState(false);
    const [excludeDuplicates, setExcludeDuplicates] = useState(false);	

    const generatePassword = async () => {
        const response = await fetch(`http://localhost:5000/generate-password?length=${length}&use_upper=${useUpper}&use_lower=${useLower}&use_digits=${useDigits}&use_special=${useSpecial}&exclude_duplicates=${excludeDuplicates}`);
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
            <input type="text" value={password} readOnly className="password-input" />
            <div className="button-group">
                <button onClick={generatePassword}>Generate Password</button>
                <button onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
            <div className="slider-container">
                <label>Password length:</label>
                <input
                    type="range"
                    min="8"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
					className="length-slider"
                />
                <span>{length}</span>
            </div>
            <div className="character-options">
                <label>Characters used:</label>
                <label>
                    <input
                        type="checkbox"
                        checked={useUpper}
                        onChange={(e) => setUseUpper(e.target.checked)}
                    /> ABC
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useLower}
                        onChange={(e) => setUseLower(e.target.checked)}
                    /> abc
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useDigits}
                        onChange={(e) => setUseDigits(e.target.checked)}
                    /> 123
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useSpecial}
                        onChange={(e) => setUseSpecial(e.target.checked)}
                    /> #$&
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={excludeDuplicates}
                        onChange={(e) => setExcludeDuplicates(e.target.checked)}
                    /> Exclude Duplicate Characters
                </label>
            </div>			
        </div>
    );
};

export default PasswordGenerator;
