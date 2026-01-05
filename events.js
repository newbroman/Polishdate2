import { speakPolish } from './audio.js';
import holidayData from './holiday.js';
import culturalData from './cultural.js';

export function setupListeners(state, render) {
    // 1. Audio / Listen Button
    const listenBtn = document.querySelector('.listen-btn');
    if (listenBtn) {
        listenBtn.onclick = () => {
            const textToSpeak = document.getElementById('plPhrase').innerText;
            // Only speak if there is actual text (not "Loading...")
            if (textToSpeak && !textToSpeak.includes('...')) {
                speakPolish(textToSpeak);
            }
        };
    }

    // 2. Navigation Tabs (Calendar vs Cultural Hub)
    const navCalendar = document.getElementById('navCalendar');
    const navCulture = document.getElementById('navCulture');
    const calendarSection = document.getElementById('calendarSection');
    const culturalHub = document.getElementById('culturalHub');

    if (navCalendar && navCulture) {
        navCalendar.onclick = () => {
            calendarSection.style.display = 'block';
            culturalHub.style.display = 'none';
            render();
        };

        navCulture.onclick = () => {
            calendarSection.style.display = 'none';
            culturalHub.style.display = 'block';
            renderCulturalHub(state);
        };
    }

    // 3. Calendar Controls (Arrows & Today)
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

    // 4. Dropdowns (Month & Year)
    document.getElementById('monthRoller').onchange = (e) => {
        state.viewDate.setMonth(parseInt(e.target.value));
        render();
    };

    document.getElementById('yearRoller').onchange = (e) => {
        state.viewDate.setFullYear(parseInt(e.target.value));
        render();
    };
}

// Helper function to build the Cultural Hub view
function renderCulturalHub(state) {
    const hub = document.getElementById('culturalHub');
    const year = state.viewDate.getFullYear();
    const holidays = holidayData.getHolidaysForYear(year);
    
    let html = `<div class="culture-wrap"><h2>🎈 Holidays in ${year}</h2>`;
    
    Object.entries(holidays).forEach(([key, name]) => {
        const explanation = culturalData.holidayExplanations[key] || "National holiday.";
        html += `
            <div class="holiday-card">
                <strong>${name}</strong><br>
                <small>${explanation}</small>
            </div>`;
    });
    
    html += `</div>`;
    hub.innerHTML = html;
}
