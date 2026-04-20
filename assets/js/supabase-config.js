/* ============================================================
   MH DENTAL WORLD — Supabase Configuration
   Public client (anon key) — respects RLS for all pages.
   ============================================================ */

const SUPABASE_URL = 'https://zvfasfezndwffaiuxieg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmFzZmV6bmR3ZmZhaXV4aWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTkwNTgsImV4cCI6MjA5MjE5NTA1OH0.B6AtAz6S6zd66Ooq48KCseTRLC4h5vkQzIFMFjrk9t4';

// NOTE: Use _mhClient internally to avoid conflict with window.supabase (CDN global)
let _mhClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    _mhClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected successfully.');
  } else {
    console.warn('Supabase CDN not loaded yet.');
  }
} catch (e) {
  console.warn('Supabase client initialization failed:', e);
}

// Clinic default data (used as fallback / contact info constants)
const CLINIC_DEFAULTS = {
  name: 'MH Dental World',
  tagline: 'Advanced Dental Care',
  phone: '+91 98456 61301',
  whatsapp: '919845661301',
  email: 'info@mhdentalworld.com',
  address: 'MH Dental World, Your Address Here',
  instagram: 'https://www.instagram.com/mhdentalworld?igsh=MmRsb2d2OWhsZWo5',
  maps: 'https://maps.app.goo.gl/q8VG74xzfcwafMmp6?g_st=aw',
  timings: 'Mon–Sat: 8:00 AM – 10:00 PM | Sun: 10:00 AM – 2:00 PM (Prior Appointment)',
  emergency_phone: '+91 98456 61301',
};

// Helper: get WhatsApp link
function getWhatsAppLink(message = '') {
  const msg = encodeURIComponent(message || 'Hello! I would like to know more about MH Dental World.');
  return `https://wa.me/${CLINIC_DEFAULTS.whatsapp}?text=${msg}`;
}

// Helper: get call link
function getCallLink() {
  return `tel:${CLINIC_DEFAULTS.phone.replace(/\s/g, '')}`;
}

// Helper: check if Supabase is configured and connected
function isSupabaseConfigured() {
  return !!(
    SUPABASE_URL &&
    SUPABASE_URL.startsWith('http') &&
    SUPABASE_ANON_KEY &&
    _mhClient
  );
}

// Export everything under window.MH namespace
window.MH = window.MH || {};
window.MH.supabase = _mhClient;
window.MH.SUPABASE_URL = SUPABASE_URL;
window.MH.CLINIC = CLINIC_DEFAULTS;
window.MH.getWhatsAppLink = getWhatsAppLink;
window.MH.getCallLink = getCallLink;
window.MH.isSupabaseConfigured = isSupabaseConfigured;
