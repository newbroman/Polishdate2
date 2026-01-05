import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

// 1. App State
const state = { 
    viewDate: new Date(), 
    selectedDate: new Date(), 
    includeYear: true 
};

// 2. Main Render Function
function render() {
    // Sync dropdowns so they don't say "Test Month"
    document.getElementById('monthRoller').value = state.viewDate.getMonth();
    document.getElementById('yearRoller').value = state.viewDate.getFullYear();

    // Clear placeholder "Wczytywanie..." text
    const phrase = document.getElementById('plPhrase');
    if (phrase && phrase.innerText.includes('Wczytywanie')) phrase.innerText = "";

    // Render the grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); // Re-render everything when a date is clicked
    });

    // Update the Polish/Phonetic/English text
    updateInfoPanel(state.selectedDate, state.includeYear);
}

// 3. Initial Setup on Page Load
window.onload = () => {
    const monthRoller = document.getElementById('monthRoller');
    const yearRoller = document.getElementById('yearRoller');

    // Populate Month Dropdown with real English names
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    monthNames.forEach((name, index) => {
        monthRoller.add(new Option(name, index));
    });

    // Populate Year Dropdown (2024 - 2030)
    for (let year = 2024; year <= 2030; year++) {
        yearRoller.add(new Option(year, year));
    }

    try {
        // Connect buttons (Today, Słuchaj, Arrows)
        setupListeners(state, render);
        // Perform first draw
        render();
    } catch (e) {
        console.error("Startup failed:", e);
    }
};
