/* ============================================================
   MH DENTAL WORLD — Gallery Module (Public)
   Clinic Walkthrough Photos
   ============================================================ */

const SAMPLE_GALLERY = [
  // High-Quality Clinic Photos Provided by Client
  { id: 1, title: 'Premium Reception', category: 'clinic', image_url: 'assets/images/gallery/clinic-hq-1.jpeg', alt: 'Modern reception desk' },
  { id: 2, title: 'Patient Lounge', category: 'clinic', image_url: 'assets/images/gallery/clinic-hq-2.jpeg', alt: 'Comfortable waiting area' },
  { id: 3, title: 'Relaxing Waiting Area', category: 'clinic', image_url: 'assets/images/gallery/clinic-hq-3.jpeg', alt: 'Comfortable waiting area' },
  { id: 4, title: 'Advanced Treatment Unit 1', category: 'equipment', image_url: 'assets/images/gallery/clinic-hq-4.jpeg', alt: 'State-of-the-art dental chair' },
  { id: 5, title: 'Advanced Treatment Unit 2', category: 'equipment', image_url: 'assets/images/gallery/clinic-hq-5.jpeg', alt: 'Dental chair and consultation desk' },
  { id: 6, title: 'Clinical Operations Unit', category: 'equipment', image_url: 'assets/images/gallery/clinic-hq-6.jpeg', alt: 'Dental chair with latest equipment' },
  
  // Professional Treatment Visuals
  { id: 7, title: 'Dental Implants', category: 'treatments', image_url: 'assets/images/services/dental-implants.png', alt: 'Advanced dental implant procedures' },
  { id: 8, title: 'Teeth Whitening', category: 'treatments', image_url: 'assets/images/services/teeth-whitening.png', alt: 'Professional teeth whitening results' },
  { id: 9, title: 'Braces & Aligners', category: 'treatments', image_url: 'assets/images/services/braces-aligners-featured.png', alt: 'Orthodontic braces and aligners treatment' }
];

async function loadGallery(options = {}) {
  const { category = null, containerId = 'gallery-grid' } = options;
  let gallery = [];

  if (MH.isSupabaseConfigured()) {
    try {
      let query = MH.supabase.from('gallery').select('*').order('display_order');
      if (category) query = query.eq('category', category);
      const { data, error } = await query;
      if (!error && data?.length) gallery = data;
      else gallery = SAMPLE_GALLERY;
    } catch (e) {
      gallery = SAMPLE_GALLERY;
    }
  } else {
    // PREVENT BLANK SCREEN: Always fallback to default gallery if local storage is cleared
    const stored = localStorage.getItem('mh_gallery');
    const localDb = stored ? JSON.parse(stored) : [];
    
    if (localDb.length > 0) {
      gallery = localDb;
    } else {
      gallery = [...SAMPLE_GALLERY];
    }
    
    if (category && category !== 'all') gallery = gallery.filter(g => g.category === category);
  }

  const container = document.getElementById(containerId);
  if (!container) return gallery;

  container.innerHTML = gallery.map(item => `
    <div class="gallery-card reveal" data-lightbox="${item.image_url}">
      <img src="${item.image_url}" alt="${item.alt || item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-title">${item.title}</span>
      </div>
    </div>
  `).join('');

  // Re-init lightbox for new images
  initLightbox();
  initScrollReveal();

  return gallery;
}

window.MH.loadGallery = loadGallery;
window.MH.SAMPLE_GALLERY = SAMPLE_GALLERY;
