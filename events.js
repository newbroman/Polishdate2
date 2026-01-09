/**
 * events.js - Final Polish
 */
import { speakText, checkVoices } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import { getRulesHTML } from './rules.js';

export function setupListeners(state, render) {
    
    // --- 1. Audio and Logic Toggles ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        checkVoices((ready) => {
            if (ready) {
                playBtn.disabled = false;
                playBtn.style.opacity = "1";
                render(); 
            }
        });

        playBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            if (textToSpeak && !textToSpeak.includes("Wybierz") && !textToSpeak.includes("Select")) {
                speakText(textToSpeak);
            }
        };
    }

    // --- Formal/Informal Toggle (Fixed Logic) ---
    const meetingBtn = document.getElementById('meetingToggle');
    if (meetingBtn) {
        meetingBtn.onclick = () => {
            state.isFormal = !state.isFormal;
            // Force re-render handles text and class names via app.js logic
            render(); 
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
        Object.values(sections).forEach(s => { if (s) s.style.display = 'none'; });

        // Show selected
        if (id === 'calendar') {
            if (sections['calendar']) sections['calendar'].style.display = 'flex'; 
            if (infoPanel) infoPanel.style.display = 'flex';
        } else {
            if (sections[id]) {
                sections[id].style.display = 'block';
                // Add the content-page class if missing to fix formatting
                sections[id].classList.add('content-page');
            }
            if (infoPanel) infoPanel.style.display = 'none';
        }

        // Active state for icons
        document.querySelectorAll('.nav-icon-btn').forEach(b => {
            b.classList.toggle('active', b.id === `nav${id.charAt(0).toUpperCase() + id.slice(1)}`);
        });
    };

    // --- 3. Click Listeners ---
    document.getElementById('navCalendar').onclick = () => {
        showSection('calendar');
        render(); // Re-render to ensure grid alignment and gold/red highlights
    };

    document.getElementById('navCulture').onclick = () => {
        showSection('culture');
        renderCulturalHub(state); 
    };

    document.getElementById('navRules').onclick = () => {
        showSection('rules');
        renderRulesPage(state);
    };

    // Calendar Controls
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

    document.getElementById('repeatYearBtn').onclick = () => {
        state.includeYear = !state.includeYear;
        render(); 
    };
} 

/**
 * Renders the Cultural Hub with proper formatting
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
        <div class="content-body">
            <header class="culture-header">
                <h1>${displayMonthName} ${year}</h1>
                <p><strong>Season:</strong> ${monthInfo.season}</p>
            </header>
            <section class="info-block">
                <h3>📅 ${state.isPolish ? 'Dzień tygodnia' : 'Day of the Week'}</h3>
                <p><strong>${dayInfo.pl}:</strong> ${dayInfo.meaning}</p>
            </section>
            <section class="info-block">
                <h3>📜 ${state.isPolish ? 'Znaczenie nazwy' : 'History'}</h3>
                <p>${monthInfo.derivation}</p>
            </section>
            <section class="info-block">
                <h3>🎈 ${state.isPolish ? 'Święta' : 'Holidays'}</h3>
                <div class="holiday-list">`;

    let foundHoliday = false;
    Object.entries(holidays).forEach(([key, name]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            const dayNum = key.split('-')[1]; 
            html += `<div class="holiday-entry"><strong>${dayNum} ${monthInfo.pl}:</strong> ${name}</div>`;
            foundHoliday = true;
        }
    });

    if (!foundHoliday) html += `<p>${state.isPolish ? 'Brak świąt.' : 'No holidays.'}</p>`;

    html += `</div></section>
            <button class="pill-btn back-to-cal" style="margin-top:20px">← Back</button>
        </div>`;

    hub.innerHTML = html;
    hub.querySelector('.back-to-cal').onclick = () => document.getElementById('navCalendar').click();
}

/**
 * Renders the Grammar Rules page with clean formatting
 */
export function renderRulesPage(state) {
    const page = document.getElementById('rulesPage');
    if (!page) return;
    
    page.innerHTML = `
        <div class="content-body">
            ${getRulesHTML()}
            <button class="pill-btn back-to-cal" style="margin-top:20px">← Back</button>
        </div>`;

    page.querySelector('.back-to-cal').onclick = () => document.getElementById('navCalendar').click();
}
