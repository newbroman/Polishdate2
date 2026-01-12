/**
 * app.js - Final Integration Fixed
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';
import { checkVoices } from './audio.js';
import culturalData from './cultural.js';

// 1. Initialize Global State
const state = { 
    viewDate: new Date(),    
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false,
    isFormal: false
}

// 2. Main Render Function
function render() {
    const grid = document.getElementById('calendarGrid');
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const weekdayContainer = document.querySelector('.weekdays');
    const meetingBtn = document.getElementById('meetingToggle');
    const playBtn = document.getElementById('playBtn');
    const repeatYearBtn = document.getElementById('repeatYearBtn');
    
    if (!grid) return;

    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

   // 1. Update Mode Button
    if (meetingBtn) {
    // state.isFormal = false (Default) -> "Today is" (Naming Mode)
    // state.isFormal = true            -> "It's on" (Event Mode)
    
    const icon = state.isFormal ? "🎉" : "📅";
    
    const label = state.isFormal 
        ? (state.isPolish ? "To jest dnia" : "It's on") 
        : (state.isPolish ? "Dzisiaj jest" : "Today is");

    meetingBtn.innerText = `${icon} ${label}`;
    
    // Theme: Blue for Naming (Today is), Gold for Event (It's on)
    meetingBtn.className = `pill-btn ${state.isFormal ? 'mode-btn-event' : 'mode-btn-naming'}`;
}
    
    // 2. Update Info Panel
    try {
         updateInfoPanel(state.selectedDate, state.includeYear, state.isFormal, state.isPolish);
    } catch (e) { 
        console.error("Info Panel Error:", e); 
    }
    
    // 3. Seasonal Themes
    document.body.className = ''; 
    const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    document.body.classList.add(seasons[monthIndex]);

    // 4. Update Month Dropdown
    if (mRoller) {
        const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        const names = state.isPolish ? monthNamesPl : monthNamesEn;
        
        mRoller.innerHTML = names.map((name, i) => 
            `<option value="${i}" ${i === monthIndex ? 'selected' : ''}>${name}</option>`
        ).join('');
    }
    
    if (yInput) yInput.value = year;

    // 5. Weekday Labels
    if (weekdayContainer) {
        const days = state.isPolish ? ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdayContainer.innerHTML = days.map(d => `<span>${d}</span>`).join('');
    }

    // 6. Button Translations
    if (playBtn && !playBtn.innerText.includes("⌛")) {
        playBtn.innerText = state.isPolish ? "🔊 Słuchaj" : "🔊 Listen";
    }

   if (repeatYearBtn) {
    const yearLabel = state.isPolish ? "Rok" : "Year";
    
    // Translate the status based on the language
    let status;
    if (state.isPolish) {
        status = state.includeYear ? "WŁ" : "WYŁ"; // WŁ = Włączone (ON), WYŁ = Wyłączone (OFF)
    } else {
        status = state.includeYear ? "ON" : "OFF";
    }

    repeatYearBtn.innerText = `${yearLabel}: ${status}`;
}
    // 7. Render Calendar Grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); 
    });
}

// 3. Grid Drawing Logic
function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid'); 
    if (!grid) return;
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    const holidays = (holidayData && typeof holidayData.getHolidaysForYear === 'function') 
        ? holidayData.getHolidaysForYear(year) 
        : {};

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

     for (let day = 1; day <= lastDay; day++) {
    const daySquare = document.createElement('div');
    daySquare.className = 'calendar-day';
    daySquare.innerText = day;

    const holidayKey = `${month}-${day}`;
    const holidayName = holidays[holidayKey];

    // --- NEW LOGIC START ---
if (holidayName) {
        // Clean the name of emojis so "Mikołajki 🎅" becomes "Mikołajki"
        const cleanName = holidayName.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

        // Find the details in culturalData (by date key, clean name, or full name)
        const info = culturalData.holidayExplanations[holidayKey] || 
                     culturalData.holidayExplanations[cleanName] || 
                     culturalData.holidayExplanations[holidayName];

        if (info) {
            // Apply specific classes based on the type in cultural.js
            if (info.type === 'holiday') {
                daySquare.classList.add('is-holiday');
            } else if (info.type === 'tradition') {
                daySquare.classList.add('is-tradition');
            }
        }
    }
    // --- NEW LOGIC END ---

    const isToday = day === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear();
    if (isToday) daySquare.classList.add('today-highlight');

    const isSelected = selectedDate && 
                       day === selectedDate.getDate() && 
                       month === selectedDate.getMonth() && 
                       year === selectedDate.getFullYear();
    if (isSelected) daySquare.classList.add('selected');

    daySquare.onclick = () => {
        const newSelected = new Date(year, month, day);
        onDateClick(newSelected);
    };

    grid.appendChild(daySquare);
     }
}
// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupListeners(state, render);
    
    // Use requestAnimationFrame to ensure CSS is parsed 
    // before we start DOM manipulation to avoid forced layout errors
    requestAnimationFrame(() => {
        render();
    });

    // Check voices in the background
    checkVoices(() => render());

    if ('serviceWorker' in navigator) {
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload();
                refreshing = true;
            }
        });

        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('✅ Registered at:', reg.scope))
            .catch(err => console.log('❌ Failed:', err));
    }
});
// Keep these at the very bottom for debugging
window.render = render;
window.state = state;
window.renderCalendarGrid = renderCalendarGrid;
