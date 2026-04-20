<div align="center">
  <h1>🦷 MH Dental World</h1>
  <p><strong>A Premium, Production-Ready Dental Clinic Platform & Admin Portal</strong></p>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
  ![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

</div>

---

## 📖 Overview

**MH Dental World** is a world-class, production-grade premium dental clinic websuite complete with a fully functional authenticated admin portal. Built with **Vanilla HTML/CSS/JavaScript** and powered by a backend **Supabase** (PostgreSQL) instance, it ensures blistering fast static load times alongside dynamic data capabilities in a resilient architecture.

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend UI** | HTML5, CSS3, Vanilla JavaScript |
| **Styling** | Custom CSS Design System (Glassmorphism, Viewport Animations, Responsive Grids) |
| **Typography** | Google Fonts (Playfair Display, Inter, Outfit) |
| **Backend & DB**| Supabase (PostgreSQL Database, API generation) |
| **Storage** | Supabase Storage (Image tracking and handling) |
| **Deployment** | Native Static Compatibility (Netlify, Vercel, GitHub Pages) |

---

## 📱 Platform Features

### The Public Experience (Patient Facing)
- **Fluid Responsiveness**: Flawlessly adapts from the smallest mobile device to ultrawide desktop monitors.
- **Premium Aesthetics**: Features a modern glassmorphism design with a Crimson Pink (`#DC3558`) primary token.
- **Dynamic Content**: Viewport-triggered scroll reveals and animated clinic statistic counters.
- **Rich Doctor Profiles**: Detailed team pages including specialized expertise and biography views.
- **Live Patient Reviews**: Rotating carousel pulling verified reviews securely from the backend.
- **Transformation Gallery**: Interactive lightbox view holding clinical case studies and high-quality clinic photos.
- **Integrated Utilities**: WhatsApp direct chat links, click-to-call integrations, and embedded Google Maps locators.

### The Admin Portal (Management)
- **Secure Authentication**: Robust dashboard protection powered by Supabase Auth (or local Demo Mode fallback).
- **Comprehensive CRUD Operations**: Form-based interfaces allowing clinic managers to create, read, update, and delete Doctors, Services, and Reviews.
- **Dynamic Configuration**: Change SEO clinic settings, phone numbers, and operational timings that instantly reflect across the live platform.
- **Content Moderation**: Approve or curate patient reviews to dictate which show on the public homepage.

---

## 📁 Repository Structure

```text
MH DENTAL WORLD/
├── index.html               # Main Landing Page
├── about.html               # About & Clinic Heritage
├── services.html            # Dental Catalog
├── doctors.html             # The Medical Team
├── doctor-detail.html       # Individual Doctor Schema Views
├── gallery.html             # The Visual Gallery
├── reviews.html             # Patient Testimonials
├── admin/                   # 🔒 The Secured Admin Dashboard
│   ├── login.html           
│   └── dashboard.html       
├── assets/                  
│   ├── css/                 # Global UI Design Tokens
│   ├── js/                  # Component logic and Supabase Config
│   └── images/              # Static bundled images
├── supabase-schema.sql      # Remote Database Structural Commands
└── IMAGES/                  # Unprocessed client source files
```

---

## 🚀 Quick Start Local Development

Because the core is static vanilla HTML/JS, running this project locally requires zero build tools or bundling steps!

### 1. Serve the Directory
You can use any standard HTTP server package.
```bash
# Using Node/NPM
npx http-server . -p 3000

# Using Python
python -m http.server 3000
```
Then simply open `http://localhost:3000` in your web browser.

### 2. Enter the Admin System
Navigate your browser to `http://localhost:3000/admin/login.html` to view the administration systems.

---

## 🔗 Supabase Backend Configuration

This website is pre-configured to communicate directly with a **Supabase** backend cluster. The configuration sits cleanly at `assets/js/supabase-config.js`.

To spin up your own instance:
1. Create a project at [Supabase.com](https://supabase.com).
2. Copy the contents of the `supabase-schema.sql` file.
3. Paste the SQL query into the **Supabase SQL Editor** and execute to instantly provision the required `doctors`, `services`, `reviews`, `gallery`, `faqs`, and `clinic_settings` tables (and apply Row Level Security policies).
4. Extract your *Project URL* and *Anon Key* from the API settings and insert them into the `.js` config block.
5. Create a new Storage Bucket called `clinic-images` and set it to Public.

---

## 🎨 Design System Guide

The custom styling system relies heavily on specific variables declared in `main.css`:
- **Primary Color**: Crimson Pink `#DC3558`
- **Backgrounds**: Soft variants including Blush `#fff0f3`, Rose `#ffe4ea`, and Cream `#fffbfc`.
- **Glass Effect**: Defined aggressively using `rgba(255,255,255,0.65)` layered with `backdrop-filter: blur(20px)`.

---

## 🤝 Contributing & License
If you're modifying this platform, ensure you do not break the API configurations when introducing new HTML schemas.

This project sits under the **MIT License**.

> *Built to redefine the standard in digital healthcare interfaces.*
