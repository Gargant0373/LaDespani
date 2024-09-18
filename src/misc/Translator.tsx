type Translation = {
    [key: string]: string;
};

type Translations = {
    lang: string;
    translations: Translation;
}[];

let translations: Translations = [];

const PATH_TO_TRANSLATIONS = "./translations/";

async function fetchTranslations(lang: string) {
    return fetch(`${PATH_TO_TRANSLATIONS}${lang}.json`)
        .then(response => response.json())
        .then(data => {
            const existingTranslation = translations.find(t => t.lang === lang);
            if (existingTranslation) {
                existingTranslation.translations = data;
            } else {
                translations.push({ lang, translations: data });
            }
        });
}

export async function translate(id: string, lang: string): Promise<string> {
    let translation = translations.find(t => t.lang === lang);
    if (!translation) {
        await fetchTranslations(lang);
        translation = translations.find(t => t.lang === lang);
    }
    return translation?.translations[id] || id;
}