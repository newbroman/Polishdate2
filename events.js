/**
 * events.js - Final Integration Fixed
 */
import { speakText, checkVoices } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

export function setupListeners(state, render) {
    
    // --- 1. Audio and Logic Toggles ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.disabled = true;
        playBtn.innerText = "⌛ Loading...";

        checkVoices((ready) => {
            if (ready) {
                playBtn.disabled = false;
                playBtn.innerText = "🔊 Listen";
                playBtn.style.opacity = "1";
            }
        });

        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && textToSpeak !== "Wybierz datę") {
                speakText(textToSpeak);
            }
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

    // Hide all
    Object.values(sections).forEach(s => {
        if (s) s.style.display = 'none';
    });

    // Show the target section correctly
    if (id === 'calendar') {
        sections['calendar'].style.display = 'flex'; // Use FLEX for the calendar to keep it centered
    } else {
        if (sections[id]) sections[id].style.display = 'block'; // Use BLOCK for text pages
    }

    if (infoPanel) infoPanel.style.display = (id === 'calendar') ? 'block' : 'none';
    document.querySelectorAll('.nav-icon-btn').forEach(b => b.classList.remove('active'));
};

    // --- 3. Click Listeners ---
    document.getElementById('navCalendar').onclick = () => {
        showSection('calendar');
        document.getElementById('navCalendar').classList.add('active');
        render();
    };

    document.getElementById('navCulture').onclick = () => {
        showSection('culture');
        document.getElementById('navCulture').classList.add('active');
        renderCulturalHub(state); 
    };

    document.getElementById('navRules').onclick = () => {
        showSection('rules');
        document.getElementById('navRules').classList.add('active');
        renderRulesPage();
    };

    // Month & Year Input Listeners
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

    document.getElementById('repeatYearBtn').onclick = (e) => {
        state.includeYear = !state.includeYear;
        e.target.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
        render();
    };
} // <--- THIS WAS MISSING: Closes setupListeners

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
            const explanation = culturalData.holidayExplanations[key] || "No description available yet.";
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
 * Renders the Grammar Rules page
 */
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
    html += `<button id="backToCalRules" class="close-culture-btn">← Back</button></div>`;
    page.innerHTML = html;

    document.getElementById('backToCalRules').onclick = () => {
        document.getElementById('navCalendar').click();
    };
}
