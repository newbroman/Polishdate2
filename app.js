// app.js - SELF-CONTAINED EMERGENCY VERSION
window.onload = () => {
    console.log("App starting...");
    const grid = document.getElementById('calendarGrid');
    const phrase = document.getElementById('plPhrase');

    // 1. Force clear the loading text
    if (phrase) phrase.innerText = "System Online";
    
    // 2. Build a tiny test calendar manually
    if (grid) {
        grid.innerHTML = ""; // Clear "Wczytywanie"
        for (let i = 1; i <= 31; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.style.border = "1px solid #ccc";
            day.style.padding = "10px";
            day.innerText = i;
            grid.appendChild(day);
        }
    }

    // 3. Populate dropdowns
    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    if (mR && yR) {
        mR.add(new Option("Test Month", 0));
        yR.add(new Option("2024", 2024));
    }
};
