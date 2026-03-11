/* ============================================================
   EventHive — Main JavaScript
   Sections:
   1. Scroll Reveal (all pages)
   2. Active Nav Link Highlighting (index.html)
   3. Login / Register Tab Switch (login.html)
   4. Filter Chips (events.html)
   5. Team Registration Form (event-detail.html)
   6. Registration Success Modal (event-detail.html)
   7. Profile Tab Switch (profile.html)
   ============================================================ */


/* ─── 1. SCROLL REVEAL ─── */
// Fades in elements with class "reveal" as they enter the viewport.
// Applies a staggered delay for a cascade effect.

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ─── 2. ACTIVE NAV LINK HIGHLIGHTING ─── */
// Highlights the nav link matching the currently visible section
// as the user scrolls down the landing page (index.html).

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + currentSection;
    link.style.color = isActive ? 'var(--amber)' : '';
  });
});


/* ─── 3. LOGIN / REGISTER TAB SWITCH ─── */
// Switches between the Login and Register panels on login.html.
// Updates heading text and shows/hides the correct form panel.

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

  if (tab === 'login') {
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.getElementById('panel-login').classList.add('active');
    document.getElementById('form-title').textContent = 'Welcome back';
    document.getElementById('form-sub').textContent = 'Sign in to your EventHive account';
  } else {
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
    document.getElementById('panel-register').classList.add('active');
    document.getElementById('form-title').textContent = 'Create account';
    document.getElementById('form-sub').textContent = 'Join EventHive and start registering for events';
  }
}


/* ─── 4. FILTER CHIPS ─── */
// Toggles the active state on event filter chips in events.html.

function filterChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}


/* ─── 5. TEAM REGISTRATION FORM ─── */
// Dynamically adds/removes team member email fields in event-detail.html.
// Max 4 additional members (5 total including leader).

let memberCount = 1;

function addMember() {
  if (memberCount >= 4) return;
  memberCount++;

  const list = document.getElementById('members-list');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'member-row';
  row.style.marginBottom = '0.5rem';
  row.innerHTML = `
    <input type="email" placeholder="member${memberCount + 1}@college.edu"/>
    <button class="remove-btn" onclick="removeMember(this)">✕</button>
  `;
  list.appendChild(row);
}

function removeMember(btn) {
  btn.parentElement.remove();
  memberCount = Math.max(1, memberCount - 1);
}

// Shows/hides the team members section based on participation type
function toggleTeam() {
  const type = document.getElementById('part-type');
  const teamSection = document.getElementById('team-section');
  if (!type || !teamSection) return;
  teamSection.style.display = type.value === 'team' ? 'block' : 'none';
}


/* ─── 6. REGISTRATION SUCCESS MODAL ─── */
// Shows/hides the confirmation modal after form submission in event-detail.html.

function showModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('show');
  window.location.href = 'profile.html';
}


/* ─── 7. PROFILE TAB SWITCH ─── */
// Switches between Registrations, Teams, and Settings tabs in profile.html.

function switchProfileTab(btn, tabId) {
  document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  ['registrations', 'teams', 'settings'].forEach(id => {
    const tab = document.getElementById('tab-' + id);
    if (tab) tab.style.display = id === tabId ? 'block' : 'none';
  });
}