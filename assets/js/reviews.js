/* ============================================================
   MH DENTAL WORLD — Reviews Module (Public)
   ============================================================ */

const SAMPLE_REVIEWS = [
  {
    id: 1, patient_name: 'Priya Sharma', rating: 5,
    review_text: 'Absolutely wonderful experience! Dr. Fazil and his team made my root canal completely painless. The clinic is so clean and modern. I was really anxious but they made me feel totally relaxed. Highly recommend MH Dental World!',
    treatment: 'Root Canal Treatment', featured: true, approved: true
  },
  {
    id: 2, patient_name: 'Arjun Reddy', rating: 5,
    review_text: 'Got my dental implant done here and it was flawless. The 3D scan and planning gave me so much confidence. Six months later, my implant feels exactly like a natural tooth. Best dental clinic in town!',
    treatment: 'Dental Implant', featured: true, approved: true
  },
  {
    id: 3, patient_name: 'Kavitha Nair', rating: 5,
    review_text: 'My daughter was terrified of dentists, but the pediatric team here was incredible. So gentle and patient. Now she actually looks forward to dental visits! The waiting area is also very comfortable.',
    treatment: 'Pediatric Dentistry', featured: true, approved: true
  },
  {
    id: 4, patient_name: 'Rahul Mehta', rating: 5,
    review_text: 'I got my smile makeover with veneers and whitening. The transformation is unbelievable! Dr. Ayesha has an amazing eye for aesthetics. I can\'t stop showing off my new smile everywhere I go.',
    treatment: 'Smile Makeover', featured: true, approved: true
  },
  {
    id: 5, patient_name: 'Fatima Begum', rating: 5,
    review_text: 'I had a dental emergency on a weekend and MH Dental World was available immediately. The pain was gone within the hour. The emergency care here is truly lifesaving. Thank you so much!',
    treatment: 'Emergency Dental Care', featured: true, approved: true
  },
  {
    id: 6, patient_name: 'Suresh Babu', rating: 5,
    review_text: 'After years of avoiding the dentist, I finally went for a full mouth cleaning. The hygienist was gentle and thorough. My teeth have never looked this clean. The staff is extremely professional.',
    treatment: 'Teeth Cleaning', featured: false, approved: true
  },
  {
    id: 7, patient_name: 'Lakshmi Iyer', rating: 5,
    review_text: 'The braces treatment for my son is going perfectly. Dr. Rajesh explains everything clearly and the results after just 6 months are already visible. Very happy with the progress!',
    treatment: 'Braces', featured: false, approved: true
  },
  {
    id: 8, patient_name: 'Ahmed Khan', rating: 5,
    review_text: 'Premium clinic with premium service. The reception area itself tells you about the quality here. Got zirconia crowns done and they match my natural teeth perfectly. Worth every rupee.',
    treatment: 'Dental Crowns', featured: false, approved: true
  }
];

async function loadReviews(options = {}) {
  const { featured = false, limit = null, containerId = 'reviews-track', includePublic = false } = options;
  let reviews = [];

  if (MH.isSupabaseConfigured()) {
    try {
      let query = MH.supabase.from('reviews').select('*').eq('approved', true).order('created_at', { ascending: false });
      if (featured) query = query.eq('featured', true);
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (!error && data?.length) reviews = data;
      else reviews = [...SAMPLE_REVIEWS];
    } catch (e) {
      reviews = [...SAMPLE_REVIEWS];
    }
  } else {
    // Check if admin has saved custom reviews to localStorage
    const stored = localStorage.getItem('mh_reviews');
    if (stored) {
      try {
        reviews = JSON.parse(stored).filter(r => r.approved !== false);
      } catch(e) {
        reviews = [...SAMPLE_REVIEWS];
      }
    } else {
      reviews = [...SAMPLE_REVIEWS];
    }
    if (featured) reviews = reviews.filter(r => r.featured);
  }

  // Merge user-submitted public reviews from localStorage
  if (includePublic) {
    const stored = localStorage.getItem('mh_public_reviews');
    if (stored) {
      try {
        const publicReviews = JSON.parse(stored);
        reviews = [...publicReviews, ...reviews];
      } catch (e) { /* ignore parse errors */ }
    }
  }

  if (limit) reviews = reviews.slice(0, limit);

  const container = document.getElementById(containerId);
  if (!container) return reviews;

  container.innerHTML = reviews.map(rev => createReviewCard(rev)).join('');
  return reviews;
}

function createReviewCard(rev) {
  const initials = rev.patient_name.split(' ').map(n => n[0]).join('');
  const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
  
  return `
    <div class="card review-card">
      <div class="review-stars">
        ${Array.from({length: 5}, (_, i) => `<span class="star">${i < rev.rating ? '★' : '☆'}</span>`).join('')}
      </div>
      <p class="review-text">${rev.review_text}</p>
      <div class="review-author">
        <div class="review-avatar">${initials}</div>
        <div>
          <div class="review-author-name">${rev.patient_name}</div>
          <div class="review-treatment">${rev.treatment}</div>
        </div>
      </div>
    </div>
  `;
}

window.MH.loadReviews = loadReviews;
window.MH.SAMPLE_REVIEWS = SAMPLE_REVIEWS;
