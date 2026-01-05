import { renderCalendarGrid } from './calendar-core.js';
import { updateInfoPanel } from './ui-renderer.js';

// Global State
const state = { viewDate: new Date(), selectedDate: new Date(), includeYear: true };

async function render() {
    console.log("Render starting...");
    const phrase = document.getElementById('plPhrase');
    
    // This line removes "Wczytywanie..." manually
    if (phrase) phrase.innerText = "Synchronizing...";

    try {
        renderCalendarGrid(state.viewDate, state.selectedDate, (d) => {
            state.selectedDate = d;
            render();
        });
        updateInfoPanel(state.selectedDate, state.includeYear);
        if (phrase) phrase.innerText = "Done!"; 
    } catch (e) {
        if (phrase) phrase.innerText = "Render Error: " + e.message;
    }
}

window.onload = async () => {
    console.log("Window loaded.");
    
    // Populate dropdowns immediately
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    if (mR && yR) {
        for (let i = 0; i < 12; i++) mR.add(new Option(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i)), i));
        for (let i = 2020; i <= 2035; i++) yR.add(new Option(i, i));
    }

    // Try to load events.js WITHOUT crashing the whole app if it fails
    try {
        const { setupListeners } = await import('./events.js');
        setupListeners(state, render);
    } catch (e) {
        console.warn("Could not load events.js, buttons might not work yet.");
    }

    // Force the first render
    render();
};
