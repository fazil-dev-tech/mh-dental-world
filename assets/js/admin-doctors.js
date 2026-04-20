/* ============================================================
   MH DENTAL WORLD — Admin Doctors Management
   Full CRUD with image upload, search, filter, sort
   ============================================================ */

let allDoctors = [];
let editingDoctorId = null;

async function initAdminDoctors() {
  await loadAdminDoctors();
  initDoctorForm();
  initDoctorSearch();
}

// ── Load Doctors ──
async function loadAdminDoctors() {
  if (MH.isAdminConfigured()) {
    try {
      const { data, error } = await MH.supabaseAdmin.from('doctors').select('*').order('display_order');
      if (!error && data) allDoctors = data;
      else allDoctors = [...MH.SAMPLE_DOCTORS];
    } catch (e) {
      allDoctors = [...MH.SAMPLE_DOCTORS];
    }
  } else {
    const stored = localStorage.getItem('mh_doctors');
    allDoctors = stored ? JSON.parse(stored) : [...MH.SAMPLE_DOCTORS];
  }
  renderDoctorsTable(allDoctors);
  updateDoctorCount();
}

function saveDoctorsLocal() {
  localStorage.setItem('mh_doctors', JSON.stringify(allDoctors));
}

// ── Render Table ──
function renderDoctorsTable(doctors) {
  const tbody = document.getElementById('doctors-tbody');
  if (!tbody) return;

  if (!doctors.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--clr-gray-400)">No doctors found. Click "Add Doctor" to get started.</td></tr>`;
    return;
  }

  tbody.innerHTML = doctors.map(doc => {
    const initials = doc.full_name.split(' ').map(n => n[0]).join('').substring(0,2);
    const imgHtml = doc.image_url
      ? `<img src="${doc.image_url}" class="table-img" alt="${doc.full_name}">`
      : `<div class="table-img" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fde4e8,#fbc8d4);color:#e8627c;font-weight:700;font-size:14px;border-radius:8px">${initials}</div>`;

    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            ${imgHtml}
            <div>
              <div class="table-name">${doc.full_name}</div>
              <div class="table-sub">${doc.designation || ''}</div>
            </div>
          </div>
        </td>
        <td>${doc.specialization || '—'}</td>
        <td>${doc.years_experience || 0} yrs</td>
        <td><span class="table-status ${doc.active ? 'active' : 'inactive'}">${doc.active ? '● Active' : '● Inactive'}</span></td>
        <td><span class="table-status ${doc.featured ? 'featured' : ''}">${doc.featured ? '★ Featured' : '—'}</span></td>
        <td>${doc.display_order || '—'}</td>
        <td>
          <div class="table-actions">
            <button class="table-action-btn edit" onclick="openEditDoctor(${doc.id})" title="Edit">✏️</button>
            <button class="table-action-btn delete" onclick="confirmDeleteDoctor(${doc.id}, '${doc.full_name.replace(/'/g, "\\'")}')" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateDoctorCount() {
  const countEl = document.getElementById('doctors-count');
  if (countEl) countEl.textContent = allDoctors.length;
}

// ── Search / Filter ──
function initDoctorSearch() {
  const searchInput = document.getElementById('doctor-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allDoctors.filter(d =>
      d.full_name.toLowerCase().includes(term) ||
      (d.specialization || '').toLowerCase().includes(term) ||
      (d.designation || '').toLowerCase().includes(term)
    );
    renderDoctorsTable(filtered);
  });
}

// ── Open Add/Edit Modal ──
function openAddDoctor() {
  editingDoctorId = null;
  resetDoctorForm();
  document.getElementById('doctor-modal-title').textContent = 'Add New Doctor';
  document.getElementById('doctor-modal').classList.add('active');
}

function openEditDoctor(id) {
  const doc = allDoctors.find(d => d.id === id);
  if (!doc) return;

  editingDoctorId = id;
  document.getElementById('doctor-modal-title').textContent = 'Edit Doctor';

  // Populate form
  document.getElementById('doc-fullname').value = doc.full_name || '';
  document.getElementById('doc-designation').value = doc.designation || '';
  document.getElementById('doc-specialization').value = doc.specialization || '';
  document.getElementById('doc-qualifications').value = doc.qualifications || '';
  document.getElementById('doc-experience').value = doc.years_experience || '';
  document.getElementById('doc-summary').value = doc.short_summary || '';
  document.getElementById('doc-biography').value = doc.full_biography || '';
  document.getElementById('doc-expertise').value = doc.expertise || '';
  document.getElementById('doc-certifications').value = doc.certifications || '';
  document.getElementById('doc-languages').value = doc.languages || '';
  document.getElementById('doc-timings').value = doc.consultation_timings || '';
  document.getElementById('doc-order').value = doc.display_order || '';
  document.getElementById('doc-active').checked = doc.active !== false;
  document.getElementById('doc-featured').checked = doc.featured === true;
  document.getElementById('doc-availability').checked = doc.availability !== false;

  // Show existing image
  const preview = document.getElementById('doc-image-preview');
  const uploadArea = document.getElementById('doc-upload-area');
  if (doc.image_url) {
    preview.src = doc.image_url;
    preview.style.display = 'block';
    uploadArea.classList.add('has-image');
  }

  document.getElementById('doctor-modal').classList.add('active');
}

function closeDoctorModal() {
  document.getElementById('doctor-modal').classList.remove('active');
  editingDoctorId = null;
  resetDoctorForm();
}

