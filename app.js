/**
 * app.js - Main Application Controller
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';

// 1. Initialize Global State
const state = { 
    viewDate: new Date(),    // The month/year the user is currently looking at
    selectedDate: new Date(), // The specific day highlighted (defaults to today)
    includeYear: true,
    isPolish: false 
};

/**
 * Main render function to synchronize the UI with the state
 */
function render() {
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    // 1. Seasonal Theming Logic
    const body = document.body;
    body.classList.remove('spring', 'summer', 'autumn', 'winter');
    if (monthIndex >= 2 && monthIndex <= 4) body.classList.add('spring'); // Mar, Apr, May
    else if (monthIndex >= 5 && monthIndex <= 7) body.classList.add('summer'); // Jun, Jul, Aug
    else if (monthIndex >= 8 && monthIndex <= 10) body.classList.add('autumn'); // Sep, Oct, Nov
    else body.classList.add('winter'); // Dec, Jan, Feb

    // 2. Sync and Localize Month Dropdown
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    const monthNames = state.isPolish ? monthNamesPl : monthNamesEn;
    
    if (mRoller) {
        mRoller.innerHTML = ""; // Clear current options
        monthNames.forEach((name, index) => {
            const opt = new Option(name, index);
            if (index === monthIndex) opt.selected = true;
            mRoller.add(opt);
        });
    }

    // 3. Update Year Input
    if (yInput) yInput.value = year;

    // 4. Localize Weekday Labels
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysPl = ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"];
    const weekdayContainer = document.querySelector('.weekdays');
    
    if (weekdayContainer) {
        weekdayContainer.innerHTML = (state.isPolish ? daysPl : daysEn)
            .map(day => `<div>${day}</div>`).join('');
    }

    // 5. Draw Calendar Grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); // Re-render to update highlights and footer
    });

    // 6. Update Bottom Info Panel (Translations/Audio)
    updateInfoPanel(state.selectedDate, state.includeYear);
}

/**
 * Logic to build the 7-column calendar grid
 */
function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    // Get first day of month and total days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Fetch holidays for the current year
    const holidays = holidayData.getHolidaysForYear(year);

    // Create Spacers (Empty boxes before the 1st of the month)
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.classList.add('calendar-day', 'spacer');
        grid.appendChild(spacer);
    }

    // Create Day Squares
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('calendar-day');
        daySquare.innerText = day;

        // Holiday Check
        const holidayKey = `${month}-${day}`;
        if (holidays && holidays[holidayKey]) {
            daySquare.classList.add('holiday');
            daySquare.title = holidays[holidayKey]; 
        }

        // Selection Highlight
        if (selectedDate && day === selectedDate.getDate() && 
            month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add('selected');
        }

        // Real-world "Today" Highlight
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today-highlight');
        }

        // Click Handler
        daySquare.onclick = () => {
            const newSelectedDate = new Date(year, month, day);
            onDateClick(newSelectedDate);
        };
        
        grid.appendChild(daySquare);
    }
}

/**
 * App Startup
 */
window.onload = () => {
    try {
        setupListeners(state, render);
        render(); 
    } catch (e) {
        console.error("Critical Startup Error:", e);
    }
};
