/**
 * navigation.js
 * Manages section visibility and active button states.
 */

export function hideAllSections() {
    const sections = ['calendarSection', 'culturalHub', 'rulesPage'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // Hide the bottom info panel on culture/rules pages if desired, 
    // or keep it visible by commenting out the line below.
    document.querySelector('.info-panel').style.display = 'none';

    // Reset nav button highlights
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
}

export function setActiveNav(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) btn.classList.add('active');
}
