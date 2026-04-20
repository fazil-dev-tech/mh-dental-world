/* ============================================================
   MH DENTAL WORLD — Doctors Module (Public)
   Loads doctor data from Supabase or fallback
   ============================================================ */

// Fallback sample doctors data
const SAMPLE_DOCTORS = [
  {
    id: 1,
    full_name: 'Dr. Mohamed Fazil',
    designation: 'Chief Dental Surgeon',
    specialization: 'Oral & Maxillofacial Surgery',
    qualifications: 'BDS, MDS (Oral Surgery)',
    years_experience: 12,
    short_summary: 'Pioneering advanced surgical techniques with over a decade of experience in complex dental procedures.',
    full_biography: 'Dr. Mohamed Fazil is the founder and chief dental surgeon at MH Dental World. With extensive training in oral and maxillofacial surgery, he specializes in dental implants, wisdom tooth surgery, and complex jaw procedures. His patient-first philosophy and gentle approach make even complex treatments comfortable.',
    expertise: 'Dental Implants, Wisdom Tooth Surgery, Jaw Surgery, Full Mouth Rehabilitation',
    certifications: 'Indian Dental Association, Fellow ICOI',
    languages: 'English, Tamil, Hindi, Urdu',
    consultation_timings: 'Mon–Sat: 10:00 AM – 8:00 PM',
    availability: true,
    featured: true,
    active: true,
    image_url: '',
    display_order: 1
  },
  {
    id: 2,
    full_name: 'Dr. Ayesha Rahman',
    designation: 'Cosmetic Dentistry Specialist',
    specialization: 'Cosmetic & Aesthetic Dentistry',
    qualifications: 'BDS, PG Diploma (Cosmetic Dentistry)',
    years_experience: 8,
    short_summary: 'Creating beautiful smiles with advanced cosmetic and aesthetic dental treatments.',
    full_biography: 'Dr. Ayesha Rahman brings artistry and precision to cosmetic dentistry. Her expertise spans smile makeovers, dental veneers, teeth whitening, and aesthetic bonding. She believes every patient deserves a confident, radiant smile.',
    expertise: 'Smile Makeovers, Veneers, Teeth Whitening, Aesthetic Bonding, Gum Contouring',
    certifications: 'Indian Academy of Aesthetic Dentistry',
    languages: 'English, Tamil, Hindi',
    consultation_timings: 'Mon–Sat: 9:00 AM – 6:00 PM',
    availability: true,
    featured: true,
    active: true,
    image_url: '',
    display_order: 2
  },
  {
    id: 3,
    full_name: 'Dr. Rajesh Kumar',
    designation: 'Orthodontist',
    specialization: 'Orthodontics & Dentofacial Orthopedics',
    qualifications: 'BDS, MDS (Orthodontics)',
    years_experience: 10,
    short_summary: 'Expert in braces, aligners, and correcting dental irregularities for perfect alignment.',
    full_biography: 'Dr. Rajesh Kumar is an accomplished orthodontist specializing in traditional braces, clear aligners, and complex bite correction. He uses cutting-edge 3D treatment planning to deliver predictable, beautiful results.',
    expertise: 'Metal Braces, Ceramic Braces, Clear Aligners, Invisalign, Bite Correction',
    certifications: 'Indian Orthodontic Society, Invisalign Certified Provider',
    languages: 'English, Tamil, Hindi, Kannada',
    consultation_timings: 'Tue, Thu, Sat: 10:00 AM – 5:00 PM',
    availability: true,
    featured: false,
    active: true,
    image_url: '',
    display_order: 3
  }
];

// Load doctors for public pages
let doctorsSubscription = null;

async function loadDoctors(options = {}) {
  const { featured = false, limit = null, containerId = 'doctors-grid' } = options;

  let doctors = [];

  if (MH.isSupabaseConfigured()) {
    try {
      let query = MH.supabase
        .from('doctors')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (featured) query = query.eq('featured', true);
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      doctors = data || [];
      
      if (!doctorsSubscription) {
        doctorsSubscription = MH.supabase.channel('public:doctors')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, () => {
            loadDoctors(options);
          })
          .subscribe();
      }
    } catch (e) {
      console.error('Error fetching doctors:', e);
    }
  } else {
    console.warn('Supabase not configured. No doctors will be shown.');
  }

  const container = document.getElementById(containerId);
  if (!container) return doctors;

  container.innerHTML = doctors.map(doc => createDoctorCard(doc)).join('');
  return doctors;
}

function createDoctorCard(doc) {
  const initials = doc.full_name.split(' ').map(n => n[0]).join('').substring(0,2);
  const imgHTML = doc.image_url
    ? `<img src="${doc.image_url}" alt="${doc.full_name}" loading="lazy">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fde4e8,#fbc8d4);font-size:3rem;font-weight:800;color:#e8627c;font-family:'Playfair Display',serif">${initials}</div>`;

  return `
    <div class="card doctor-card reveal">
      <div class="doctor-image-wrapper">
        ${imgHTML}
        <div class="doctor-overlay">
          <a href="doctor-detail.html?id=${doc.id}" class="btn btn-primary btn-sm">View Profile</a>
        </div>
      </div>
      <div class="doctor-info">
        <h3 class="doctor-name">${doc.full_name}</h3>
        <p class="doctor-designation">${doc.designation}</p>
        <div class="doctor-meta">
          <span>🎓 ${doc.qualifications ? doc.qualifications.split(',')[0] : ''}</span>
          <span>⏱️ ${doc.years_experience}+ yrs</span>
        </div>
      </div>
    </div>
  `;
}

// Load single doctor for detail page
async function loadDoctorDetail(doctorId) {
  let doctor = null;

  if (MH.isSupabaseConfigured()) {
    try {
      const { data, error } = await MH.supabase
        .from('doctors')
        .select('*')
        .eq('id', doctorId)
        .single();
      if (!error && data) doctor = data;
    } catch (e) {
      console.error('Error fetching doctor detail:', e);
    }
  }

  return doctor;
}

window.MH.loadDoctors = loadDoctors;
window.MH.loadDoctorDetail = loadDoctorDetail;
window.MH.SAMPLE_DOCTORS = SAMPLE_DOCTORS;
