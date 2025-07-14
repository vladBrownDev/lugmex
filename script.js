const href = window.location.origin + window.location.pathname
// Init i18next
i18next.init({
  lng: 'pl',
  debug: false,
  resources
}, () => updateContent());

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });

  const currentLang = i18next.language;

  const langDetails = {
    en: {
      label: 'English',
      flag: href + 'media/united-kingdom.png'
    },
    pl: {
      label: 'Pólska',
      flag: href + 'media/poland.png'
    }
  };

  const lang = langDetails[currentLang];
  const currentLangBtn = document.getElementById('currentLang');

  if (lang) {
    currentLangBtn.innerHTML = `<img src="${lang.flag}" alt="${lang.label}" style="width: 16px; height: 16px; margin-right: 8px;" /> ${lang.label}`;
  } else {
    currentLangBtn.textContent = '🌐 Language';
  }
}



// Toggle Dropdown
const langSwitch = document.getElementById('langSwitch');
const langOptions = document.getElementById('langOptions');
const currentLangBtn = document.getElementById('currentLang');

currentLangBtn.addEventListener('click', () => {
  langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
});

// Select a Language
document.querySelectorAll('.lang-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedLang = option.getAttribute('data-lang');
    i18next.changeLanguage(selectedLang, updateContent);
    langOptions.style.display = 'none';
  });
});

// Click outside to close dropdown
document.addEventListener('click', function (e) {
  if (!langSwitch.contains(e.target)) {
    langOptions.style.display = 'none';
  }
});

const mainElement = document.querySelector('#main_part');
let currentSlide = 0;
const totalSlides = 11;
const base64Images = [];

const images = [
  href + '/media/slider/1.JPG',
  href + '/media/slider/2.JPG',
  href + '/media/slider/3.JPG',
  href + '/media/slider/4.JPG',
  href + '/media/slider/5.JPG',
  href + '/media/slider/6.JPG',
  href + '/media/slider/7.JPG',
  href + '/media/slider/8.JPG',
  href + '/media/slider/9.JPG',
  href + '/media/slider/10.JPG',
  href + '/media/slider/11.JPG'
]

function isSafariOnMac() {
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isSafari && isMac;
}

const main = document.querySelector('#main_part');
main.style.backgroundImage = `url(${images[0]})`
document.querySelector('.hidden').src = images[1]
let i = 1
setInterval(() => {
  main.style.backgroundImage = `url(${images[i++]})`

  if (i === images.length) i = 0
  else {
    // preload the next image, so that it transitions smoothly
    document.querySelector('.hidden').src = images[i]
  }
}, 4500)

if(isSafariOnMac()) {
  main.style.backgroundColor = 'rgb(69, 64, 64)';
  main.style.transition = 'none';
}

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('service_5l8hnze', 'template_4faon2p', this)
    .then(function () {
      contactForm.reset();
      document.querySelector('#submit_btn').innerText();
    }, function (error) {
      console.error('Failed to send:', error);
    });
});