import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

// Initialize state to "Today" instead of a fixed Jan 2024
const state = { 
    viewDate: new Date(), 
    selectedDate: new Date(), 
    includeYear: true 
};

function render() {
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput'); // Changed from yRoller
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    // 1. Force dropdown and Year Input to match viewDate
    if (mRoller) mRoller.value = monthIndex;
    if (yInput) yInput.value = year;

    // 2. Localize the Calendar Header (Month Year Display)
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    
    const displayMonth = state.isPolish ? monthNamesPl[monthIndex] : monthNamesEn[monthIndex];
    const headerDisplay = document.getElementById('currentMonthDisplay');
    if (headerDisplay) {
        headerDisplay.innerText = `${displayMonth} ${year}`;
    }

    // 3. Localize Weekday Labels (Sun, Mon... vs Nie, Pon...)
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysPl = ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"];
    const weekdayContainer = document.querySelector('.weekdays');
    
    if (weekdayContainer) {
        weekdayContainer.innerHTML = (state.isPolish ? daysPl : daysEn)
            .map(day => `<div>${day}</div>`).join('');
    }

    // 4. Clear loading text
    const phrase = document.getElementById('plPhrase');
    if (phrase && phrase.innerText.includes('Wczytywanie')) phrase.innerText = "";

    // 5. Draw the grid (Essential for the calendar to appear)
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); // Re-render when a new day is clicked
    });

    // 6. Update the Polish/Phonetic/English text panel
    updateInfoPanel(state.selectedDate, state.includeYear);
}
window.onload = () => {
    const monthRoller = document.getElementById('monthRoller');
    const yearRoller = document.getElementById('yearRoller');

    // Populate months with real names (Fixes "Test Month")
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    monthNames.forEach((name, index) => {
        monthRoller.add(new Option(name, index));
    });

    // Populate years 2024-2030
    for (let year = 2024; year <= 2030; year++) {
        yearRoller.add(new Option(year, year));
    }

    try {
        setupListeners(state, render);
        render(); // This first call sets the dropdowns to the current month/year
    } catch (e) {
        console.error("Startup failed:", e);
    }
};
