const fetchingLanguages = async (lang) => {
    console.log('2️⃣ fetchingLanguages start', { lang });
    try {
        const currentLanguage = lang ? lang : undefined;
        const response = await fetch(!currentLanguage 
            ? 'http://localhost:3000/api/language'
            : `http://localhost:3000/api/language/${currentLanguage}`
        );
        if (!response.status === 200) {
            throw new Error('Network response was not ok');
        }
        const languages = await response.json();
        console.log('3️⃣ fetchingLanguages end', { languages });
        return languages;
    } catch (error) {
        console.error('Error fetching languages:', error);
        console.log('3️⃣❌ fetchingLanguages end with error', { error });
        return [];
    }
}
