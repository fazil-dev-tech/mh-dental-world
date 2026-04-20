/* ============================================================
   MH DENTAL WORLD — Smart Chatbot Widget
   Navigation + Contacts + FAQ + Maps
   Pure HTML/CSS/JS — No Dependencies
   ============================================================ */

(function() {
  'use strict';

  // ── Config ──────────────────────────────────────
  const CLINIC = {
    name: 'MH Dental World',
    phone: '+919845661301',
    phoneDisplay: '+91 98456 61301',
    whatsapp: '919845661301',
    email: 'info@mhdentalworld.com',
    address: 'MH Dental World, Bangalore, Karnataka, India',
    mapQuery: 'MH+Dental+World+Bangalore',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMH+Dental+World!5e0!3m2!1sen!2sin!4v1',
    hours: 'Mon–Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 2:00 PM',
    logo: 'assets/images/logo.jpg'
  };

  const PAGES = [
    { label: '🏠 Home', url: 'index.html' },
    { label: 'ℹ️ About Us', url: 'about.html' },
    { label: '🦷 Services', url: 'services.html' },
    { label: '👨‍⚕️ Our Doctors', url: 'doctors.html' },
    { label: '🖼️ Gallery', url: 'gallery.html' },
    { label: '⭐ Reviews', url: 'reviews.html' },
    { label: '📞 Contact', url: 'contact.html' },
    { label: '🆘 Emergency', url: 'emergency.html' },
    { label: '❓ FAQs', url: 'faq.html' },
  ];

  const SERVICES_LIST = [
    'Dental Implants', 'Root Canal Treatment', 'Teeth Whitening',
    'Braces & Aligners', 'Dental Crowns & Bridges', 'Tooth Extraction',
    'Pediatric Dentistry', 'Gum Treatment', 'Smile Makeover',
    'Dental X-Ray & Diagnosis', 'Teeth Cleaning', 'Cosmetic Dentistry'
  ];

  const FAQ_LIST = [
    { q: 'What are your clinic hours?', a: CLINIC.hours },
    { q: 'Do you accept walk-ins?', a: 'Yes! We welcome walk-in patients during clinic hours. For guaranteed availability, we recommend booking an appointment.' },
    { q: 'Is parking available?', a: 'Yes, free parking is available for all patients right outside the clinic.' },
    { q: 'Do you offer emergency services?', a: 'Yes! We provide 24/7 emergency dental care. Call us immediately at ' + CLINIC.phoneDisplay + ' for urgent dental needs.' },
    { q: 'What payment methods do you accept?', a: 'We accept Cash, UPI, Credit/Debit Cards, and all major insurance plans.' },
    { q: 'Is the clinic child-friendly?', a: 'Absolutely! We have a dedicated pediatric dentistry team and a kid-friendly waiting area.' },
  ];

  // ── Detect base path ───────────────────────────
  const isAdmin = window.location.pathname.includes('/admin/');
  const basePath = isAdmin ? '../' : '';

  // ── Inject HTML ─────────────────────────────────
  function injectChatbot() {
    const html = `
      <button class="chatbot-toggle" id="cb-toggle" aria-label="Open chat assistant">
        <svg class="cb-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
        <svg class="cb-icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
      <div class="chatbot-window" id="cb-window">
        <div class="cb-header">
          <img src="${basePath}${CLINIC.logo}" alt="MH Dental" class="cb-header-avatar">
          <div class="cb-header-info">
            <h4>${CLINIC.name}</h4>
            <span>Online now — Ready to help!</span>
          </div>
          <button class="cb-header-close" id="cb-close" aria-label="Close chat">✕</button>
        </div>
        <div class="cb-messages" id="cb-messages"></div>
        <div class="cb-input-area">
          <input class="cb-input" id="cb-input" type="text" placeholder="Type a message..." autocomplete="off">
          <button class="cb-send-btn" id="cb-send" aria-label="Send">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ── State ───────────────────────────────────────
  let isOpen = false;
  let hasGreeted = false;

  // ── Core Functions ──────────────────────────────
  function toggle() {
    isOpen = !isOpen;
    document.getElementById('cb-toggle').classList.toggle('active', isOpen);
    document.getElementById('cb-window').classList.toggle('open', isOpen);
    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      showGreeting();
    }
    if (isOpen) document.getElementById('cb-input').focus();
  }

  function addMessage(content, isBot = true) {
    const container = document.getElementById('cb-messages');
    const msg = document.createElement('div');
    msg.className = `cb-msg ${isBot ? 'cb-msg-bot' : 'cb-msg-user'}`;
    msg.innerHTML = `<div class="cb-msg-bubble">${content}</div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    const container = document.getElementById('cb-messages');
    const typing = document.createElement('div');
    typing.className = 'cb-typing';
    typing.id = 'cb-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('cb-typing');
    if (el) el.remove();
  }

  function botReply(content, delay = 600) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMessage(content);
    }, delay);
  }

  // ── Greeting ────────────────────────────────────
  function showGreeting() {
    setTimeout(() => {
      addMessage(`👋 Hi there! Welcome to <strong>MH Dental World</strong>.<br>I'm your dental assistant. How can I help you today?`);
      setTimeout(() => showMainMenu(), 400);
    }, 300);
  }

  // ── Main Menu ───────────────────────────────────
  function showMainMenu() {
    const btns = `
      <div class="cb-quick-actions">
        <button class="cb-quick-btn" onclick="MHChatbot.showNavigation()">🧭 Navigate Pages</button>
        <button class="cb-quick-btn cb-contact-btn" onclick="MHChatbot.showContacts()">📞 Contact Us</button>
        <button class="cb-quick-btn" onclick="MHChatbot.showServices()">🦷 Our Services</button>
        <button class="cb-quick-btn" onclick="MHChatbot.showFAQ()">❓ FAQs</button>
        <button class="cb-quick-btn cb-contact-btn" onclick="MHChatbot.showLocation()">📍 Location & Map</button>
        <button class="cb-quick-btn" onclick="MHChatbot.showHours()">🕐 Clinic Hours</button>
      </div>
    `;
    addMessage(`Choose an option below, or type your question:${btns}`);
  }

  // ── Navigation ──────────────────────────────────
  function showNavigation() {
    addMessage('🧭 Navigate Pages', false);
    const links = PAGES.map(p =>
      `<button class="cb-quick-btn cb-nav-btn" onclick="MHChatbot.goTo('${basePath}${p.url}')">${p.label}</button>`
    ).join('');
    botReply(`Where would you like to go?<div class="cb-quick-actions">${links}</div>${backBtn()}`);
  }

  // ── Contacts ────────────────────────────────────
  function showContacts() {
    addMessage('📞 Contact Info', false);
    const card = `
      <div class="cb-contact-card">
        <a href="tel:${CLINIC.phone}" class="cb-contact-item">
          <div class="cb-contact-icon phone">📞</div>
          <div><strong>Call Us</strong><br>${CLINIC.phoneDisplay}</div>
        </a>
        <a href="https://wa.me/${CLINIC.whatsapp}?text=Hello!%20I%20need%20dental%20appointment" target="_blank" class="cb-contact-item">
          <div class="cb-contact-icon whatsapp">💬</div>
          <div><strong>WhatsApp</strong><br>Chat with us instantly</div>
        </a>
        <a href="mailto:${CLINIC.email}" class="cb-contact-item">
          <div class="cb-contact-icon email">📧</div>
          <div><strong>Email</strong><br>${CLINIC.email}</div>
        </a>
        <a href="https://maps.google.com/?q=${CLINIC.mapQuery}" target="_blank" class="cb-contact-item">
          <div class="cb-contact-icon location">📍</div>
          <div><strong>Visit Us</strong><br>${CLINIC.address}</div>
        </a>
      </div>${backBtn()}
    `;
    botReply(card);
  }

  // ── Services ────────────────────────────────────
  function showServices() {
    addMessage('🦷 Services', false);
    const list = SERVICES_LIST.map(s => `<button class="cb-quick-btn" onclick="MHChatbot.goTo('${basePath}services.html')">✨ ${s}</button>`).join('');
    botReply(`We offer a wide range of premium dental services:<div class="cb-quick-actions">${list}</div>${backBtn()}`);
  }

  // ── FAQ ─────────────────────────────────────────
  function showFAQ() {
    addMessage('❓ FAQs', false);
    const btns = FAQ_LIST.map((f, i) =>
      `<button class="cb-quick-btn" onclick="MHChatbot.answerFAQ(${i})">💡 ${f.q}</button>`
    ).join('');
    botReply(`Here are common questions:<div class="cb-quick-actions">${btns}</div>${backBtn()}`);
  }

  function answerFAQ(index) {
    const faq = FAQ_LIST[index];
    addMessage(faq.q, false);
    botReply(`${faq.a}${backBtn()}`);
  }

  // ── Location / Map ──────────────────────────────
  function showLocation() {
    addMessage('📍 Location', false);
    const content = `
      <strong>${CLINIC.name}</strong><br>
      ${CLINIC.address}<br><br>
      <iframe class="cb-map-frame" src="https://maps.google.com/maps?q=${CLINIC.mapQuery}&output=embed" allowfullscreen loading="lazy"></iframe>
      <div class="cb-quick-actions" style="margin-top:10px">
        <a href="https://maps.google.com/?q=${CLINIC.mapQuery}" target="_blank" class="cb-quick-btn cb-nav-btn" style="text-decoration:none">🗺️ Open in Google Maps</a>
        <a href="https://maps.google.com/maps/dir/?api=1&destination=${CLINIC.mapQuery}" target="_blank" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">🚗 Get Directions</a>
      </div>${backBtn()}
    `;
    botReply(content, 800);
  }

  // ── Hours ───────────────────────────────────────
  function showHours() {
    addMessage('🕐 Clinic Hours', false);
    botReply(`
      <strong>🕐 Working Hours</strong><br><br>
      <strong>Mon – Sat:</strong> 9:00 AM – 8:00 PM<br>
      <strong>Sunday:</strong> 10:00 AM – 2:00 PM<br><br>
      <em>🆘 Emergency services available 24/7</em><br>
      <div class="cb-quick-actions" style="margin-top:10px">
        <a href="tel:${CLINIC.phone}" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">📞 Call to Book</a>
        <a href="https://wa.me/${CLINIC.whatsapp}?text=I'd like to book an appointment" target="_blank" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">💬 WhatsApp Booking</a>
      </div>${backBtn()}
    `);
  }

  // ── Helpers ─────────────────────────────────────
  function backBtn() {
    return `<button class="cb-back-btn" onclick="MHChatbot.showMainMenu()">← Back to Menu</button>`;
  }

  function goTo(url) {
    window.location.href = url;
  }

  // ── Free-text Handler ───────────────────────────
  function handleUserInput(text) {
    if (!text.trim()) return;
    addMessage(text, false);

    const lower = text.toLowerCase();

    // Keywords matching
    if (/hi|hello|hey|hola|start/.test(lower)) {
      botReply(`Hello! 😊 Great to see you. How can I assist you?`);
      setTimeout(() => showMainMenu(), 700);
    } else if (/service|treatment|implant|braces|whitening|root canal|crown|cleaning/.test(lower)) {
      showServices();
    } else if (/doctor|dentist|specialist|team/.test(lower)) {
      botReply(`We have an amazing team of specialists! 👨‍⚕️<div class="cb-quick-actions"><button class="cb-quick-btn cb-nav-btn" onclick="MHChatbot.goTo('${basePath}doctors.html')">👨‍⚕️ View Our Doctors</button></div>${backBtn()}`);
    } else if (/contact|phone|call|number|whatsapp/.test(lower)) {
      showContacts();
    } else if (/location|address|map|direction|where|find/.test(lower)) {
      showLocation();
    } else if (/hour|time|timing|open|close|schedule/.test(lower)) {
      showHours();
    } else if (/gallery|photo|image|clinic/.test(lower)) {
      botReply(`Take a virtual tour of our clinic! 🖼️<div class="cb-quick-actions"><button class="cb-quick-btn cb-nav-btn" onclick="MHChatbot.goTo('${basePath}gallery.html')">🖼️ View Gallery</button></div>${backBtn()}`);
    } else if (/review|rating|testimonial|feedback/.test(lower)) {
      botReply(`See what our patients say! ⭐<div class="cb-quick-actions"><button class="cb-quick-btn cb-nav-btn" onclick="MHChatbot.goTo('${basePath}reviews.html')">⭐ Read Reviews</button></div>${backBtn()}`);
    } else if (/emergency|urgent|pain|ache|broken/.test(lower)) {
      botReply(`🆘 <strong>Emergency?</strong> Call us immediately!<div class="cb-quick-actions"><a href="tel:${CLINIC.phone}" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">📞 Call Emergency</a><button class="cb-quick-btn cb-nav-btn" onclick="MHChatbot.goTo('${basePath}emergency.html')">🆘 Emergency Page</button></div>${backBtn()}`);
    } else if (/book|appointment|schedule|visit/.test(lower)) {
      botReply(`Let's book your appointment! 📅<div class="cb-quick-actions"><a href="tel:${CLINIC.phone}" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">📞 Call to Book</a><a href="https://wa.me/${CLINIC.whatsapp}?text=I'd like to book an appointment" target="_blank" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">💬 WhatsApp Booking</a></div>${backBtn()}`);
    } else if (/price|cost|fee|charge|insurance/.test(lower)) {
      botReply(`For pricing details, please contact us directly. We offer competitive rates and accept insurance! 💰<div class="cb-quick-actions"><a href="tel:${CLINIC.phone}" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">📞 Call for Pricing</a></div>${backBtn()}`);
    } else if (/thank|thanks|bye|goodbye/.test(lower)) {
      botReply(`You're welcome! 😊 We're always here for your dental needs. Have a great day! ✨${backBtn()}`);
    } else {
      botReply(`I appreciate your message! For specific queries, please contact us directly or choose an option below:<div class="cb-quick-actions"><a href="tel:${CLINIC.phone}" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">📞 Call Us</a><a href="https://wa.me/${CLINIC.whatsapp}" target="_blank" class="cb-quick-btn cb-contact-btn" style="text-decoration:none">💬 WhatsApp</a></div>${backBtn()}`);
    }
  }

  // ── Initialize ──────────────────────────────────
  function init() {
    injectChatbot();

    document.getElementById('cb-toggle').addEventListener('click', toggle);
    document.getElementById('cb-close').addEventListener('click', toggle);

    document.getElementById('cb-send').addEventListener('click', () => {
      const input = document.getElementById('cb-input');
      handleUserInput(input.value);
      input.value = '';
    });

    document.getElementById('cb-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserInput(e.target.value);
        e.target.value = '';
      }
    });
  }

  // ── Expose API ──────────────────────────────────
  window.MHChatbot = {
    toggle, showNavigation, showContacts, showServices,
    showFAQ, answerFAQ, showLocation, showHours,
    showMainMenu, goTo
  };

  // ── Boot ────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
