import { speakPolish, checkVoices } from './audio.js'; 
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

export function setupListeners(state, render) {
    
    // --- 1. Audio and Logic Toggles ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        // This was likely the crash point because checkVoices was undefined
        playBtn.disabled = true;
        playBtn.innerText = "⌛ Loading...";
        playBtn.style.opacity = "0.5";

        checkVoices((ready) => {
            if (ready) {
                playBtn.disabled = false;
                playBtn.innerText = "🔊 Listen";
                playBtn.style.opacity = "1";
            }
        });

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

    // --- 2. Language Toggle ---
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.onclick = () => {
            state.isPolish = !state.isPolish;
            langToggle.innerText = state.isPolish ? "PL" : "EN";
            render(); 
        };
    }

    // --- 3. Section Navigation (Switching Views) ---
    const navCal = document.getElementById('navCalendar');
    const navCult = document.getElementById('navCulture');
    const navRul = document.getElementById('navRules');

    const showSection = (id) => {
        document.getElementById('calendarSection').style.display = id === 'calendar' ? 'block' : 'none';
        document.getElementById('culturalHub').style.display = id === 'culture' ? 'block' : 'none';
        document.getElementById('rulesPage').style.display = id === 'rules' ? 'block' : 'none';
    };

    if (navCal) {
        navCal.onclick = () => {
            showSection('calendar');
            render();
        };
    }

    if (navCult) {
        navCult.onclick = () => {
            showSection('culture');
            renderCulturalHub(state); 
        };
    }

    if (navRul) {
        navRul.onclick = () => {
            showSection('rules');
            renderRulesPage();
        };
    }

    // --- 4. Calendar Date/Month/Year Controls ---
    
    // Year Input
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

    // Month Dropdown
    const monthRoller = document.getElementById('monthRoller');
    if (monthRoller) {
        monthRoller.onchange = (e) => {
            state.viewDate.setMonth(parseInt(e.target.value));
            render();
        };
    }

    // Navigation Arrows (Matching your circular arrows)
    const prevBtn = document.getElementById('prevMonth');
    if (prevBtn) {
        prevBtn.onclick = () => {
            state.viewDate.setMonth(state.viewDate.getMonth() - 1);
            render();
        };
    }

    const nextBtn = document.getElementById('nextMonth');
    if (nextBtn) {
        nextBtn.onclick = () => {
            state.viewDate.setMonth(state.viewDate.getMonth() + 1);
            render();
        };
    }

    // NOTE: Today Button logic removed as requested. 
    // Startup defaults to today in app.js state.
}

/**
 * Renders the Cultural Hub
 */
export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    const selectedDay = state.selectedDate.getDate();
    const dayOfWeekIndex = state.selectedDate.getDay(); // 0 (Sun) to 6 (Sat)
    
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    
    const displayMonthName = state.isPolish ? monthNamesPl[monthIndex] : monthNamesEn[monthIndex];
    const monthInfo = culturalData.months[monthIndex] || { pl: "Month", derivation: "N/A", season: "N/A" };
    const dayInfo = culturalData.days[dayOfWeekIndex] || { pl: "Day", meaning: "N/A" };
    
    // We get the holidays for the current view year to handle moveable dates like Fat Thursday
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

    html += `
                </div>
            </section>
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

    // Attach listener to the newly created back button
    document.getElementById('backToCalRules').onclick = () => {
        document.getElementById('navCalendar').click();
    };
}
