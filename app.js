/**
 * app.js - Main Orchestrator
 * Coordinates navigation, calendar rendering, and UI updates.
 */
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';
import phonetics from './phonetics.js';
import yearData from './year.js';
import { getWrittenDay } from './numbers.js';
import { hideAllSections, setActiveNav } from './navigation.js';
import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';

// --- APP STATE ---
let viewDate = new Date();     // Currently viewed month/year
let selectedDate = new Date(); // Currently selected day
let includeYear = true;        // Toggle for phrase generation

// --- MASTER RENDER ---
// This function synchronizes all modules when the state changes
function render() {
    // 1. Sync the Dropdown Selectors
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    if (mR) mR.value = viewDate.getMonth();
    if (yR) yR.value = viewDate.getFullYear();

    // 2. Render the Calendar Grid (Logic from calendar-core.js)
    renderCalendarGrid(viewDate, selectedDate, (clickedDate) => {
        selectedDate = clickedDate;
        render(); // Re-render to update the highlight and info panel
    });

    // 3. Update the Bottom Phrase Panel (Logic from ui-renderer.js)
    updateInfoPanel(selectedDate, includeYear);
    
    // 4. Update Toggle Button Text
    document.getElementById('repeatYearBtn').innerText = `Include Year: ${includeYear ? 'ON' : 'OFF'}`;
}

// --- NAVIGATION HANDLERS ---

// Calendar View
document.getElementById('navCalendar').onclick = () => {
    hideAllSections();
    document.getElementById('calendarSection').style.display = 'block';
    document.querySelector('.info-panel').style.display = 'block';
    setActiveNav('navCalendar');
    render();
};

// Culture & Holidays View
document.getElementById('navCulture').onclick = () => {
    hideAllSections();
    const hub = document.getElementById('culturalHub');
    hub.style.display = 'block';
    setActiveNav('navCulture');

    const year = selectedDate.getFullYear();
    const holidays = holidayData.getHolidaysForYear(year);

    hub.innerHTML = `
        <div class="culture-wrap">
            <h2>🎈 Holidays in ${year}</h2>
            ${Object.entries(holidays).map(([key, holidayName]) => {
                const dateParts = key.split('-');
                const dateStr = new Date(year, parseInt(dateParts[0]), parseInt(dateParts[1]))
                    .toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
                
                return `
                    <div class="holiday-card">
                        <div class="holiday-date">${dateStr}</div>
                        <strong>${holidayName}</strong>
                        <p><small>${culturalData.holidayExplanations[key] || "National holiday."}</small></p>
                    </div>`;
            }).join('')}
        </div>
    `;
};

// Grammar Rules View
document.getElementById('navRules').onclick = () => {
    hideAllSections();
    const rulesDiv = document.getElementById('rulesPage');
    rulesDiv.style.display = 'block';
    setActiveNav('navRules');

    rulesDiv.innerHTML = `
        <div class="culture-wrap">
            <h2>📖 Grammar Rules</h2>
            <div class="rules-card">
                <h3>${grammarRules.genitive.title}</h3>
                <p>${grammarRules.genitive.explanation}</p>
                <p><em>${grammarRules.genitive.rule}</em></p>
            </div>
            <div class="rules-card">
                <h3>${grammarRules.years.title}</h3>
                <p>${grammarRules.years.explanation}</p>
                <p><strong>Example:</strong> ${grammarRules.years.example}</p>
            </div>
        </div>
    `;
};

// --- CONTROL LISTENERS ---

// Today Button
document.getElementById('todayBtn').onclick = () => {
    selectedDate = new Date();
    viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    document.getElementById('navCalendar').click();
};

// Navigation Arrows
document.getElementById('prevMonth').onclick = () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    render();
};
document.getElementById('nextMonth').onclick = () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    render();
};

// Text-to-Speech
document.getElementById('playBtn').onclick = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(document.getElementById('plPhrase').innerText);
    utterance.lang = 'pl-PL';
    window.speechSynthesis.speak(utterance);
};

// Year Toggle
document.getElementById('repeatYearBtn').onclick = () => {
    includeYear = !includeYear;
    render();
};

// --- INITIALIZATION ---
window.onload = () => {
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');

    // Populate Months
    for (let i = 0; i < 12; i++) {
        const label = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i));
        mR.add(new Option(label, i));
    }

    // Populate Years
    for (let i = 2020; i <= 2035; i++) {
        yR.add(new Option(i, i));
    }

    // Selector Change Listeners
    mR.onchange = (e) => {
        viewDate.setMonth(parseInt(e.target.value));
        render();
    };
    yR.onchange = (e) => {
        viewDate.setFullYear(parseInt(e.target.value));
        render();
    };

    // Initial render
    render();
};
