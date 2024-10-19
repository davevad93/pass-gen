import React from 'react';
import './css/PasswordDisplay.css';

const PasswordDisplay = ({ displayPassword, errorMessage, maxUniqueCharsExceeded, strength }) => (
    <div className="password-container">
        <input
            type="text"
            value={maxUniqueCharsExceeded ? errorMessage : displayPassword}
            readOnly
            className={`password-input ${maxUniqueCharsExceeded ? 'error' : strength?.className}`}
            aria-label={maxUniqueCharsExceeded ? 'Error message' : 'Generated password'}
            aria-invalid={maxUniqueCharsExceeded}
        />
        {strength && !maxUniqueCharsExceeded && (
            <div 
                className={`strength-meter ${strength.className}`} 
                aria-live="polite"
            >
                {strength.label}
            </div>
        )}
    </div>
);

export default PasswordDisplay;

