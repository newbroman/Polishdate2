/**
 * app.js - Final Integration
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
    isPolish: false 
    isMeetingMode: false // New property
};

// 2. Main Render Function
function render() {
    const grid = document.getElementById('calendarGrid');
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const weekdayContainer = document.querySelector('.weekdays');
    
    if (!grid) return; // Safety check

    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    const meetingBtn = document.getElementById('meetingToggle');
    if (meetingBtn) {
    const label = state.isPolish ? "Spotkanie" : "Meeting";
    const status = state.isMeetingMode ? "ON" : "OFF";
    meetingBtn.innerText = `${label}: ${status}`;
}

// Update the call to updateInfoPanel
try {
        updateInfoPanel(state.selectedDate, state.includeYear, state.isMeetingMode);
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

    // --- BUTTON TRANSLATIONS ---
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

    try {
        updateInfoPanel(state.selectedDate, state.includeYear);
    } catch (e) { console.error("Info Panel Error:", e); }
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

    // Create Blank Spacers
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

    // Generate Actual Days
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
    // 1. Setup Listeners first so the button is ready for state changes
    setupListeners(state, render);
    
    // 2. Check voices with a callback that forces a UI update
    checkVoices((ready) => {
        console.log("Polish voices ready:", ready);
        render(); // This will flip the button from "Loading" to "Listen"
    });
    
    // 3. Initial draw
    render();
};

// 5. Watch for System Theme Changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
