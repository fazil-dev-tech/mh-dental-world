/* ============================================================
   MH DENTAL WORLD — Admin Dashboard
   ============================================================ */

async function initAdminDashboard() {
  await loadDashboardStats();

  if (MH.isSupabaseConfigured()) {
    MH.supabase.channel('dashboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, () => loadDashboardStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => loadDashboardStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => loadDashboardStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => loadDashboardStats())
      .subscribe();
  }
}

async function loadDashboardStats() {
  let stats = { doctors: 0, services: 0, reviews: 0, gallery: 0, pendingReviews: 0 };

  if (MH.isSupabaseConfigured()) {
    try {
      const [docs, svcs, revs, gal, pending] = await Promise.all([
        MH.supabase.from('doctors').select('*', { count: 'exact', head: true }),
        MH.supabase.from('services').select('*', { count: 'exact', head: true }),
        MH.supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('approved', true),
        MH.supabase.from('gallery').select('*', { count: 'exact', head: true }),
        MH.supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('approved', false),
      ]);
      stats.doctors = docs.count || 0;
      stats.services = svcs.count || 0;
      stats.reviews = revs.count || 0;
      stats.gallery = gal.count || 0;
      stats.pendingReviews = pending.count || 0;
    } catch (e) {
      console.error('Error fetching dashboard stats:', e);
    }
  } else {
    console.warn("Supabase not configured. Stats will be 0.");
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
