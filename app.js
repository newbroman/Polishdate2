// app.js - Cache-Busting Version
import { renderCalendarGrid } from './calendar-core.js?v=999';
import { updateInfoPanel } from './ui-renderer.js?v=999';
import { setupListeners } from './events.js?v=999';

// 1. Initialize Global State
const state = { 
    viewDate: new Date(), 
    selectedDate: new Date(), 
    includeYear: true 
};

// 2. The Main Render Function
function render() {
    // Populate dropdowns to match state
    document.getElementById('monthRoller').value = state.viewDate.getMonth();
    document.getElementById('yearRoller').value = state.viewDate.getFullYear();

    // Render the actual calendar
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render();
    });

    // Update the side panel (holidays, grammar, etc.)
    updateInfoPanel(state.selectedDate, state.includeYear);
}

// 3. App Entry Point
window.onload = () => {
    const monthRoller = document.getElementById('monthRoller');
    const yearRoller = document.getElementById('yearRoller');

    // Populate Dropdowns once on start
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    monthNames.forEach((name, index) => {
        monthRoller.add(new Option(name, index));
    });

    for (let year = 2024; year <= 2030; year++) {
        yearRoller.add(new Option(year, year));
    }

    // Connect buttons and dropdowns
    try {
        setupListeners(state, render);
    } catch (e) {
        console.error("Listener setup failed:", e);
    }

    // Perform initial render
    render();
};
