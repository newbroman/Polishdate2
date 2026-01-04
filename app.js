import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';
import { hideAllSections, setActiveNav } from './navigation.js';
import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';

// --- 1. APP STATE ---
let viewDate = new Date(); 
let selectedDate = new Date(); 
let interfaceLang = 'PL'; 
let includeYear = true; 

// --- 2. CORE RENDER FUNCTION ---
// This function synchronizes the calendar, the phrase panel, and the selectors.
function render() {
    // Update Rollers to match viewDate
    document.getElementById('monthRoller').value = viewDate.getMonth();
    document.getElementById('yearRoller').value = viewDate.getFullYear();

    // Render the grid (Logic from calendar-core.js)
    renderCalendarGrid(viewDate, selectedDate, (clickedDate) => {
        selectedDate = clickedDate;
        render(); // Re-render to update selection highlights and info panel
    });

    // Update the Polish phrase and phonetics (Logic from ui-renderer.js)
    updateInfoPanel(selectedDate, includeYear);

    // Update the button text (Include Year)
    document.getElementById('repeatYearBtn').innerText = `Include Year: ${includeYear ? 'ON' : 'OFF'}`;
}

// --- 3. NAVIGATION LOGIC ---

// Calendar View
document.getElementById('navCalendar').onclick = () => {
    hideAllSections();
    document.getElementById('calendarSection').style.display = 'block';
    document.querySelector('.info-panel').style.display = 'block';
    setActiveNav('navCalendar');
    render();
};

// Culture Hub (Order: Days -> Months -> Holidays with Dates)
document.getElementById('navCulture').onclick = () => {
    hideAllSections();
    const hub = document.getElementById('culturalHub');
    hub.style.display = 'block';
    setActiveNav('navCulture');

    const year = selectedDate.getFullYear();
    const holidays = holidayData.getHolidaysForYear(year);

    hub.innerHTML = `
        <div class="culture-wrap">
            <h2>📅 Days of the Week</h2>
            <div class="culture-grid">
                ${Object.entries(culturalData.days).map(([en, pl]) => `
                    <div class="culture-item"><strong>${pl}</strong> (${en})</div>
                `).join('')}
            </div>
            
            <h2>🌙 Months & Etymology</h2>
            <div class="culture-list">
                ${Object.values(culturalData.months).map(m => `
                    <p><strong>${m.pl}</strong>: ${m.derivation}</p>
                `).join('')}
            </div>

            <h2>🎈 Holidays in ${year}</h2>
            <div class="holiday-section">
                ${Object.entries(holidays).map(([dateKey, holidayInfo]) => {
                    const [m, d] = dateKey.split('-').map(Number);
                    const dateStr = new Date(year, m, d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
                    const name = typeof holidayInfo === 'object' ? holidayInfo.pl : holidayInfo;
                    const desc = culturalData.holidayExplanations[dateKey] || "Dzień świąteczny.";
                    
                    return `
                        <div class="holiday-card">
                            <div class="holiday-date">${dateStr}</div>
                            <strong>${name}</strong>
                            <p><small>${desc}</small></p>
                        </div>`;
                }).join('')}
            </div>
        </div>
    `;
};

// Grammar Rules Page
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

// --- 4. CONTROLS & LISTENERS ---

// Today Button
document.getElementById('todayBtn').onclick = () => {
    selectedDate = new Date();
    viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    document.getElementById('navCalendar').click(); // Switch back to calendar view
};

// Include Year Toggle
document.getElementById('repeatYearBtn').onclick = () => {
    includeYear = !includeYear;
    render();
};

// Month & Year Selectors
document.getElementById('monthRoller').onchange = (e) => {
    viewDate.setMonth(parseInt(e.target.value));
    render();
};

document.getElementById('yearRoller').onchange = (e) => {
    viewDate.setFullYear(parseInt(e.target.value));
    render();
};

// Arrow Navigation
document.getElementById('prevMonth').onclick = () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    render();
};

document.getElementById('nextMonth').onclick = () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    render();
};

// Language Toggle (Month Names in Roller)
document.getElementById('langToggle').onclick = () => {
    interfaceLang = (interfaceLang === 'PL') ? 'EN' : 'PL';
    const mR = document.getElementById('monthRoller');
    const currentVal = mR.value;
    mR.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const label = (interfaceLang === 'EN') 
            ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i))
            : culturalData.months[i].pl;
        mR.add(new Option(label, i));
    }
    mR.value = currentVal;
    render();
};

// Text-to-Speech
document.getElementById('playBtn').onclick = () => {
    window.speechSynthesis.cancel();
    const text = document.getElementById('plPhrase').innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    window.speechSynthesis.speak(utterance);
};

// --- 5. INITIALIZATION ---
window.onload = () => {
    // Populate Selectors
    const mR = document.getElementById('monthRoller');
    for (let i = 0; i < 12; i++) {
        mR.add(new Option(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i)), i));
    }

    const yR = document.getElementById('yearRoller');
    for (let i = 2020; i <= 2030; i++) {
        yR.add(new Option(i, i));
    }

    render();
};
