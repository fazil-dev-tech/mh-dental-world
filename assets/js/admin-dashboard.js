/* ============================================================
   MH DENTAL WORLD — Admin Dashboard
   ============================================================ */

async function initAdminDashboard() {
  await loadDashboardStats();
}

async function loadDashboardStats() {
  let stats = { doctors: 0, services: 0, reviews: 0, gallery: 0, pendingReviews: 0 };

  if (MH.isSupabaseConfigured()) {
    try {
      const [docs, svcs, revs, gal, pending] = await Promise.all([
        MH.supabase.from('doctors').select('id', { count: 'exact' }),
        MH.supabase.from('services').select('id', { count: 'exact' }),
        MH.supabase.from('reviews').select('id', { count: 'exact' }).eq('approved', true),
        MH.supabase.from('gallery').select('id', { count: 'exact' }),
        MH.supabase.from('reviews').select('id', { count: 'exact' }).eq('approved', false),
      ]);
      stats.doctors = docs.count || 0;
      stats.services = svcs.count || 0;
      stats.reviews = revs.count || 0;
      stats.gallery = gal.count || 0;
      stats.pendingReviews = pending.count || 0;
    } catch (e) {
      stats = { doctors: 3, services: 12, reviews: 8, gallery: 6, pendingReviews: 2 };
    }
  } else {
    const storedDocs = localStorage.getItem('mh_doctors');
    stats.doctors = storedDocs ? JSON.parse(storedDocs).length : 3;
    stats.services = 12;
    stats.reviews = 8;
    stats.gallery = 6;
    stats.pendingReviews = 2;
  }

  // Update DOM
  const els = {
    'dash-doctors': stats.doctors,
    'dash-services': stats.services,
    'dash-reviews': stats.reviews,
    'dash-gallery': stats.gallery,
    'dash-pending': stats.pendingReviews,
  };

  Object.entries(els).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
}

window.MH.initAdminDashboard = initAdminDashboard;
