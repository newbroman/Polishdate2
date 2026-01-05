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
    const yRoller = document.getElementById('yearRoller');

    // Force dropdowns to match the current viewDate
    if (mRoller) mRoller.value = state.viewDate.getMonth();
    if (yRoller) yRoller.value = state.viewDate.getFullYear();

    // Clear loading text
    const phrase = document.getElementById('plPhrase');
    if (phrase && phrase.innerText.includes('Wczytywanie')) phrase.innerText = "";

    // Draw the grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render();
    });

    // Update the Polish/English text
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
