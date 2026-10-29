// SMA Cendekia Nusantara — interactive front-end
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const backTop = document.getElementById('backTop');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the navigation item for the visible section.
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(section => observer.observe(section));
}

window.addEventListener('scroll', () => {
  backTop?.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('year').textContent = new Date().getFullYear();

// Demo form: persist inquiries only in this browser's local storage.
const interestForm = document.getElementById('interestForm');
const formFeedback = document.getElementById('formFeedback');
interestForm?.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(interestForm);
  const inquiry = {
    name: String(formData.get('studentName')).trim(),
    email: String(formData.get('studentEmail')).trim(),
    grade: String(formData.get('studentGrade')),
    createdAt: new Date().toISOString()
  };
  const inquiries = JSON.parse(localStorage.getItem('cendekiaPpdbInquiries') || '[]');
  inquiries.push(inquiry);
  localStorage.setItem('cendekiaPpdbInquiries', JSON.stringify(inquiries));
  formFeedback.textContent = `Terima kasih, ${inquiry.name}! Minat pendaftaran tersimpan di browser ini.`;
  interestForm.reset();
});
