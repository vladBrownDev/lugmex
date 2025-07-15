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

function isSafari() {
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return isSafari;
}

const main = document.querySelector('#main_background');
main.style.backgroundImage = `url(${images[0]})`
document.querySelector('.hidden').src = images[1]
let i = 1
if(!isSafari()) {
  setInterval(() => {
    main.style.backgroundImage = `url(${images[i++]})`
  
    if (i === images.length) i = 0
    else {
      // preload the next image, so that it transitions smoothly
      document.querySelector('.hidden').src = images[i]
    }
  }, 4500)
}
else {
  main.style.transition = 'opacity 0.5s ease';

  setInterval(() => {
    // Step 1: Fade out
    main.style.opacity = '0';
  
    // Step 2: After fade-out completes, change background and fade in
    setTimeout(() => {
      main.style.backgroundImage = `url(${images[i]})`;
      main.style.opacity = '1';
  
      // Step 3: Preload next image
      let nextIndex = (i + 1) % images.length;
      document.querySelector('.hidden').src = images[nextIndex];
  
      i = nextIndex;
    }, 500); // match the CSS transition duration
  }, 4500);
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