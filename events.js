import { hideAllSections, setActiveNav } from './navigation.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';

export function setupListeners(state, render) {
    // Navigation
    document.getElementById('navCalendar').onclick = () => {
        hideAllSections();
        document.getElementById('calendarSection').style.display = 'block';
        document.querySelector('.info-panel').style.display = 'block';
        setActiveNav('navCalendar');
        render();
    };

    document.getElementById('navCulture').onclick = () => {
        hideAllSections();
        const hub = document.getElementById('culturalHub');
        hub.style.display = 'block';
        setActiveNav('navCulture');
        const year = state.selectedDate.getFullYear();
        const holidays = holidayData.getHolidaysForYear(year);
        hub.innerHTML = `<div class="culture-wrap"><h2>🎈 Holidays in ${year}</h2>` + 
            Object.entries(holidays).map(([key, val]) => `
                <div class="holiday-card"><strong>${val}</strong><br>
                <small>${culturalData.holidayExplanations[key] || ""}</small></div>`).join('') + `</div>`;
    };

    // Arrows & Controls
    document.getElementById('prevMonth').onclick = () => { state.viewDate.setMonth(state.viewDate.getMonth() - 1); render(); };
    document.getElementById('nextMonth').onclick = () => { state.viewDate.setMonth(state.viewDate.getMonth() + 1); render(); };
    document.getElementById('todayBtn').onclick = () => { 
        state.selectedDate = new Date(); 
        state.viewDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1); 
        render(); 
    };

    // Dropdowns
    document.getElementById('monthRoller').onchange = (e) => { state.viewDate.setMonth(parseInt(e.target.value)); render(); };
    document.getElementById('yearRoller').onchange = (e) => { state.viewDate.setFullYear(parseInt(e.target.value)); render(); };
}
