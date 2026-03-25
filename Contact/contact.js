/* ============================================
   ASHISH KUMAR - Contact Page JavaScript
   Dual send: WhatsApp or Email
   ============================================ */

// --- Page Loader ---
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.classList.add('loaded');
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

// --- Navbar Hamburger ---
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
})();

// --- Contact Form: WhatsApp or Email ---
(function() {
  const statusEl = document.getElementById('formStatus');
  const whatsappBtn = document.getElementById('sendWhatsApp');
  const emailBtn = document.getElementById('sendEmail');

  function getFormData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('message').value.trim();
    return { name, email, subject, message };
  }

  function validate({ name, email, message }) {
    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return false;
    }
    return true;
  }

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 6000);
  }

  function resetForm() {
    document.getElementById('contactForm').reset();
  }

  // --- Send via WhatsApp ---
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const data = getFormData();
      if (!validate(data)) return;

      const whatsappMsg = `📩 *New Portfolio Message*%0A%0A👤 *Name:* ${encodeURIComponent(data.name)}%0A📧 *Email:* ${encodeURIComponent(data.email)}%0A📌 *Subject:* ${encodeURIComponent(data.subject)}%0A%0A💬 *Message:*%0A${encodeURIComponent(data.message)}`;
      window.open(`https://wa.me/916206634194?text=${whatsappMsg}`, '_blank');

      showStatus('WhatsApp opened! Just hit Send to reach me. 🚀', 'success');
      resetForm();
    });
  }

  // --- Send via Email ---
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const data = getFormData();
      if (!validate(data)) return;

      const mailBody = `Hi Ashish,%0D%0A%0D%0AMy name is ${encodeURIComponent(data.name)}.%0D%0AEmail: ${encodeURIComponent(data.email)}%0D%0A%0D%0A${encodeURIComponent(data.message)}`;
      window.location.href = `mailto:ar6858439@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${mailBody}`;

      showStatus('Email client opened! You can also try WhatsApp. 📧', 'success');
      setTimeout(resetForm, 1000);
    });
  }
})();
