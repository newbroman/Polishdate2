// STAGE 2.1 - The Module Hunter
window.onload = async () => {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = "<h1>Attempting to load modules...</h1>";

    try {
        // This tries to load the file dynamically to catch the specific error
        const eventsModule = await import('./events.js');
        
        if (eventsModule.setupListeners) {
            calendarGrid.innerHTML = "<h1>SUCCESS!</h1><p>The browser found events.js.</p>";
        }
    } catch (error) {
        // THIS WILL TELL US THE TRUTH
        calendarGrid.innerHTML = `<h1>MODULE LOAD FAILED</h1>
            <p>Error: ${error.message}</p>
            <p>Check if all filenames on GitHub are lowercase!</p>`;
        console.error(error);
    }
};
