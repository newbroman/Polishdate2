// app.js - Short Circuit Test
window.onload = async () => {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "<h1>Testing Chain...</h1>";
    try {
        const ev = await import('./events.js');
        grid.innerHTML = "<h1>Events.js OK</h1>";
        const core = await import('./calendar-core.js');
        grid.innerHTML = "<h1>Core OK - Ready to Boot</h1>";
        // If we reach here, the files are complete.
    } catch (e) {
        grid.innerHTML = "<h1>CRASH AT:</h1><p>" + e.message + "</p>";
    }
};
