import React from 'react';
import './css/PasswordControls.css';

const PasswordControls = ({ generatePassword, copyToClipboard, disabled, t }) => {
    return (
        <div className="button-group">
            <button 
                onClick={generatePassword} 
                disabled={disabled} 
                aria-label={t('generatePassword')} 
            >
                {t('generatePassword')}
            </button>
            <button 
                onClick={copyToClipboard} 
                disabled={disabled} 
                aria-label={t('copyToClipboard')} 
            >
                {t('copyToClipboard')}
            </button>
        </div>
    );
};

export default PasswordControls;
