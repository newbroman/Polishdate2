import { speakPolish } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

export function setupListeners(state, render) {
    // ... (Keep existing playBtn, yearBtn, and navCalendar listeners)

    document.getElementById('navCulture').onclick = () => {
        document.getElementById('calendarSection').style.display = 'none';
        document.getElementById('rulesPage').style.display = 'none';
        document.getElementById('culturalHub').style.display = 'block';
        renderCulturalHub(state); 
    };

    document.getElementById('navRules').onclick = () => {
        document.getElementById('calendarSection').style.display = 'none';
        document.getElementById('culturalHub').style.display = 'none';
        document.getElementById('rulesPage').style.display = 'block';
        renderRulesPage();
    };
    
    // ... (Keep existing navigation and roller listeners)
}

export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const monthInfo = culturalData.months[monthIndex] || { pl: "Month", derivation: "N/A", season: "N/A" };
    const holidays = holidayData.getHolidaysForYear(state.viewDate.getFullYear());

    let html = `
        <div class="culture-page">
            <header class="culture-header">
                <h1>${monthInfo.pl}</h1>
                <span class="season-label">Season: ${monthInfo.season}</span>
            </header>
            <section class="info-block">
                <h3>📜 Name Meaning & History</h3>
                <p>${monthInfo.derivation}</p>
            </section>
            <section class="info-block">
                <h3>🎈 Holidays this Month</h3>
                <div class="holiday-list">`;

    Object.entries(holidays).forEach(([key, name]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            const day = key.split('-')[1]; // Extracts the date from "0-1" format
            html += `
                <div class="holiday-entry">
                    <div class="holiday-date">${day} ${monthInfo.pl}</div>
                    <strong>${name}</strong>
                </div>`;
        }
    });

    hub.innerHTML = html + `</div></section></div>`;
}

export function renderRulesPage() {
    const page = document.getElementById('rulesPage');
    let html = `<div class="culture-page"><h1>Grammar Rules</h1>`;
    
    Object.values(grammarRules).forEach(item => {
        html += `
            <div class="info-block">
                <h3>${item.title}</h3>
                <p>${item.explanation}</p>
                ${item.rule ? `<p><strong>Rule:</strong> ${item.rule}</p>` : ''}
                ${item.example ? `<p><em>Example: ${item.example}</em></p>` : ''}
            </div>`;
    });
    
    page.innerHTML = html + `</div>`;
}
