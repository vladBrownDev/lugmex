
// Init i18next
i18next.init({
  lng: 'en',
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
      flag: '/media/united-kingdom.png'
    },
    pl: {
      label: 'Pólska',
      flag: '/media/poland.png'
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

// Load images as base64
function preloadImages() {
  let loaded = 0;

  for (let i = 1; i <= totalSlides; i++) {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important if hosted on a server with CORS

    img.onload = () => {
      // Convert to base64 via canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/jpeg'); // or 'image/png' if needed
      base64Images[i - 1] = dataURL;

      loaded++;
      if (loaded === totalSlides) {
        startSlideshow();
      }
    };

    img.src = `./media/slider/${i}.JPG`;
  }
}

function startSlideshow() {
  // Show the first image
  mainElement.style.backgroundImage = `url(${base64Images[currentSlide]})`;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    mainElement.style.backgroundImage = `url(${base64Images[currentSlide]})`;
  }, 4500);
}

preloadImages();

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