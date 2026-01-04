import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

// Global State
const state = {
    viewDate: new Date(),
    selectedDate: new Date(),
    includeYear: true
};

function render() {
    // 1. Sync Selectors
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    if (mR) mR.value = state.viewDate.getMonth();
    if (yR) yR.value = state.viewDate.getFullYear();

    // 2. Render Grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (clickedDate) => {
        state.selectedDate = clickedDate;
        render();
    });

    // 3. Update Text
    updateInfoPanel(state.selectedDate, state.includeYear);
    
    // 4. Update Button Text
    const yearBtn = document.getElementById('repeatYearBtn');
    if (yearBtn) yearBtn.innerText = `Include Year: ${state.includeYear ? 'ON' : 'OFF'}`;
}

// Ignition Switch
window.onload = () => {
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');

    // Populate Dropdowns
    for (let i = 0; i < 12; i++) {
        const label = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i));
        mR.add(new Option(label, i));
    }
    for (let i = 2020; i <= 2035; i++) {
        yR.add(new Option(i, i));
    }

    // Initialize logic from events.js
    setupListeners(state, render);

    // Run first render
    render();
};
