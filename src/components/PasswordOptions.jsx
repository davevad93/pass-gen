import React from 'react';
import './css/PasswordOptions.css';

const PasswordOptions = ({
    length, 
    setLength, 
    useUpper, 
    setUseUpper, 
    useLower, 
    setUseLower,
    useDigits, 
    setUseDigits, 
    useSpecial, 
    setUseSpecial, 
    excludeDuplicates, 
    setExcludeDuplicates,
    t
}) => {
    function handleCheckboxChange(setter, currentValue) {
        const patternsUsed = [useUpper, useLower, useDigits, useSpecial].filter(Boolean).length;
    
        if (patternsUsed === 1 && currentValue) {
            return;
        }

        setter(prevValue => !prevValue);
    }

    return (
        <>
            <div className="slider-container">
                <label htmlFor="password-length">{t('passwordLength')}:</label>
                <input
                    type="range"
                    id="password-length"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="length-slider"
                    aria-valuemin="4"
                    aria-valuemax="32"
                    aria-valuenow={length}
                    aria-label={t('passwordLength')}
                />
                <span>{length}</span>
            </div>
            <div className="character-options">
                <label>
                    <input
                        type="checkbox"
                        checked={useUpper}
                        onChange={() => handleCheckboxChange(setUseUpper, useUpper)}
                        aria-label={t('uppercase')}
                    />
                    {t('uppercase')}
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useLower}
                        onChange={() => handleCheckboxChange(setUseLower, useLower)}
                        aria-label={t('lowercase')}
                    />
                    {t('lowercase')}
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useDigits}
                        onChange={() => handleCheckboxChange(setUseDigits, useDigits)}
                        aria-label={t('digits')}
                    />
                    {t('digits')}
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useSpecial}
                        onChange={() => handleCheckboxChange(setUseSpecial, useSpecial)}
                        aria-label={t('specialChars')}
                    />
                    {t('specialChars')}
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={excludeDuplicates}
                        onChange={() => handleCheckboxChange(setExcludeDuplicates, excludeDuplicates)}
                        aria-label={t('excludeDuplicates')}
                    />
                    {t('excludeDuplicates')}
                </label>
            </div>
        </>
    );
};

export default PasswordOptions;
