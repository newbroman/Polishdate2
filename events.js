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
        // We no longer manually set .innerText = "Loading" here.
        // render() in app.js will handle the text.

        checkVoices((ready) => {
            if (ready) {
                playBtn.disabled = false;
                playBtn.style.opacity = "1";
                render(); // This ensures "Listen" or "Słuchaj" appears
            }
        });

        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            // Check for both English and Polish default text
            if (textToSpeak && textToSpeak !== "Wybierz datę" && textToSpeak !== "Select a date") {
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

    // LANGUAGE TOGGLE - CLEANED UP
    document.getElementById('langToggle').onclick = (e) => {
        state.isPolish = !state.isPolish;
        // Toggle the button label between PL and EN
        e.target.innerText = state.isPolish ? 'PL' : 'EN';
        render(); // app.js now handles translating the other buttons
    };

    // INCLUDE YEAR TOGGLE - CLEANED UP
    document.getElementById('repeatYearBtn').onclick = () => {
        state.includeYear = !state.includeYear;
        // No manual innerText here anymore!
        render(); // app.js handles the text and translation
    };
} 

/**
 * Renders the Cultural Hub (Existing Logic)
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
 * Renders the Grammar Rules page (Existing Logic)
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
