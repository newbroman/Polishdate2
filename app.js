// NUCLEAR DEBUG app.js
window.onload = async () => {
    const plPhrase = document.getElementById('plPhrase');
    plPhrase.innerText = "Checking files...";

    const files = [
        'calendar-core.js',
        'ui-renderer.js',
        'events.js',
        'holiday.js',
        'cultural.js'
    ];

    for (const file of files) {
        try {
            plPhrase.innerText = `Loading ${file}...`;
            await import(file);
        } catch (e) {
            plPhrase.innerHTML = `<span style="color:red">ERROR in ${file}:</span><br>${e.message}`;
            return; // Stop here if a file fails
        }
    }

    plPhrase.innerText = "All files loaded! Starting render...";
    
    // If we get here, the chain is good. 
    // Now try a manual render to clear the screen
    document.getElementById('calendarGrid').innerHTML = "<h1>SYSTEM READY</h1>";
};
