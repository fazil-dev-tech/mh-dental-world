/* ============================================================
   MH DENTAL WORLD — Services Module (Public)
   ============================================================ */

const SAMPLE_SERVICES = [
  {
    id: 1, title: 'Teeth Cleaning & Polishing', icon: '🦷',
    image: 'assets/images/services/teeth-cleaning.png',
    short_desc: 'Professional deep cleaning to remove plaque, tartar, and stains for healthier, brighter teeth.',
    full_desc: 'Our advanced ultrasonic scaling and air-flow polishing removes years of buildup, leaving your teeth sparkling clean and your gums healthy.',
    benefits: 'Prevents cavities, Freshens breath, Removes stains, Prevents gum disease',
    featured: true, active: true, display_order: 1
  },
  {
    id: 2, title: 'Root Canal Treatment', icon: '🏥',
    image: 'assets/images/services/root-canal.png',
    short_desc: 'Pain-free root canal therapy using advanced rotary instruments and single-visit techniques.',
    full_desc: 'We use state-of-the-art rotary endodontics and apex locators for highly precise, painless root canal treatments, often completed in a single visit.',
    benefits: 'Saves natural tooth, Pain-free procedure, Single-visit option, Long-lasting results',
    featured: true, active: true, display_order: 2
  },
  {
    id: 3, title: 'Dental Implants', icon: '🔩',
    image: 'assets/images/services/dental-implants.png',
    short_desc: 'Permanent titanium implants for missing teeth — look, feel, and function like natural teeth.',
    full_desc: 'Our implantologists use 3D CBCT planning and premium implant systems for predictable, long-lasting tooth replacement solutions.',
    benefits: 'Permanent solution, Natural appearance, Preserves jawbone, No adhesives needed',
    featured: true, active: true, display_order: 3
  },
  {
    id: 4, title: 'Braces & Aligners', icon: '😁',
    image: 'assets/images/services/braces-aligners-featured.png',
    short_desc: 'Metal braces, ceramic braces, and clear aligners for perfectly aligned teeth and confident smiles.',
    full_desc: 'From traditional metal braces to invisible aligners, we offer comprehensive orthodontic solutions tailored to your lifestyle and goals.',
    benefits: 'Straighter teeth, Improved bite, Better oral health, Boosted confidence',
    featured: true, active: true, display_order: 4
  },
  {
    id: 5, title: 'Teeth Whitening', icon: '✨',
    image: 'assets/images/services/teeth-whitening.png',
    short_desc: 'Advanced LED and laser whitening treatments for a dramatically brighter, whiter smile.',
    full_desc: 'Professional in-office whitening using industry-leading technology delivers up to 8 shades whiter teeth in a single comfortable session.',
    benefits: 'Instant results, Safe procedure, Long-lasting brightness, Professional grade',
    featured: true, active: true, display_order: 5
  },
  {
    id: 6, title: 'Cosmetic Dentistry', icon: '💎',
    image: 'assets/images/services/cosmetic-dentistry.png',
    short_desc: 'Smile makeovers with veneers, bonding, contouring, and aesthetic restorations.',
    full_desc: 'Transform your smile with porcelain veneers, composite bonding, gum reshaping, and comprehensive smile design.',
    benefits: 'Custom smile design, Natural-looking results, Minimal preparation, Lasting beauty',
    featured: true, active: true, display_order: 6
  },
  {
    id: 7, title: 'Smile Makeover', icon: '😃',
    image: 'assets/images/services/smile-makeover.png',
    short_desc: 'Complete smile transformation with digital design, veneers, whitening, and reshaping.',
    full_desc: 'Our comprehensive smile makeover combines multiple aesthetic procedures including veneers, whitening, bonding, and gum contouring for a stunning result.',
    benefits: 'Complete transformation, Digital preview, Custom design, Life-changing results',
    featured: false, active: true, display_order: 7
  },
  {
    id: 8, title: 'Wisdom Tooth Extraction', icon: '🦷',
    short_desc: 'Safe, painless removal of impacted or problematic wisdom teeth by experienced surgeons.',
    full_desc: 'Our oral surgeons handle simple to complex wisdom tooth removals using advanced surgical techniques and sedation options for maximum comfort.',
    benefits: 'Prevents complications, Pain-free extraction, Quick recovery, Expert surgeons',
    featured: false, active: true, display_order: 8
  },
  {
    id: 9, title: 'Dentures & Bridges', icon: '🫧',
    short_desc: 'Custom-crafted removable dentures and fixed bridges for restoring your complete smile.',
    full_desc: 'We design and fabricate high-quality full and partial dentures, as well as fixed bridges using premium materials for comfort and aesthetics.',
    benefits: 'Restores full smile, Custom fit, Natural looking, Comfortable wear',
    featured: false, active: true, display_order: 9
  },
  {
    id: 10, title: 'Pediatric Dentistry', icon: '👶',
    short_desc: 'Gentle, child-friendly dental care creating positive experiences for your little ones.',
    full_desc: 'Our pediatric specialists create a fun, comfortable environment for children, offering preventive care, fluoride treatments, sealants, and cavity fillings.',
    benefits: 'Child-friendly approach, Preventive focus, Fun environment, Building healthy habits',
    featured: false, active: true, display_order: 10
  },
  {
    id: 11, title: 'Gum Treatment', icon: '🩺',
    short_desc: 'Comprehensive periodontal care for healthy gums — from deep cleaning to surgical treatments.',
    full_desc: 'We diagnose and treat all stages of gum disease using scaling and root planing, laser therapy, and surgical interventions when necessary.',
    benefits: 'Prevents tooth loss, Reduces inflammation, Improves oral health, Laser therapy',
    featured: false, active: true, display_order: 11
  },
  {
    id: 12, title: 'Emergency Dental Care', icon: '🚨',
    short_desc: 'Immediate treatment for dental emergencies — toothache, trauma, broken teeth, and infections.',
    full_desc: 'We provide urgent dental care for emergencies including severe toothache, knocked-out teeth, fractured teeth, swelling, and dental abscesses.',
    benefits: 'Same-day treatment, Pain relief, Expert handling, Extended hours',
    featured: false, active: true, display_order: 12
  }
];

