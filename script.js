// Глобальний таймер створюється один раз і не залежить від активної секції.
const timerElement = document.querySelector('#session-timer');
const startedAt = Date.now();

function updateSessionTimer() {
  const totalSeconds = Math.floor((Date.now() - startedAt) / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  timerElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateSessionTimer();
window.setInterval(updateSessionTimer, 1000);

// Хеш-маршрутизація: URL змінюється, але HTML-документ не перезавантажується.
const sections = document.querySelectorAll('.page-section');
const navigationLinks = document.querySelectorAll('.nav-link');
const validRoutes = ['catalog', 'details', 'feedback'];

function renderRoute() {
  const requestedRoute = window.location.hash.slice(1);
  const route = validRoutes.includes(requestedRoute) ? requestedRoute : 'catalog';

  sections.forEach((section) => {
    section.classList.toggle('is-hidden', section.id !== route);
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${route}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('hashchange', renderRoute);
renderRoute();

// Форма працює локально: демонструє обробку події без надсилання на сервер.
const feedbackForm = document.querySelector('#feedback-form');
const formStatus = document.querySelector('#form-status');

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(feedbackForm);
  const userName = formData.get('name').trim();
  formStatus.textContent = `Дякуємо, ${userName}! Повідомлення успішно оброблено в демонстраційному режимі.`;
  feedbackForm.reset();
});
