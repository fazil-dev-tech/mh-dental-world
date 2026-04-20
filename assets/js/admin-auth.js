/* ============================================================
   MH DENTAL WORLD — Admin Authentication
   Supabase Auth + Session Guard
   ============================================================ */

// Check if user is authenticated, redirect if not
async function requireAuth() {
  if (!MH.isSupabaseConfigured()) {
    // Demo mode: check localStorage
    const demoAuth = localStorage.getItem('mh_admin_demo');
    if (!demoAuth) {
      window.location.href = 'login.html';
      return null;
    }
    return { id: 'demo', email: 'adminmhdental' };
  }

  try {
    const { data: { session } } = await MH.supabase.auth.getSession();
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    return session.user;
  } catch (e) {
    window.location.href = 'login.html';
    return null;
  }
}

// Login
async function adminLogin(email, password) {
  if (!MH.isSupabaseConfigured()) {
    // Demo mode
    if (email === 'adminmhdental' && password === 'Admin123#') {
      localStorage.setItem('mh_admin_demo', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  }

  try {
    const { data, error } = await MH.supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
  } catch (e) {
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

// Logout
async function adminLogout() {
  if (!MH.isSupabaseConfigured()) {
    localStorage.removeItem('mh_admin_demo');
    window.location.href = 'login.html';
    return;
  }

  try {
    await MH.supabase.auth.signOut();
  } catch (e) {
    console.error('Logout error:', e);
  }
  window.location.href = 'login.html';
}

// Init login form
function initLoginForm() {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const submitBtn = document.getElementById('login-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.remove('show');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width:20px;height:20px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:8px"></span> Signing in...';

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const result = await adminLogin(email, password);

    if (result.success) {
      window.location.href = 'dashboard.html';
    } else {
      errorEl.textContent = result.error;
      errorEl.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  });
}

// Setup sidebar and logout button
function initAdminSidebar() {
  // Logout
  const logoutBtn = document.getElementById('admin-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', adminLogout);

  // Sidebar toggle (mobile)
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

window.MH.requireAuth = requireAuth;
window.MH.adminLogin = adminLogin;
window.MH.adminLogout = adminLogout;
window.MH.initLoginForm = initLoginForm;
window.MH.initAdminSidebar = initAdminSidebar;
