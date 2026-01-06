import { speakPolish } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

/**
 * Sets up all UI event listeners.
 * Handles the switch from select dropdown to a type-able year input.
 */
export function setupListeners(state, render) {
    // 1. Audio and Logic Toggles
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && !textToSpeak.includes('...')) {
                speakPolish(textToSpeak);
            }
        };
    }

    const yearToggleBtn = document.getElementById('repeatYearBtn');
    if (yearToggleBtn) {
        yearToggleBtn.onclick = () => {
            state.includeYear = !state.includeYear;
            yearToggleBtn.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
            render();
        };
    }

// Language Toggle Logic
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.onclick = () => {
            // 1. Flip the state
            state.isPolish = !state.isPolish;
            
            // 2. Update the button text (Optional but helpful)
            langToggle.innerText = state.isPolish ? "PL" : "EN";
            
            // 3. Re-run render to update headers, weekdays, and the Today button
            render(); 
        };
    }
    
    // 2. Navigation Switches
    document.getElementById('navCalendar').onclick = () => {
        document.getElementById('calendarSection').style.display = 'block';
        document.getElementById('culturalHub').style.display = 'none';
        document.getElementById('rulesPage').style.display = 'none';
        render();
    };

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

    // 3. Year Input (Typing 0-3000)
    const yearInput = document.getElementById('yearInput');
    if (yearInput) {
        yearInput.oninput = (e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0 && val <= 3000) {
                state.viewDate.setFullYear(val);
                render(); 
            }
        };
    }

    // 4. Month Dropdown
    const monthRoller = document.getElementById('monthRoller');
    if (monthRoller) {
        monthRoller.onchange = (e) => {
            state.viewDate.setMonth(parseInt(e.target.value));
            render();
        };
    }

    // 5. Calendar Navigation Arrows
    document.getElementById('prevMonth').onclick = () => {
        state.viewDate.setMonth(state.viewDate.getMonth() - 1);
        render();
    };

    document.getElementById('nextMonth').onclick = () => {
        state.viewDate.setMonth(state.viewDate.getMonth() + 1);
        render();
    };

    document.getElementById('todayBtn').onclick = () => {
        state.selectedDate = new Date();
        state.viewDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1);
        render();
    };
}

/**
 * Renders the Cultural Hub with localized Month/Year headers.
 */
export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    
    // Localization for the Hub Header
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    
    const displayMonthName = state.isPolish ? monthNamesPl[monthIndex] : monthNamesEn[monthIndex];
    const monthInfo = culturalData.months[monthIndex] || { pl: "Month", derivation: "N/A", season: "N/A" };
    const holidays = holidayData.getHolidaysForYear(year);

    let html = `
        <div class="culture-page">
            <header class="culture-header">
                <h1>${displayMonthName} ${year}</h1>
                <span class="season-label">Season: ${monthInfo.season}</span>
            </header>

            <section class="info-block">
                <h3>📜 ${state.isPolish ? 'Znaczenie nazwy' : 'Name Meaning & History'}</h3>
                <p>${monthInfo.derivation}</p>
            </section>

            <section class="info-block">
                <h3>🎈 ${state.isPolish ? 'Święta i tradycje' : 'Holidays & Traditions'}</h3>
                <div class="holiday-list">`;

    let foundHoliday = false;
    Object.entries(holidays).forEach(([key, name]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            const day = key.split('-')[1]; 
            const explanation = culturalData.holidayExplanations[key] || "";
            
            html += `
                <div class="holiday-entry">
                    <div class="holiday-date">${day} ${monthInfo.pl}</div>
                    <strong>${name}</strong>
                    <p>${explanation}</p>
                </div>`;
            foundHoliday = true;
        }
    });

    if (!foundHoliday) {
        html += `<p class="no-data">${state.isPolish ? 'Brak świąt w tym miesiącu.' : 'No major holidays listed for this month.'}</p>`;
    }

    html += `
                </div>
            </section>
            <button onclick="document.getElementById('navCalendar').click()" class="close-culture-btn">
                ← ${state.isPolish ? 'Powrót' : 'Back to Calendar'}
            </button>
        </div>`;
    
    hub.innerHTML = html;
}

/**
 * Renders the Grammar Rules page dynamically from rules.js.
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
    
    page.innerHTML = html + ` <button onclick="document.getElementById('navCalendar').click()" class="close-culture-btn">← Back</button></div>`;
}
