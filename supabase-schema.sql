-- ============================================================
-- MH DENTAL WORLD — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ── DOCTORS TABLE ──
CREATE TABLE IF NOT EXISTS doctors (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  designation TEXT,
  specialization TEXT,
  qualifications TEXT,
  years_experience INTEGER DEFAULT 0,
  short_summary TEXT,
  full_biography TEXT,
  expertise TEXT,
  certifications TEXT,
  languages TEXT,
  consultation_timings TEXT,
  availability BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  image_path TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── SERVICES TABLE ──
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT DEFAULT '🦷',
  short_desc TEXT,
  full_desc TEXT,
  benefits TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── REVIEWS TABLE ──
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  treatment TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── GALLERY TABLE ──
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  category TEXT DEFAULT 'clinic',
  alt TEXT,
  image_url TEXT NOT NULL,
  image_path TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── FAQS TABLE ──
CREATE TABLE IF NOT EXISTS faqs (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── CLINIC SETTINGS TABLE ──
CREATE TABLE IF NOT EXISTS clinic_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ policies (anyone can view active records)
CREATE POLICY "Public read active doctors" ON doctors
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read active services" ON services
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read approved reviews" ON reviews
  FOR SELECT USING (approved = TRUE);

CREATE POLICY "Public read gallery" ON gallery
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read active faqs" ON faqs
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read clinic settings" ON clinic_settings
  FOR SELECT USING (TRUE);

-- ADMIN WRITE policies (authenticated users only)
CREATE POLICY "Admin full access doctors" ON doctors
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access reviews" ON reviews
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access gallery" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access clinic_settings" ON clinic_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
-- Create this manually in Supabase Dashboard > Storage:
-- Bucket name: clinic-images
-- Public: YES
-- File size limit: 5MB
-- Allowed types: image/jpeg, image/png, image/webp, image/gif

-- ============================================================
-- SEED DATA (Optional — run after table creation)
-- ============================================================

-- Insert default doctor
INSERT INTO doctors (full_name, designation, specialization, qualifications, years_experience, short_summary, full_biography, expertise, certifications, languages, consultation_timings, availability, featured, active, display_order) VALUES
('Dr. Mohamed Fazil', 'Chief Dental Surgeon', 'Oral & Maxillofacial Surgery', 'BDS, MDS (Oral Surgery)', 12, 'Pioneering advanced surgical techniques with over a decade of experience.', 'Dr. Mohamed Fazil is the founder and chief dental surgeon at MH Dental World. With extensive training in oral and maxillofacial surgery, he specializes in dental implants, wisdom tooth surgery, and complex jaw procedures.', 'Dental Implants, Wisdom Tooth Surgery, Jaw Surgery, Full Mouth Rehabilitation', 'Indian Dental Association, Fellow ICOI', 'English, Tamil, Hindi, Urdu', 'Mon–Sat: 10:00 AM – 8:00 PM', TRUE, TRUE, TRUE, 1);

-- Insert sample services
INSERT INTO services (title, icon, short_desc, benefits, featured, active, display_order) VALUES
('Teeth Cleaning & Polishing', '🦷', 'Professional deep cleaning to remove plaque, tartar, and stains.', 'Prevents cavities, Freshens breath, Removes stains', TRUE, TRUE, 1),
('Root Canal Treatment', '🏥', 'Pain-free root canal therapy using advanced rotary instruments.', 'Saves natural tooth, Pain-free procedure, Single-visit option', TRUE, TRUE, 2),
('Dental Implants', '🔩', 'Permanent titanium implants — look, feel, and function like natural teeth.', 'Permanent solution, Natural appearance, Preserves jawbone', TRUE, TRUE, 3),
('Braces & Aligners', '😁', 'Metal braces, ceramic braces, and clear aligners for perfect alignment.', 'Straighter teeth, Improved bite, Boosted confidence', TRUE, TRUE, 4),
('Teeth Whitening', '✨', 'Advanced LED and laser whitening for a dramatically brighter smile.', 'Instant results, Safe procedure, Long-lasting brightness', TRUE, TRUE, 5),
('Cosmetic Dentistry', '💎', 'Smile makeovers with veneers, bonding, and aesthetic restorations.', 'Custom design, Natural-looking, Lasting beauty', TRUE, TRUE, 6);

-- Insert sample reviews
INSERT INTO reviews (patient_name, treatment, rating, review_text, featured, approved) VALUES
('Priya Sharma', 'Root Canal Treatment', 5, 'Absolutely wonderful experience! Dr. Fazil made my root canal completely painless.', TRUE, TRUE),
('Arjun Reddy', 'Dental Implant', 5, 'Got my dental implant done here and it was flawless. Best dental clinic!', TRUE, TRUE),
('Kavitha Nair', 'Pediatric Dentistry', 5, 'My daughter was terrified of dentists, but the team here was incredible.', TRUE, TRUE);

-- Default clinic settings
INSERT INTO clinic_settings (key, value) VALUES
('clinic_name', 'MH Dental World'),
('tagline', 'Advanced Dental Care'),
('phone', '+91 98456 61301'),
('whatsapp', '919845661301'),
('email', 'info@mhdentalworld.com'),
('timings_weekday', 'Mon–Sat: 9:00 AM – 9:00 PM'),
('timings_weekend', 'Sun: 10:00 AM – 2:00 PM'),
('instagram', 'https://www.instagram.com/mhdentalworld?igsh=MmRsb2d2OWhsZWo5'),
('maps_link', 'https://maps.app.goo.gl/q8VG74xzfcwafMmp6?g_st=aw');