async function loadServices(options = {}) {
  const { featured = false, limit = null, containerId = 'services-grid' } = options;
  let services = [];

  if (MH.isSupabaseConfigured()) {
    try {
      let query = MH.supabase.from('services').select('*').eq('active', true).order('display_order');
      if (featured) query = query.eq('featured', true);
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (!error && data) services = data;
      else services = SAMPLE_SERVICES;
    } catch (e) {
      services = SAMPLE_SERVICES;
    }
  } else {
    // Check if admin has saved custom services to localStorage
    const stored = localStorage.getItem('mh_services');
    if (stored) {
      try {
        services = JSON.parse(stored).filter(s => s.active !== false);
      } catch(e) {
        services = [...SAMPLE_SERVICES];
      }
    } else {
      services = [...SAMPLE_SERVICES];
    }
    if (featured) services = services.filter(s => s.featured);
    if (limit) services = services.slice(0, limit);
  }

  const container = document.getElementById(containerId);
  if (!container) return services;

  container.innerHTML = services.map(svc => {
    const hasImage = svc.image || svc.image_url;
    const imgSrc = svc.image || svc.image_url || '';
    return `
    <div class="card service-card reveal">
      ${hasImage ? `<div class="service-card-img"><img src="${imgSrc}" alt="${svc.title}" loading="lazy"></div>` : `<div class="service-icon">${svc.icon || '🦷'}</div>`}
      <h3 class="service-name">${svc.title}</h3>
      <p class="service-desc">${svc.short_desc}</p>
      <a href="${MH.getWhatsAppLink('Hi! I\'m interested in ' + svc.title)}" class="btn btn-ghost btn-sm" target="_blank">
        Enquire Now →
      </a>
    </div>
  `;
  }).join('');

  return services;
}

window.MH.loadServices = loadServices;
window.MH.SAMPLE_SERVICES = SAMPLE_SERVICES;
