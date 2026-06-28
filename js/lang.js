let currentLang = localStorage.getItem('siteLang') || 'ar';

document.addEventListener('DOMContentLoaded', () => {
    // لما الصفحة تفتح، نطبق اللغة المخزنة
    applyLanguage(currentLang);
});

function toggleLanguage() {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    showPreloader(() => {
        applyLanguage(nextLang);
        currentLang = nextLang;
        localStorage.setItem('siteLang', currentLang);
    });
}

function applyLanguage(lang) {
    const html = document.documentElement;
    const langText = document.getElementById('langText');

    const elements = document.querySelectorAll('[en-lang][ar-lang]');
    elements.forEach(el => {
        const textNode = Array.from(el.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
        );
        if (!textNode) return;
        textNode.textContent = lang === 'ar' ? el.getAttribute('ar-lang') : el.getAttribute('en-lang');
    });

    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        if(langText) langText.textContent = 'EN';
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        if(langText) langText.textContent = 'AR';
    }

    // تغيير الـ placeholders
    document.querySelectorAll('input, textarea').forEach(el => {
        if (lang === 'en') {
            el.placeholder = el.getAttribute('en-lang') || el.placeholder;
        } else {
            el.placeholder = el.getAttribute('ar-lang') || el.placeholder;
        }
    });
}

// Preloader
function showPreloader(callback) {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'flex';
    setTimeout(() => {
        preloader.style.display = 'none';
        if (callback) callback();
    }, 2000);
}
