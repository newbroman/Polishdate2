import { speakPolish } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';

export function setupListeners(state, render) {
    // 1. Audio Button (Matches id="playBtn" in HTML)
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && !textToSpeak.includes('...')) {
                speakPolish(textToSpeak);
            }
        };
    }

    // 2. Year Toggle (Matches id="repeatYearBtn" in HTML)
    const yearBtn = document.getElementById('repeatYearBtn');
    if (yearBtn) {
        yearBtn.onclick = () => {
            state.includeYear = !state.includeYear;
            yearBtn.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
            render();
        };
    }

    // 3. Navigation
    document.getElementById('navCalendar').onclick = () => {
        document.getElementById('calendarSection').style.display = 'block';
        document.getElementById('culturalHub').style.display = 'none';
        render();
    };

    document.getElementById('navCulture').onclick = () => {
        document.getElementById('calendarSection').style.display = 'none';
        document.getElementById('culturalHub').style.display = 'block';
        renderCulturalHub(state);
    };

    // 4. Calendar Controls
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

    // 5. Dropdowns
    document.getElementById('monthRoller').onchange = (e) => {
        state.viewDate.setMonth(parseInt(e.target.value));
        render();
    };

    document.getElementById('yearRoller').onchange = (e) => {
        state.viewDate.setFullYear(parseInt(e.target.value));
        render();
    };
}

function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const year = state.viewDate.getFullYear();
    const holidays = holidayData.getHolidaysForYear(year);
    let html = `<div class="culture-wrap"><h2>🎈 Holidays in ${year}</h2>`;
    Object.entries(holidays).forEach(([key, name]) => {
        html += `<div class="holiday-card"><strong>${name}</strong><br><small>${culturalData.holidayExplanations[key] || ""}</small></div>`;
    });
    hub.innerHTML = html + `</div>`;
}
