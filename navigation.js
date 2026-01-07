/**
 * navigation.js
 * Manages section visibility and fills content from data modules.
 */
import { getCulturalHTML } from './cultural.js';
import { getGrammarHTML } from './rules.js';

export function hideAllSections() {
    const sections = ['calendarSection', 'culturalHub', 'rulesPage'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // Hide the bottom info panel on non-calendar pages
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) infoPanel.style.display = 'none';

    // Reset nav button highlights (Using your class 'nav-icon-btn' from HTML)
    document.querySelectorAll('.nav-icon-btn').forEach(btn => btn.classList.remove('active'));
}

export function showCalendar() {
    hideAllSections();
    document.getElementById('calendarSection').style.display = 'block';
    document.querySelector('.info-panel').style.display = 'block';
    document.getElementById('navCalendar').classList.add('active');
}

export function showCulture() {
    hideAllSections();
    const container = document.getElementById('culturalHub');
    container.innerHTML = getCulturalHTML(); // Fill with our data
    container.style.display = 'block';
    document.getElementById('navCulture').classList.add('active');
}

export function showRules() {
    hideAllSections();
    const container = document.getElementById('rulesPage');
    container.innerHTML = getGrammarHTML(); // Fill with our data
    container.style.display = 'block';
    document.getElementById('navRules').classList.add('active');
}
