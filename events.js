import { speakPolish } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

export function setupListeners(state, render) {
    // --- Audio and Logic Toggles ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && !textToSpeak.includes('...')) {
                speakPolish(textToSpeak);
            }
        };
    }

    const yearBtn = document.getElementById('repeatYearBtn');
    if (yearBtn) {
        yearBtn.onclick = () => {
            state.includeYear = !state.includeYear;
            yearBtn.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
            render();
        };
    }

    // --- Navigation Listeners ---
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
    
    // --- Calendar Arrows and Rollers ---
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

    document.getElementById('monthRoller').onchange = (e) => {
        state.viewDate.setMonth(parseInt(e.target.value));
        render();
    };

    document.getElementById('yearRoller').onchange = (e) => {
        state.viewDate.setFullYear(parseInt(e.target.value));
        render();
    };
}

export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    
    // Fetch data from your imported modules
    const monthInfo = culturalData.months[monthIndex] || { pl: "Month", derivation: "N/A", season: "N/A" };
    const holidays = holidayData.getHolidaysForYear(year);

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
                <h3>🎈 Holidays & Traditions</h3>
                <div class="holiday-list">`;

    let foundHoliday = false;
    Object.entries(holidays).forEach(([key, name]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            // FIX: Correctly extract the day from the "month-day" key format
            const day = key.split('-')[1]; 
            const explanation = culturalData.holidayExplanations[key] || "A significant Polish tradition.";
            
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
        html += `<p class="no-data">No major holidays listed for this month.</p>`;
    }

    html += `
                </div>
            </section>
            <button onclick="document.getElementById('navCalendar').click()" class="close-culture-btn">
                ← Back to Calendar
            </button>
        </div>`;
    
    hub.innerHTML = html;
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
    
    page.innerHTML = html + ` <button onclick="document.getElementById('navCalendar').click()" class="close-culture-btn">← Back</button></div>`;
}