function resetDoctorForm() {
  const form = document.getElementById('doctor-form');
  if (form) form.reset();
  const preview = document.getElementById('doc-image-preview');
  if (preview) { preview.style.display = 'none'; preview.src = ''; }
  const uploadArea = document.getElementById('doc-upload-area');
  if (uploadArea) uploadArea.classList.remove('has-image');
}

// ── Doctor Form Submission ──
function initDoctorForm() {
  const form = document.getElementById('doctor-form');
  if (!form) return;

  // Image upload preview
  const fileInput = document.getElementById('doc-image-input');
  const preview = document.getElementById('doc-image-preview');
  const uploadArea = document.getElementById('doc-upload-area');

  if (uploadArea) {
    uploadArea.addEventListener('click', () => fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.src = ev.target.result;
          preview.style.display = 'block';
          uploadArea.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Saving...';

    try {
      const doctorData = {
        full_name: document.getElementById('doc-fullname').value.trim(),
        designation: document.getElementById('doc-designation').value.trim(),
        specialization: document.getElementById('doc-specialization').value.trim(),
        qualifications: document.getElementById('doc-qualifications').value.trim(),
        years_experience: parseInt(document.getElementById('doc-experience').value) || 0,
        short_summary: document.getElementById('doc-summary').value.trim(),
        full_biography: document.getElementById('doc-biography').value.trim(),
        expertise: document.getElementById('doc-expertise').value.trim(),
        certifications: document.getElementById('doc-certifications').value.trim(),
        languages: document.getElementById('doc-languages').value.trim(),
        consultation_timings: document.getElementById('doc-timings').value.trim(),
        display_order: parseInt(document.getElementById('doc-order').value) || allDoctors.length + 1,
        active: document.getElementById('doc-active').checked,
        featured: document.getElementById('doc-featured').checked,
        availability: document.getElementById('doc-availability').checked,
      };

      // Validate required
      if (!doctorData.full_name) {
        MH.showToast('Full name is required', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = editingDoctorId ? 'Update Doctor' : 'Add Doctor';
        return;
      }

      // Handle image upload
      const file = fileInput?.files[0];
      if (file && MH.isAdminConfigured()) {
        const filePath = `doctors/${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await MH.supabaseAdmin.storage
          .from('clinic-images')
          .upload(filePath, file);

        if (!uploadError) {
          const { data: { publicUrl } } = MH.supabaseAdmin.storage
            .from('clinic-images')
            .getPublicUrl(filePath);
          doctorData.image_url = publicUrl;
          doctorData.image_path = filePath;
        }
      } else if (file) {
        // Demo: use data URL
        doctorData.image_url = preview.src;
      }

      if (MH.isAdminConfigured()) {
        if (editingDoctorId) {
          const { error } = await MH.supabaseAdmin.from('doctors').update(doctorData).eq('id', editingDoctorId);
          if (error) throw error;
        } else {
          const { error } = await MH.supabaseAdmin.from('doctors').insert(doctorData);
          if (error) throw error;
        }
      } else {
        // Local storage mode
        if (editingDoctorId) {
          const idx = allDoctors.findIndex(d => d.id === editingDoctorId);
          if (idx !== -1) {
            allDoctors[idx] = { ...allDoctors[idx], ...doctorData };
          }
        } else {
          doctorData.id = Date.now();
          allDoctors.push(doctorData);
        }
        saveDoctorsLocal();
      }

      MH.showToast(editingDoctorId ? 'Doctor updated successfully!' : 'Doctor added successfully!', 'success');
      closeDoctorModal();
      await loadAdminDoctors();
    } catch (err) {
      MH.showToast('Error: ' + err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = editingDoctorId ? 'Update Doctor' : 'Add Doctor';
    }
  });
}

// ── Delete Doctor ──
function confirmDeleteDoctor(id, name) {
  const modal = document.getElementById('delete-modal');
  const nameEl = document.getElementById('delete-doctor-name');
  if (nameEl) nameEl.textContent = name;
  if (modal) modal.classList.add('active');

  const confirmBtn = document.getElementById('confirm-delete-btn');
  if (confirmBtn) {
    confirmBtn.onclick = () => deleteDoctor(id);
  }
}

async function deleteDoctor(id) {
  try {
    if (MH.isAdminConfigured()) {
      // Delete image from storage first
      const doc = allDoctors.find(d => d.id === id);
      if (doc?.image_path) {
        await MH.supabaseAdmin.storage.from('clinic-images').remove([doc.image_path]);
      }
      const { error } = await MH.supabaseAdmin.from('doctors').delete().eq('id', id);
      if (error) throw error;
    } else {
      allDoctors = allDoctors.filter(d => d.id !== id);
      saveDoctorsLocal();
    }

    MH.showToast('Doctor deleted successfully', 'success');
    document.getElementById('delete-modal').classList.remove('active');
    await loadAdminDoctors();
  } catch (err) {
    MH.showToast('Error deleting doctor: ' + err.message, 'error');
  }
}

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.remove('active');
}

// Make available globally
window.openAddDoctor = openAddDoctor;
window.openEditDoctor = openEditDoctor;
window.closeDoctorModal = closeDoctorModal;
window.confirmDeleteDoctor = confirmDeleteDoctor;
window.deleteDoctor = deleteDoctor;
window.closeDeleteModal = closeDeleteModal;
window.MH.initAdminDoctors = initAdminDoctors;
