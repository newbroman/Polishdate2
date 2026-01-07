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

    // Seasonal Themes
    document.body.className = ''; 
    const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    document.body.classList.add(seasons[monthIndex]);

    // Update Month Dropdown
    if (mRoller) {
        const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        const names = state.isPolish ? monthNamesPl : monthNamesEn;
        mRoller.innerHTML = names.map((name, i) => `<option value="${i}" ${i === monthIndex ? 'selected' : ''}>${name}</option>`).join('');
    }
    
    if (yInput) yInput.value = year;

    // Weekday Labels
    if (weekdayContainer) {
        const days = state.isPolish ? ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdayContainer.innerHTML = days.map(d => `<span>${d}</span>`).join('');
    }

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
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    // Ensure holidayData is loaded correctly
    const holidays = (holidayData && typeof holidayData.getHolidaysForYear === 'function') 
        ? holidayData.getHolidaysForYear(year) 
        : {};

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Spacers
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

    // Actual Days
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.className = 'calendar-day';
        daySquare.innerText = day;

        const holidayKey = `${month}-${day}`;
        if (holidays[holidayKey]) {
            daySquare.classList.add('holiday');
            daySquare.title = holidays[holidayKey]; // Shows holiday name on hover
        }

        if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add('selected');
        }

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today-highlight');
        }

        daySquare.onclick = () => onDateClick(new Date(year, month, day));
        grid.appendChild(daySquare);
    }
}

// 4. Initialize
window.onload = () => {
    // 1. Initialize Audio
    checkVoices((ready) => {
        console.log("Polish voices ready:", ready);
    });
    
    // 2. Setup Listeners
    setupListeners(state, render);
    
    // 3. Force two renders: one immediate and one after a short delay
    // This helps if the browser is still calculating Flexbox layout
    render();
    
    setTimeout(() => {
        console.log("Secondary render triggered to fix layout collapse");
        render();
    }, 100);
};

    // 4. Watch for System Theme Changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
};
