import React from 'react';
import LanguageSelector from './LanguageSelector';
import moonIcon from '../assets/moon.png';
import sunIcon from '../assets/sun.png';
import GitHubButton from 'react-github-btn';
import './css/Navbar.css';

const Navbar = ({ isDarkTheme, toggleTheme, t }) => (
    
    <nav className="navbar">
        <div className="left-section">
            <GitHubButton
                href="https://github.com/davevad93"
                data-show-count="false"
                data-color-scheme={isDarkTheme ? "no-preference: light; light: light; light: dark;" : "no-preference: light; dark: light; light: light;"}
                aria-label={t("followOnGitHub")}
            >
                {t("followOnGitHub")}
            </GitHubButton>
            <GitHubButton
                href="https://github.com/davevad93/pass-gen/fork"
                data-icon="octicon-repo-forked"
                data-color-scheme={isDarkTheme ? "no-preference: light; light: light; light: dark;" : "no-preference: light; dark: light; light: light;"}
                aria-label={t("Fork davevad93/pass-gen on GitHub")}
            >
                {t("forkOnGitHub")}
            </GitHubButton>
            <GitHubButton
                href="https://github.com/davevad93/pass-gen"
                data-icon="octicon-star"
                data-color-scheme={isDarkTheme ? "no-preference: light; light: light; light: dark;" : "no-preference: light; dark: light; light: light;"}
                aria-label={t("Star pass-gen on GitHub")}
            >
                {t("starOnGitHub")}
            </GitHubButton>
        </div>
        <div className="right-section">
            <LanguageSelector />
            <div className="theme-switcher" onClick={toggleTheme}>
                <img src={isDarkTheme ? sunIcon : moonIcon} alt={t("Theme Icon")} />
            </div>
        </div>
    </nav>
);

export default Navbar;
