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
            // Calendar uses flex for centering; Culture/Rules use block
            const displayType = (id === 'calendar') ? 'flex' : 'block';
            activeSection.style.setProperty('display', displayType, 'important');
            
            // Apply formatting class for text-heavy pages
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
                <h1>${state.isPolish ? monthInfo.pl : culturalData.months[monthIndex].en} ${year}</h1>
                <p><strong>Season:</strong> ${monthInfo.season}</
