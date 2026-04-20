# 🦷 MH Dental World — Premium Dental Clinic Website

A world-class, production-grade premium dental clinic website with a fully functional admin portal. Built with **vanilla HTML/CSS/JavaScript** and **Supabase** backend.

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | Custom CSS Design System (Glassmorphism, Animations, Responsive) |
| **Typography** | Google Fonts (Playfair Display, Inter, Outfit) |
| **Backend** | Supabase (Auth, PostgreSQL, Storage) |
| **Deployment** | Any static hosting (Netlify, Vercel, GitHub Pages) |

---

## 📁 Project Structure

```
MH DENTAL WORLD/
├── index.html               # Homepage
├── about.html               # About Us
├── services.html            # Dental Services
├── doctors.html             # Our Doctors
├── doctor-detail.html       # Doctor Profile Page
├── gallery.html             # Clinic Gallery
├── reviews.html             # Patient Reviews
├── before-after.html        # Smile Transformations
├── contact.html             # Contact Information
├── faq.html                 # Frequently Asked Questions
├── emergency.html           # Emergency Dental Care
├── privacy.html             # Privacy Policy
├── terms.html               # Terms & Conditions
├── 404.html                 # Custom Error Page
├── supabase-schema.sql      # Database Schema
│
├── admin/                   # Admin Portal
│   ├── login.html           # Admin Login
│   ├── dashboard.html       # Dashboard
│   ├── doctors.html         # Manage Doctors
│   ├── services.html        # Manage Services
│   ├── reviews.html         # Manage Reviews
│   ├── gallery.html         # Manage Gallery
│   ├── banners.html         # Hero & Banners
│   ├── faqs.html            # Manage FAQs
│   ├── contact.html         # Contact Info
│   └── settings.html        # Clinic Settings
│
├── assets/
│   ├── css/
│   │   ├── main.css         # Design System & Variables
│   │   ├── components.css   # UI Component Styles
│   │   ├── animations.css   # Animations & Scroll Reveal
│   │   ├── responsive.css   # Responsive Breakpoints
│   │   └── admin.css        # Admin Portal Styles
│   │
│   ├── js/
│   │   ├── supabase-config.js   # Supabase Client Config
│   │   ├── main.js              # Core UI Utilities
│   │   ├── doctors.js           # Doctors Module
│   │   ├── services.js          # Services Module
│   │   ├── reviews.js           # Reviews Module
│   │   ├── gallery.js           # Gallery Module
│   │   ├── admin-auth.js        # Admin Authentication
│   │   ├── admin-dashboard.js   # Dashboard Stats
│   │   └── admin-doctors.js     # Doctor CRUD Management
│   │
│   └── images/
│       └── gallery/             # Clinic Photos
│
└── IMAGES/                  # Original Uploads
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary** | Crimson Pink `#DC3558` |
| **Heading Font** | Playfair Display (Serif) |
| **Body Font** | Inter (Sans-serif) |
| **Accent Font** | Outfit (Sans-serif) |
| **Backgrounds** | Blush `#fff0f3`, Rose `#ffe4ea`, Cream `#fffbfc` |
| **Glass Effect** | `rgba(255,255,255,0.65)` + `blur(20px)` |

---

## 🚀 Quick Start

### 1. Clone & Serve
```bash
# Using any static server
npx http-server . -p 3000

# Or Python
python -m http.server 3000
```

### 2. Open in browser
```
http://localhost:3000
```

### 3. Admin Portal
```
http://localhost:3000/admin/login.html

# Demo credentials:
Email: admin@mhdentalworld.com
Password: admin123
```

---

## 🔗 Supabase Setup (Optional)

The site works fully in **demo mode** with localStorage. To connect a real database:

### 1. Create a Supabase project at [supabase.com](https://supabase.com)

### 2. Run the SQL schema
Copy and paste `supabase-schema.sql` into the Supabase SQL Editor.

### 3. Create Storage bucket
- Bucket name: `clinic-images`
- Public: **Yes**
- File size: **5MB**
- Allowed types: `image/jpeg, image/png, image/webp`

### 4. Update credentials
Edit `assets/js/supabase-config.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

---

## 📱 Features

### Public Website
- ✅ Responsive design (Mobile → Desktop)
- ✅ Premium glassmorphism aesthetics
- ✅ Animated scroll reveals & counters
- ✅ 12+ dental services catalog
- ✅ Doctor profiles with detail pages
- ✅ Patient reviews carousel
- ✅ Clinic image gallery with lightbox
- ✅ Before/After smile transformations
- ✅ FAQ accordion
- ✅ Emergency dental care page
- ✅ WhatsApp & call CTAs
- ✅ Mobile-sticky CTA bar
- ✅ Google Maps integration
- ✅ SEO optimized

### Admin Portal
- ✅ Secure authentication (Supabase Auth + Demo mode)
- ✅ Dashboard with stats overview
- ✅ Full CRUD for Doctors (with image upload)
- ✅ Full CRUD for Services
- ✅ Full CRUD for Reviews (approve/reject/featured)
- ✅ Gallery management with image upload
- ✅ Hero section & banner editor
- ✅ FAQ management
- ✅ Contact information editor
- ✅ Clinic settings & SEO config
- ✅ Responsive sidebar navigation

---

## 📞 Contact

**MH Dental World**
- 📞 +91 98456 61301
- 📧 info@mhdentalworld.com
- 📍 [Google Maps](https://maps.app.goo.gl/q8VG74xzfcwafMmp6?g_st=aw)
- 📸 [Instagram](https://www.instagram.com/mhdentalworld?igsh=MmRsb2d2OWhsZWo5)

---

© 2026 MH Dental World. All rights reserved.
