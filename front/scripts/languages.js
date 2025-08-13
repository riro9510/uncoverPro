import { GetRequest } from './api/typeRequest.js';

let languagePackage = {};

const languagesSelector = async () => {
    console.log('5️⃣ languagesSelector start');
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) {
        console.log('5️⃣❌ languagesSelector end: no languageSelect');
        return;
    }
    const listLanguagesRequest = new GetRequest('language');
    const languages = await listLanguagesRequest.send();
    console.log('6️⃣ languagesSelector languages', { languages });
    if (languages.length === 0) {
        console.error('No languages found');
        console.log('6️⃣❌ languagesSelector end: no languages');
        return;
    }
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.language;
        option.textContent = language.name;
        languageSelect.appendChild(option);
    });
    console.log('7️⃣ languagesSelector end');
}

const loadingLanguages = async () => {
    console.log('1️⃣ loadingLanguages start');
    let defaultLanguage = await localStorage.getItem("language") || 'en';
    const gettingLanguageSelected = new GetRequest(`language/${defaultLanguage}`);
    const languageSelect = await gettingLanguageSelected.send();
    console.log('4️⃣ loadingLanguages languageSelect', { languageSelect });
    const isRtl = languageSelect["isRTL"] || false;
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    languagePackage = languageSelect["translations"];
    console.log("extracted languagePackage", { languagePackage });  
    if (languagePackage) {
        await languagesSelector(); 
        const languageSelectElement = document.getElementById('language-select');
        if (languageSelectElement) {
            languageSelectElement.value = defaultLanguage;
            languageSelectElement.addEventListener('change', async (event) => {
                const selectedLanguage = event.target.value;
                await localStorage.setItem("language", selectedLanguage);
                window.location.reload();
            });
        }
    } else {
        console.error('No languages available to load');
    }
    console.log('8️⃣ loadingLanguages end');
}

const initialLoading = async () => {
    console.log('0️⃣ initialLoading start');
    await loadingLanguages(); // → 1️⃣ al 8️⃣
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroButton = document.querySelector('.ctaModalBtn');

    console.log('9️⃣ initialLoading languagePackage', languagePackage,languagePackage.h1, languagePackage.subtitle, languagePackage.cta );

    if (heroTitle) heroTitle.textContent = languagePackage.hero.h1 || 'Create your CV & COVER LETTER';
    if (heroText) heroText.textContent = languagePackage.hero.subtitle|| 'Quickly generate a professional CV and COVER LETTER.';
    if (heroButton) heroButton.textContent = languagePackage.hero.cta || 'Get Started';

    console.log('🔟 initialLoading end');
}

document.addEventListener('DOMContentLoaded', () => {
    initialLoading(); // → 0️⃣
});
