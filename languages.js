// Configuration parameters
const supportedLanguages = ['en', 'de', 'lu'];
const defaultLang = 'lu';
const storageKey = 'user-language';

// Fetch JSON data and update DOM elements
async function setLanguage(lang) {
  try {
    // Request localized JSON dictionary
    const response = await fetch(`/code/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Could not load ${lang} translations.`);
    const translations = await response.json();

    // Loop through elements marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    // Update root metadata for accessibility and SEO
    document.documentElement.lang = lang;
    localStorage.setItem(storageKey, lang);
    document.getElementById('lang-switcher').value = lang;
  } catch (error) {
    console.error('Translation error:', error);
  }
}

// Initial initialization process
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem(storageKey);
  const browserLang = navigator.language.split('-')[0];
  const initialLang = supportedLanguages.includes(savedLang)
    ? savedLang
    : supportedLanguages.includes(browserLang)
      ? browserLang
      : defaultLang;


  // Bind dropdown element listener
  document.getElementById('lang-switcher').addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });

  // Run initial state load
  setLanguage(initialLang);
});
