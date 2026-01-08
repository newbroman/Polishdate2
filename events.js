/**
 * events.js - Final Integration Fixed
 */
import { speakText, checkVoices } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules, { getRulesHTML } from './rules.js'; // Added getRulesHTML import

export function setupListeners(state, render) {
    
    // --- 1. Audio and Logic Toggles ---
 const meetingBtn = document.getElementById('meetingToggle');
if (meetingBtn) {
    meetingBtn.onclick = () => {
        state.isFormal = !state.isFormal; // Ensure this matches state.isFormal
        render(); // This triggers updateInfoPanel with the new state
            }
        });

        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && textToSpeak !== "Wybierz datę" && textToSpeak !== "Select a date") {
                speakText(textToSpeak);
            }
        };
    }

const meetingBtn = document.getElementById('meetingToggle');
if (meetingBtn) {
    // Set initial class based on default Formal state
    meetingBtn.className = state.isFormal ? 'pill-btn mode-btn-formal' : 'pill-btn mode-btn-informal';

    meetingBtn.onclick = () => {
        state.isFormal = !state.isFormal;
        
        // 1. Update text
        meetingBtn.innerText = state.isFormal ? "📅 Mode: Formal" : "📅 Mode: Informal";
        
        // 2. Update button color (CSS classes)
        meetingBtn.className = `pill-btn ${state.isFormal ? 'mode-btn-formal' : 'mode-btn-informal'}`;
        
        // 3. Trigger full UI update (this will update the footer theme via ui-renderer.js)
        render(); 
    };
}

    // --- 2. Navigation Logic ---
    const showSection = (id) => {
        const sections = {
            'calendar': document.getElementById('calendarSection'),
            'culture': document.getElementById('culturalHub'),
            'rules': document.getElementById('rulesPage')
        };
        const infoPanel = document.querySelector('.info-panel');

        Object.values(sections).forEach(s => { if (s) s.style.display = 'none'; });

        if (id === 'calendar') {
            if (sections['calendar']) sections['calendar'].style.display = 'flex'; 
            if (infoPanel) infoPanel.style.display = 'flex';
        } else {
            if (sections[id]) sections[id].style.display = 'block';
            if (infoPanel) infoPanel.style.display = 'none';
        }

        document.querySelectorAll('.nav-icon-btn').forEach(b => {
            b.classList.toggle('active', b.id === `nav${id.charAt(0).toUpperCase() + id.slice(1)}`);
        });
    };

    // --- 3. Click Listeners ---
    document.getElementById('navCalendar').onclick = () => {
        showSection('calendar');
        render();
    };

    document.getElementById('navCulture').onclick = () => {
        showSection('culture');
        renderCulturalHub(state); 
    };

    document.getElementById('navRules').onclick = () => {
        showSection('rules');
        renderRulesPage();
    };

    // Calendar Controls
    document.getElementById('prevMonth').onclick = () => {
        state.viewDate.setMonth(state.viewDate.getMonth() - 1);
        render();
    };

    document.getElementById('nextMonth').onclick = () => {
        state.viewDate.setMonth(state.viewDate.getMonth() + 1);
        render();
    };

    document.getElementById('monthRoller').onchange = (e) => {
        state.viewDate.setMonth(parseInt(e.target.value));
        render();
    };

    document.getElementById('yearInput').onchange = (e) => {
        state.viewDate.setFullYear(parseInt(e.target.value));
        render();
    };

    document.getElementById('langToggle').onclick = (e) => {
        state.isPolish = !state.isPolish;
        e.target.innerText = state.isPolish ? 'PL' : 'EN';
        render(); 
    };

    document.getElementById('repeatYearBtn').onclick = () => {
        state.includeYear = !state.includeYear;
        render(); 
    };
} 

/**
 * Renders the Cultural Hub
 */
export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    const selectedDay = state.selectedDate.getDate();
    const dayOfWeekIndex = state.selectedDate.getDay(); 

    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

    const displayMonthName = state.isPolish ? monthNamesPl[monthIndex] : monthNamesEn[monthIndex];
    const monthInfo = culturalData.months[monthIndex] || { pl: "Month", derivation: "N/A", season: "N/A" };
    const dayInfo = culturalData.days[dayOfWeekIndex] || { pl: "Day", meaning: "N/A" };
    const holidays = holidayData.getHolidaysForYear(year);

    let html = `
        <div class="culture-page">
            <header class="culture-header">
                <h1>${displayMonthName} ${year}</h1>
                <span class="season-label">Season: ${monthInfo.season}</span>
            </header>
            <section class="info-block day-meaning-highlight">
                <h3>📅 ${state.isPolish ? 'Dzień tygodnia' : 'Day of the Week'}</h3>
                <p><strong>${dayInfo.pl}:</strong> ${dayInfo.meaning}</p>
                <small><em>${state.isPolish ? 'Wybrany dzień' : 'Currently selected'}: ${selectedDay} ${monthInfo.pl}</em></small>
            </section>
            <section class="info-block">
                <h3>📜 ${state.isPolish ? 'Znaczenie nazwy miesiąca' : 'Month Name History'}</h3>
                <p>${monthInfo.derivation}</p>
            </section>
            <section class="info-block">
                <h3>🎈 ${state.isPolish ? 'Święta i tradycje' : 'Holidays & Traditions'}</h3>
                <div class="holiday-list">`;

    let foundHoliday = false;
    Object.entries(holidays).forEach(([key, name]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            const dayNum = key.split('-')[1]; 
            const explanation = culturalData.holidayExplanations[key] || 
                               culturalData.holidayExplanations[name] || 
                               "No description available yet.";
            
            html += `
                <div class="holiday-entry">
                    <div class="holiday-date">${dayNum} ${monthInfo.pl}</div>
                    <strong>${name}</strong>
                    <p>${explanation}</p>
                </div>`;
            foundHoliday = true;
        }
    });

    if (!foundHoliday) {
        html += `<p class="no-data">${state.isPolish ? 'Brak świąt w tym miesiącu.' : 'No major holidays listed for this month.'}</p>`;
    }

    html += `</div></section>
            <button id="backToCalCulture" class="close-culture-btn">
                ← ${state.isPolish ? 'Powrót' : 'Back to Calendar'}
            </button>
        </div>`;

    hub.innerHTML = html;
    document.getElementById('backToCalCulture').onclick = () => {
        document.getElementById('navCalendar').click();
    };
}

/**
 * Renders the Grammar Rules page using the function from rules.js
 */
export function renderRulesPage() {
    const page = document.getElementById('rulesPage');
    if (!page) return;
    
    // Using your custom HTML builder from rules.js for consistency
    page.innerHTML = `<div class="culture-page">${getRulesHTML()}</div>`;

    // Ensure the button in your getRulesHTML triggers navigation
    const backBtn = page.querySelector('.close-culture-btn');
    if (backBtn) {
        backBtn.onclick = () => document.getElementById('navCalendar').click();
    }
}
