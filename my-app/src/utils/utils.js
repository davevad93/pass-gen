export const generatePasswordFromAPI = async (length, useUpper, useLower, useDigits, useSpecial, excludeDuplicates) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const response = await fetch(
        `${apiUrl}/generate-password?length=${length}&use_upper=${useUpper}&use_lower=${useLower}&use_digits=${useDigits}&use_special=${useSpecial}&exclude_duplicates=${excludeDuplicates}`
    );
    if (!response.ok) throw new Error('Failed to generate password');
    return await response.json();
};

export const getMaxUniqueCharacters = (useUpper, useLower, useDigits, useSpecial) => {
    let maxUniqueChars = 0;
    if (useUpper) maxUniqueChars += 26;
    if (useLower) maxUniqueChars += 26;
    if (useDigits) maxUniqueChars += 10;
    if (useSpecial) maxUniqueChars += 32;
    return maxUniqueChars;
};

export const getSelectedCharacterSets = (useUpper, useLower, useDigits, t) => {
    const sets = [];
    if (useUpper || useLower) sets.push(t('unique_characters'));
    if (useDigits) sets.push(t('single_digits'));
    return sets.join(', ');
};

export const validatePasswordLength = (length, excludeDuplicates, maxUniqueChars, t, useUpper, useLower, useDigits) => {
    const selectedCharacterSets = getSelectedCharacterSets(useUpper, useLower, useDigits, t);

    if (excludeDuplicates && length > maxUniqueChars) {
        return {
            exceeded: true,
            message: t('max_length_error', { maxUniqueChars, selectedCharacterSets })
        };
    }
    return { exceeded: false, message: '' };
};

export const calculatePasswordStrength = (password, useUpper, useLower, useDigits, useSpecial, t) => {
    const patternsUsed = [useUpper, useLower, useDigits, useSpecial].filter(Boolean).length;
    let strengthLabel;
    let strengthClass;

    if (password.length >= 12 && patternsUsed === 4 || password.length >= 16 && patternsUsed >= 3) {
        strengthLabel = t('strength.veryStrong');
        strengthClass = 'very-strong';
    } else if (password.length >= 10 && patternsUsed >= 3 || password.length >= 12 && patternsUsed >= 2) {
        strengthLabel = t('strength.strong');
        strengthClass = 'strong';
    } else if (password.length >= 8 && patternsUsed >= 2 || password.length >= 10 && patternsUsed >= 1) {
        strengthLabel = t('strength.medium');
        strengthClass = 'medium';
    } else if (password.length >= 6) {
        strengthLabel = t('strength.weak');
        strengthClass = 'weak';
    } else {
        strengthLabel = t('strength.veryWeak');
        strengthClass = 'very-weak';
    }

    return { label: strengthLabel, className: strengthClass };
};

export const copyPasswordToClipboard = (password, t) => {
    navigator.clipboard.writeText(password);
    alert(t('passwordCopied'));
};
