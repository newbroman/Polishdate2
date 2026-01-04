import { setupListeners } from './events.js';

window.onload = () => {
    const calendarGrid = document.getElementById('calendarGrid');
    
    try {
        console.log("Testing events.js import...");
        // If this works, the 'setupListeners' function exists
        if (typeof setupListeners === 'function') {
            calendarGrid.innerHTML = "<h1>STAGE 2 SUCCESS</h1><p>The app can see events.js! The problem is likely in calendar-core.js or ui-renderer.js.</p>";
        }
    } catch (error) {
        calendarGrid.innerHTML = "<h1>STAGE 2 FAILED</h1><p>Error: " + error.message + "</p>";
    }
};
