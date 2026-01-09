/**
 * events.js - Final Integration with Alignment Fix
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

    // --- Formal/Informal Toggle ---
    const meetingBtn = document.getElementById('meetingToggle');
    if (meetingBtn) {
        meetingBtn.onclick = () => {
            state.isFormal = !state.isFormal;
            render(); 
        };
    }

    // --- 2. Navigation Logic (Overriding CSS !important) ---
    const showSection = (id) => {
        const sections = {
            'calendar': document.getElementById('calendarSection'),
            'culture': document.getElementById('culturalHub'),
            'rules': document.getElementById('rulesPage')
        };
        const infoPanel = document.querySelector('.info-panel');

        // Hide all sections using !important override
        Object.values(sections).forEach(s => { 
            if (s) s.style.setProperty('display', 'none', 'important'); 
        });

        // Show the specific section
        const activeSection = sections[id];
        if (activeSection) {
            const displayType = (id === 'calendar') ? 'flex' : 'block';
            activeSection.style.setProperty('display', displayType, 'important');
            
            if (id !== 'calendar') {
                activeSection.classList.add('content-page');
            }
        }

        // Toggle the Info Panel (Footer)
        if (infoPanel) {
            if (id === 'calendar') {
                infoPanel.style.setProperty('display', 'flex', 'important');
            } else {
                infoPanel.style.setProperty('display', 'none', 'important');
            }
        }

        // Update Nav Icon visual state
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
 * Renders the Cultural Hub
 */
export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    const monthInfo = culturalData.months[monthIndex] || { pl: "Miesiąc", derivation: "N/A", season: "N/A" };
    const holidays = holidayData.getHolidaysForYear(year);

    let html = `
        <div class="content-body">
            <header class="content-header">
                <h1>${state.isPolish ? monthInfo.pl : (culturalData.months[monthIndex].en || "Month")} ${year}</h1>
                <p><strong>Season:</strong> ${monthInfo.season}</p>
            </header>
            <section class="info-block">
                <h3>📜 ${state.isPolish ? 'Historia nazwy' : 'Etymology'}</h3>
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

    if (!foundHoliday) html += `<p>${state.isPolish ? 'Brak świąt.' : 'No major holidays.'}</p>`;

    html += `</div></section>
            <button class="pill-btn back-to-cal" style="margin-top:20px">← Back</button>
        </div>`;

    hub.innerHTML = html;
    hub.querySelector('.back-to-cal').onclick = () => document.getElementById('navCalendar').click();
}

/**
 * Renders the Grammar Rules page
 */
export function renderRulesPage(state) {
    const page = document.getElementById('rulesPage');
    if (!page) return;
    
    page.innerHTML = `
        <div class="content-body">
            ${getRulesHTML()}
            <div style="text-align:center;">
                <button class="pill-btn back-to-cal" style="margin-top:20px">← Back to Calendar</button>
            </div>
        </div>`;

    page.querySelector('.back-to-cal').onclick = () => document.getElementById('navCalendar').click();
}
