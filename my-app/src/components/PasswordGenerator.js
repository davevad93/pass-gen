import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSpecial, setUseSpecial] = useState(false);
    const [excludeDuplicates, setExcludeDuplicates] = useState(false);	
	const [strength, setStrength] = useState('');

    const generatePassword = async () => {
        const response = await fetch(`http://localhost:5000/generate-password?length=${length}&use_upper=${useUpper}&use_lower=${useLower}&use_digits=${useDigits}&use_special=${useSpecial}&exclude_duplicates=${excludeDuplicates}`);
        const data = await response.json();
        setPassword(data.password);
		calculateStrength(data.password);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard");
    };
	
    const calculateStrength = (pwd) => {
        const patternsUsed = [useUpper, useLower, useDigits, useSpecial].filter(Boolean).length;

        if (pwd.length >= 12) {
            setStrength('Godlike');
        } else if (pwd.length >= 8) {
            setStrength('Strong');
        } else if (pwd.length >= 5 && patternsUsed >= 3) {
            setStrength('Average');
        } else {
            setStrength('Weak');
        }
    };

    const handleCheckboxChange = (setter, currentValue) => (event) => {
        if (!currentValue) {
            setter(event.target.checked);
            return;
        }

        const patternsUsed = [useUpper, useLower, useDigits, useSpecial].filter(Boolean).length;
        if (patternsUsed > 1) {
            setter(event.target.checked);
        }
    };	

    return (
        <div className="password-generator">
            <h1>Password Generator</h1>
            <div className="password-container">
                <input 
                    type="text" 
                    value={password} 
                    readOnly 
                    className={`password-input ${strength ? strength.toLowerCase() : ''}`} 
                />
                {password && <div className={`strength-meter ${strength.toLowerCase()}`}>
                    {strength}
                </div>}
            </div>
            <div className="button-group">
                <button onClick={generatePassword}>Generate Password</button>
                <button onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
            <div className="slider-container">
                <label>Password length:</label>
                <input
                    type="range"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
					className="length-slider"
                />
                <span>{length}</span>
            </div>
            <div className="character-options">
                <label>Patterns:</label>
                <label>
                    <input
                        type="checkbox"
                        checked={useUpper}
                        onChange={handleCheckboxChange(setUseUpper, useUpper)}
                    /> ABC
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useLower}
                        onChange={handleCheckboxChange(setUseLower, useLower)}
                    /> abc
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useDigits}
                        onChange={handleCheckboxChange(setUseDigits, useDigits)}
                    /> 123
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useSpecial}
                        onChange={handleCheckboxChange(setUseSpecial, useSpecial)}
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
