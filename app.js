import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

/**
 * app.js
 * Main Entry Point - Orchestrates the State and Initial Boot
 */

// 1. Global State Object
const state = {
    viewDate: new Date(),
    selectedDate: new Date(),
    includeYear: true
};

// 2. Master Render Function
// This is called every time a button is clicked or a date is changed
function render() {
    // Sync the Dropdown Selectors
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    if (mR) mR.value = state.viewDate.getMonth();
    if (yR) yR.value = state.viewDate.getFullYear();

    // Render the Calendar Grid (Logic from calendar-core.js)
    renderCalendarGrid(state.viewDate, state.selectedDate, (clickedDate) => {
        state.selectedDate = clickedDate;
        render(); 
    });

    // Update the Bottom Phrase Panel (Logic from ui-renderer.js)
    updateInfoPanel(state.selectedDate, state.includeYear);
    
    // Update the Year Toggle Button Text
    const yearBtn = document.getElementById('repeatYearBtn');
    if (yearBtn) {
        yearBtn.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
    }
}

// 3. Ignition Switch (Window Load)
window.onload = () => {
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');

    // Populate Months Dropdown
    for (let i = 0; i < 12; i++) {
        const label = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i));
        mR.add(new Option(label, i));
    }

    // Populate Years Dropdown
    for (let i = 2020; i <= 2035; i++) {
        yR.add(new Option(i, i));
    }

    // Attach all click and change listeners (Logic from events.js)
    setupListeners(state, render);

    // Initial Render to remove the "Wczytywanie..." message
    render();
};
