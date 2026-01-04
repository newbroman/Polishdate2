import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

// Global State Object
const state = {
    viewDate: new Date(),
    selectedDate: new Date(),
    includeYear: true
};

function render() {
    // Sync Selectors
    document.getElementById('monthRoller').value = state.viewDate.getMonth();
    document.getElementById('yearRoller').value = state.viewDate.getFullYear();

    // Render Components
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render();
    });

    updateInfoPanel(state.selectedDate, state.includeYear);
}

// Ignition Switch
window.onload = () => {
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    
    // Populate dropdowns once
    for (let i = 0; i < 12; i++) mR.add(new Option(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i)), i));
    for (let i = 2020; i <= 2035; i++) yR.add(new Option(i, i));

    setupListeners(state, render);
    render();
};
