import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';

const state = { viewDate: new Date(), selectedDate: new Date(), includeYear: true };

function render() {
    // This line specifically removes the "Wczytywanie" text
    document.getElementById('plPhrase').innerText = "Loading data..."; 
    
    renderCalendarGrid(state.viewDate, state.selectedDate, (d) => { state.selectedDate = d; render(); });
    updateInfoPanel(state.selectedDate, state.includeYear);
}

window.onload = () => {
    // 1. Setup UI first so the user sees something
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    for (let i = 0; i < 12; i++) mR.add(new Option(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i)), i));
    for (let i = 2020; i <= 2035; i++) yR.add(new Option(i, i));

    // 2. Try to setup listeners, but render anyway even if it fails
    try {
        setupListeners(state, render);
    } catch (e) {
        console.error("Listener setup failed, but continuing to render.");
    }

    // 3. The magic command that clears the loading screen
    render();
};
