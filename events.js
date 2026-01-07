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

// ... Keep your renderCulturalHub and renderRulesPage functions exactly as they are ...
