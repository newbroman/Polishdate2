/**
 * app.js - Final Integration Fixed
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';
import { checkVoices } from './audio.js';

// 1. Initialize Global State
const state = { 
    viewDate: new Date(),    
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false,
    isFormal: true // Now starts as Formal (Genitive)
};

// 2. Main Render Function
function render() {
    const grid = document.getElementById('calendarGrid');
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const weekdayContainer = document.querySelector('.weekdays');
    
    if (!grid) return;

    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

 // Update Formal/Informal Toggle Button
const meetingBtn = document.getElementById('meetingToggle');
if (meetingBtn) {
    // Labels adapt to the language toggle (PL/EN)
    const label = state.isPolish ? "Tryb" : "Mode";
    
    // Status reflects our new Formal/Informal logic
    const status = state.isFormal ? 
        (state.isPolish ? "Formalny" : "Formal") : 
        (state.isPolish ? "Informalny" : "Informal");

    meetingBtn.innerText = `📅 ${label}: ${status}`;
    
    // Sync the CSS classes so the button color matches the mode
    meetingBtn.className = `pill-btn ${state.isFormal ? 'mode-btn-formal' : 'mode-btn-informal'}`;
}

    // --- UPDATED: Passing all 3 arguments to the panel ---
    try {
         updateInfoPanel(state.selectedDate, state.includeYear, state.isFormal);
    } catch (e) { 
        console.error("Info Panel Error:", e); 
    }
    
    // Seasonal Themes
    document.body.className = ''; 
    const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    document.body.classList.add(seasons[monthIndex]);

    // Update Month Dropdown
    if (mRoller) {
        const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        const names = state.isPolish ? monthNamesPl : monthNamesEn;
        
        mRoller.innerHTML = names.map((name, i) => 
            `<option value="${i}" ${i === monthIndex ? 'selected' : ''}>${name}</option>`
        ).join('');
    }
    
    if (yInput) yInput.value = year;

    // Weekday Labels
    if (weekdayContainer) {
        const days = state.isPolish ? ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdayContainer.innerHTML = days.map(d => `<span>${d}</span>`).join('');
    }

    // Button Translations
    const playBtn = document.getElementById('playBtn');
    const repeatYearBtn = document.getElementById('repeatYearBtn');

    if (playBtn) {
        if (!playBtn.innerText.includes("⌛")) {
            playBtn.innerText = state.isPolish ? "🔊 Słuchaj" : "🔊 Listen";
        }
    }

    if (repeatYearBtn) {
        const yearLabel = state.isPolish ? "Dodaj rok" : "Include Year";
        const status = state.includeYear ? "ON" : "OFF";
        repeatYearBtn.innerText = `${yearLabel}: ${status}`;
    }

    // Render the grid
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
        if (holidays[holidayKey]) {
            daySquare.classList.add('holiday');
            daySquare.title = holidays[holidayKey];
        }

        const isSelected = selectedDate && 
                           day === selectedDate.getDate() && 
                           month === selectedDate.getMonth() && 
                           year === selectedDate.getFullYear();
        
        if (isSelected) daySquare.classList.add('selected');

        const isToday = day === today.getDate() && 
                        month === today.getMonth() && 
                        year === today.getFullYear();
        
        if (isToday) daySquare.classList.add('today-highlight');

        daySquare.onclick = () => {
            const newSelected = new Date(year, month, day);
            onDateClick(newSelected);
        };

        grid.appendChild(daySquare);
    }
}

// 4. Initialize
window.onload = () => {
    setupListeners(state, render);
    checkVoices((ready) => {
        render(); 
    });
    render();
};

// 5. Watch for System Theme Changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
