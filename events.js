/**
 * events.js - Fixed Integration
 */
import { speakText, unlockAudio, checkVoices } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';
import { getRulesHTML } from './rules.js';

export function setupListeners(state, render) {
    
    // --- 1. Audio and Logic Toggles ---
    const triggerAudioUnlock = () => {
        import('./audio.js').then(m => m.unlockAudio());
        document.removeEventListener('touchstart', triggerAudioUnlock);
        document.removeEventListener('click', triggerAudioUnlock);
    };
    document.addEventListener('touchstart', triggerAudioUnlock);
    document.addEventListener('click', triggerAudioUnlock);
    
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
            const plPhraseElement = document.getElementById('plPhrase');
            if (plPhraseElement) {
                const textToSpeak = plPhraseElement.innerText;
                if (textToSpeak && !textToSpeak.includes("Wybierz")) {
                    unlockAudio(); 
                    speakText(textToSpeak);
                }
            }
        };
    }

  
    // --- Formal/Informal Toggle Logic ---
    const meetingBtn = document.getElementById('meetingToggle');
if (meetingBtn) {
    meetingBtn.onclick = () => {
        // Just flip the switch and let render() update the labels
        state.isFormal = !state.isFormal;
        render(); 
    };
}

    // --- 2. Navigation Logic ---
    const showSection = (id) => {
        window.scrollTo(0, 0); 
        const sections = {
            'calendar': document.getElementById('calendarSection'),
            'culture': document.getElementById('culturalHub'),
            'rules': document.getElementById('rulesPage')
        };
        const infoPanel = document.querySelector('.info-panel');

        Object.values(sections).forEach(s => { 
            if (s) s.style.setProperty('display', 'none', 'important'); 
        });

        const activeSection = sections[id];
        if (activeSection) {
            const displayType = (id === 'calendar') ? 'flex' : 'block';
            activeSection.style.setProperty('display', displayType, 'important');
            
            if (id !== 'calendar') {
                activeSection.classList.add('content-page');
            }
        }

        if (infoPanel) {
            infoPanel.style.setProperty('display', id === 'calendar' ? 'flex' : 'none', 'important');
        }

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
} // <--- CORRECTLY CLOSES setupListeners

/**
 * Renders the Cultural Hub
 */
export function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();
    const monthInfo = culturalData.months[monthIndex] || { pl: "Miesiąc", derivation: "N/A", season: "N/A" };
    const holidays = holidayData.getHolidaysForYear(year);
    const displayMonth = monthInfo.pl.charAt(0).toUpperCase() + monthInfo.pl.slice(1);
    
    let html = `
    <div class="content-body">
        <header class="content-header">
            <h1>${displayMonth} ${year}</h1>
            <div class="season-box">
                <span class="season-icon">${getSeasonIcon(monthInfo.season)}</span>
                <strong>${state.isPolish ? 'Pora roku' : 'Season'}:</strong> 
                <span class="season-text">${monthInfo.season}</span>
            </div>
        </header>
        <section class="info-block">
            <h3>📜 ${state.isPolish ? 'Etymologia' : 'Etymology'}</h3>
            <p class="derivation-text">${monthInfo.derivation}</p>
        </section>
        <section class="info-block">
            <h3>📅 ${state.isPolish ? 'Znaczenie dzisiejszego dnia' : 'Meaning of Today'}</h3>
            <div class="culture-grid-mini">
                ${(() => {
                    const todayIndex = new Date().getDay();
                    const day = culturalData.days[todayIndex];
                    return `
                        <div class="day-meaning-card" style="padding: 15px; border: 2px solid var(--accent-color); border-radius: 8px; background: rgba(128,128,128,0.05);">
                            <strong style="font-size: 1.1rem; color: var(--accent-color);">${day.pl}:</strong> 
                            <span style="font-size: 1rem;">${day.meaning}</span>
                        </div>
                    `;
                })()}
            </div>
        </section>
        <section class="info-block">
            <h3>🎈 ${state.isPolish ? 'Wydarzenia i Święta' : 'Holidays & Traditions'}</h3>
            <div class="holiday-list">`;

    let foundHoliday = false;
    Object.entries(holidays).forEach(([key, holidayName]) => {
        if (key.startsWith(`${monthIndex}-`)) {
            const dayNum = key.split('-')[1];
           const description = culturalData.holidayExplanations[key] || culturalData.holidayExplanations[holidayName] || "";
            html += `
            <div class="holiday-entry">
                <div class="holiday-title"><strong>${dayNum} ${monthInfo.pl}:</strong> ${holidayName}</div>
                ${description ? `<p class="holiday-desc">${description}</p>` : ''}
            </div>`;
        foundHoliday = true;
    }
    });

    if (!foundHoliday) {
        html += `<p class="no-data">${state.isPolish ? 'Brak głównych świąt w tym miesiącu.' : 'No major holidays this month.'}</p>`;
    }

    html += `</div></section>
            <div class="nav-actions">
                <button class="pill-btn back-to-cal">← ${state.isPolish ? 'Powrót' : 'Back to Calendar'}</button>
            </div>
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

function getSeasonIcon(season) {
    if (season.includes("Wiosna")) return "🌱";
    if (season.includes("Lato")) return "☀️";
    if (season.includes("Jesień")) return "🍂";
    if (season.includes("Zima")) return "❄️";
    return "📅";
}
