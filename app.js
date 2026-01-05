import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

const state = { viewDate: new Date(), selectedDate: new Date(), includeYear: true };

function render() {
    renderCalendarGrid(state.viewDate, state.selectedDate, (d) => {
        state.selectedDate = d;
        render();
    });
    updateInfoPanel(state.selectedDate, state.includeYear);
}

window.onload = () => {
    // Populate Dropdowns
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    monthNames.forEach((name, i) => mR.add(new Option(name, i)));
    for (let i = 2024; i <= 2030; i++) yR.add(new Option(i, i));

    try {
        setupListeners(state, render);
        render();
    } catch (e) {
        console.error("App startup failed:", e);
    }
};
