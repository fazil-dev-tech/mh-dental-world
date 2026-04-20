/* ============================================================
   MH DENTAL WORLD — Supabase Configuration
   Public client (anon key) for public pages.
   Admin client (service_role key) for admin pages — bypasses RLS.
   ============================================================ */

const SUPABASE_URL = 'https://zvfasfezndwffaiuxieg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmFzZmV6bmR3ZmZhaXV4aWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTkwNTgsImV4cCI6MjA5MjE5NTA1OH0.B6AtAz6S6zd66Ooq48KCseTRLC4h5vkQzIFMFjrk9t4';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmFzZmV6bmR3ZmZhaXV4aWVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxOTA1OCwiZXhwIjoyMDkyMTk1MDU4fQ.dVF-bgRJ93qvEH-uyRDGKIKdTGZJ3fZ-vvsvjYvD3nc';

// Initialize public Supabase client (anon — respects RLS)
let supabase = null;
if (window.supabase && SUPABASE_URL && SUPABASE_URL.startsWith('http')) {
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Supabase public client initialization failed:', e);
  }
}

// Initialize admin Supabase client (service_role — bypasses RLS)
let supabaseAdmin = null;
if (window.supabase && SUPABASE_URL && SUPABASE_URL.startsWith('http')) {
  try {
    supabaseAdmin = window.supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  } catch (e) {
    console.warn('Supabase admin client initialization failed:', e);
  }
}

// Clinic default data (used as fallback if DB not configured yet)
const CLINIC_DEFAULTS = {
  name: 'MH Dental World',
  tagline: 'Advanced Dental Care',
  phone: '+91 98456 61301',
  whatsapp: '919845661301',
  email: 'info@mhdentalworld.com',
  address: 'MH Dental World, Your Address Here',
  instagram: 'https://www.instagram.com/mhdentalworld?igsh=MmRsb2d2OWhsZWo5',
  maps: 'https://maps.app.goo.gl/q8VG74xzfcwafMmp6?g_st=aw',
  timings: 'Mon–Sat: 9:00 AM – 9:00 PM | Sun: 10:00 AM – 2:00 PM',
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

// Helper: check if Supabase is configured
function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' && supabase;
}

// Helper: check if admin client is available
function isAdminConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_SERVICE_KEY && supabaseAdmin;
}

// Export for use
window.MH = window.MH || {};
window.MH.supabase = supabase;
window.MH.supabaseAdmin = supabaseAdmin;
window.MH.CLINIC = CLINIC_DEFAULTS;
window.MH.getWhatsAppLink = getWhatsAppLink;
window.MH.getCallLink = getCallLink;
window.MH.isSupabaseConfigured = isSupabaseConfigured;
window.MH.isAdminConfigured = isAdminConfigured;
