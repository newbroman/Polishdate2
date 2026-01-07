/**
 * events.js
 */
import { checkVoices, speakText } from './audio.js'; // Note the change to speakText
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import grammarRules from './rules.js';
import { hideAllSections } from './navigation.js'; // Use your navigation helper

export function setupListeners(state, render) {
    
    // --- 1. Audio Setup ---
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
                speakText(textToSpeak); // Call the clean audio engine
            }
        };
    }

    // --- 2. Toggles ---
    document.getElementById('repeatYearBtn')?.addEventListener('click', (e) => {
        state.includeYear = !state.includeYear;
        e.target.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
        render();
    });

    document.getElementById('langToggle')?.addEventListener('click', (e) => {
        state.isPolish = !state.isPolish;
        e.target.innerText = state.isPolish ? "PL" : "EN";
        render(); 
    });

    // --- 3. View Switching (Modified to use navigation.js logic) ---
    document.getElementById('navCalendar')?.addEventListener('click', () => {
        hideAllSections();
        document.getElementById('calendarSection').style.display = 'block';
        document.querySelector('.info-panel').style.display = 'block';
        render();
    });

    document.getElementById('navCulture')?.addEventListener('click', () => {
        hideAllSections();
        document.getElementById('culturalHub').style.display = 'block';
        renderCulturalHub(state); 
    });

    document.getElementById('navRules')?.addEventListener('click', () => {
        hideAllSections();
        document.getElementById('rulesPage').style.display = 'block';
        renderRulesPage();
    });

    // --- 4. Inputs ---
    document.getElementById('yearInput')?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 0 && val <= 3000) {
            state.viewDate.setFullYear(val);
            render(); 
        }
    });

    document.getElementById('monthRoller')?.addEventListener('change', (e) => {
        state.viewDate.setMonth(parseInt(e.target.value));
        render();
    });

    document.getElementById('prevMonth')?.addEventListener('click', () => {
        state.viewDate.setDate(1); 
        state.viewDate.setMonth(state.viewDate.getMonth() - 1);
        render();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        state.viewDate.setDate(1);
        state.viewDate.setMonth(state.viewDate.getMonth() + 1);
        render();
    });
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
