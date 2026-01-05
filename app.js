// STAGE 2.1 - Compact Error Trapper
window.onload = async () => {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "<h1>Loading Modules...</h1>";
    try {
        const events = await import('./events.js');
        if (events.setupListeners) {
            grid.innerHTML = "<h1>SUCCESS</h1><p>events.js is loaded.</p>";
        }
    } catch (e) {
        grid.innerHTML = "<h1>FAILED</h1><p>" + e.message + "</p>";
    }
};
