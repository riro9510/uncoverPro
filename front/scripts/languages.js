let languagePackage = {};

const fetchingLanguages = async (lang) => {
    console.log('fetchingLanguages start', { lang });
    try {
        const currentLanguage = lang ? lang : undefined;
        const response = await fetch(!currentLanguage ? 'http://localhost:3000/api/language':`http://localhost:3000/api/language/${currentLanguage}`); //'https://uncoverpro.onrender.com/language' : `https://uncoverpro.onrender.com/language/${currentLanguage}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const languages = await response.json();
        console.log('fetchingLanguages end', { languages });
        return languages;
    } catch (error) {
        console.error('Error fetching languages:', error);
        console.log('fetchingLanguages end with error', { error });
        return [];
    }
}

const languagesSelector = async () => {
    console.log('languagesSelector start');
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) {
        console.log('languagesSelector end: no languageSelect');
        return;
    }

    const languages = await fetchingLanguages();
    console.log('languagesSelector languages', { languages });
    if (languages.length === 0) {
        console.error('No languages found');
        console.log('languagesSelector end: no languages');
        return;
    }
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.language;
        option.textContent = language.name;
        languageSelect.appendChild(option);
    });
    console.log('languagesSelector end');
}

const loadingLanguages = async () => {
    console.log('loadingLanguages start');
    let defaultLanguage = await localStorage.getItem("language") || 'en';
    const languageSelect = await fetchingLanguages(defaultLanguage);
    console.log('loadingLanguages languageSelect', { languageSelect });
    languagePackage = languageSelect["translations"];
    if (languageSelect.length > 0) {
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
    console.log('loadingLanguages end');
}

const initialLoading = async () => {
    console.log('initialLoading start');
    await loadingLanguages();
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroButton = document.querySelector('.ctaModalBtn');

    console.log('initialLoading languagePackage', { languagePackage });

    if (heroTitle) heroTitle.textContent = languagePackage['h1'] || 'Create your CV & COVER LETTER';
    if (heroText) heroText.textContent = languagePackage['p'] || 'Quickly generate a professional CV and COVER LETTER.';
    if (heroButton) heroButton.textContent = languagePackage['cta'] || 'Get Started';

    console.log('initialLoading end');
}

initialLoading();
