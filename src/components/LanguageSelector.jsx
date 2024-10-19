import React from 'react';
import { useTranslation } from 'react-i18next';
import './css/LanguageSelector.css';

const LanguageSelector = () => {
    const { i18n, t } = useTranslation();

    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <select
            onChange={handleChangeLanguage}
            value={i18n.language}
            className="language-selector"
            aria-label={t('languageSelector')}
        >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="it">Italiano</option>
        </select>
    );
};

export default LanguageSelector;
