import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

// 1. Initialize state with a default language preference
const state = { 
    viewDate: new Date(), 
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false // Set to true if you want the app to start in Polish
};

/**
 * Main render function to synchronize the UI with the state
 */
function render() {
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const monthIndex = state.viewDate.getMonth();
    // --- Dynamic Seasonal Theming ---
    const body = document.body;
    // Remove any existing season classes
    body.classList.remove('spring', 'summer', 'autumn', 'winter');

    // Add the correct class based on month index (0 = Jan, 11 = Dec)
    if (monthIndex >= 2 && monthIndex <= 4) {
        body.classList.add('spring'); // Mar, Apr, May
    } else if (monthIndex >= 5 && monthIndex <= 7) {
        body.classList.add('summer'); // Jun, Jul, Aug
    } else if (monthIndex >= 8 && monthIndex <= 10) {
        body.classList.add('autumn'); // Sep, Oct, Nov
    } else {
        body.classList.add('winter'); // Dec, Jan, Feb
    }
    const year = state.viewDate.getFullYear();

    // Sync Rollers to state
    if (mRoller) mRoller.value = monthIndex;
    if (yInput) yInput.value = year;

    // Localize Calendar Header
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    
    const displayMonth = state.isPolish ? monthNamesPl[monthIndex] : monthNamesEn[monthIndex];
    const headerDisplay = document.getElementById('currentMonthDisplay');
    if (headerDisplay) {
        headerDisplay.innerText = `${displayMonth} ${year}`;
    }

    // Localize Weekday Labels
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysPl = ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"];
    const weekdayContainer = document.querySelector('.weekdays');
    
    if (weekdayContainer) {
        weekdayContainer.innerHTML = (state.isPolish ? daysPl : daysEn)
            .map(day => `<div>${day}</div>`).join('');
    }

    // Localize Buttons
    const todayBtn = document.getElementById('todayBtn');
    if (todayBtn) {
        todayBtn.innerText = state.isPolish ? "Dzisiaj" : "Today";
    }

    // Clear loading text
    const phrase = document.getElementById('plPhrase');
    if (phrase && phrase.innerText.includes('Wczytywanie')) phrase.innerText = "";

    // Draw Grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); 
    });

    // Update Bottom Panel
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
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const spacer = document.createElement('div');
        spacer.classList.add('calendar-day', 'spacer');
        grid.appendChild(spacer);
    }

    const today = new Date();
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('calendar-day');
        daySquare.innerText = day;

        if (selectedDate && day === selectedDate.getDate() && 
            month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add('selected');
        }

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today-highlight');
        }

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
    const monthRoller = document.getElementById('monthRoller');
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    if (monthRoller) {
        monthNames.forEach((name, index) => {
            monthRoller.add(new Option(name, index));
        });
    }

    try {
        setupListeners(state, render);
        render(); 
    } catch (e) {
        console.error("Startup failed:", e);
    }
};
