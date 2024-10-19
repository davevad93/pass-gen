import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import PasswordDisplay from './PasswordDisplay';
import PasswordControls from './PasswordControls';
import PasswordOptions from './PasswordOptions';
import Footer from './Footer';
import './css/PasswordGenerator.css';

import {
    generatePasswordFromAPI,
    getMaxUniqueCharacters,
    validatePasswordLength,
    calculatePasswordStrength,
    copyPasswordToClipboard
} from '../utils/utils';

const PasswordGenerator = () => {
    const { t, i18n } = useTranslation();
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState('');
    const [length, setLength] = useState(8);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSpecial, setUseSpecial] = useState(false);
    const [excludeDuplicates, setExcludeDuplicates] = useState(false);
    const [strength, setStrength] = useState(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [maxUniqueCharsExceeded, setMaxUniqueCharsExceeded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const generatePassword = async () => {
        if (maxUniqueCharsExceeded) return;

        try {
            const data = await generatePasswordFromAPI(length, useUpper, useLower, useDigits, useSpecial, excludeDuplicates);
            setPassword(data.password);
            setDisplayPassword(data.password);
            const strengthData = calculatePasswordStrength(data.password, useUpper, useLower, useDigits, useSpecial, t);
            setStrength(strengthData);
        } catch (error) {
            console.error('Error generating password:', error);
        }
    };

    const validateLength = () => {
        const maxUniqueChars = getMaxUniqueCharacters(useUpper, useLower, useDigits, useSpecial);
        const { exceeded, message } = validatePasswordLength(
            length,
            excludeDuplicates,
            maxUniqueChars,
            t,
            useUpper,
            useLower,
            useDigits
        );
        setMaxUniqueCharsExceeded(exceeded);
        setErrorMessage(message);
    };

    const copyToClipboard = () => {
        copyPasswordToClipboard(password, t);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    useEffect(() => {
        validateLength();
    }, [length, useUpper, useLower, useDigits, excludeDuplicates]);

    useEffect(() => {
        validateLength();
    }, [i18n.language]);

    useEffect(() => {
        if (password) {
            const strengthData = calculatePasswordStrength(password, useUpper, useLower, useDigits, useSpecial, t);
            setStrength(strengthData);
        }
    }, [i18n.language]);

    return (
        <div className={`password-generator ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} t={t} />
            <h1>{t('passgen')}</h1>
            <PasswordDisplay
                displayPassword={displayPassword}
                errorMessage={errorMessage}
                maxUniqueCharsExceeded={maxUniqueCharsExceeded}
                strength={strength}
            />
            <PasswordControls
                generatePassword={generatePassword}
                copyToClipboard={copyToClipboard}
                disabled={maxUniqueCharsExceeded}
                t={t}
            />
            <PasswordOptions
                length={length}
                setLength={setLength}
                useUpper={useUpper}
                setUseUpper={setUseUpper}
                useLower={useLower}
                setUseLower={setUseLower}
                useDigits={useDigits}
                setUseDigits={setUseDigits}
                useSpecial={useSpecial}
                setUseSpecial={setUseSpecial}
                excludeDuplicates={excludeDuplicates}
                setExcludeDuplicates={setExcludeDuplicates}
                t={t}
            />
            <Footer />
        </div>
    );
};

export default PasswordGenerator;
