// DEBUG app.js
window.onload = () => {
    console.log("App.js has started successfully!");

    const mR = document.getElementById('monthRoller');
    const yR = document.getElementById('yearRoller');
    const calendarGrid = document.getElementById('calendarGrid');

    // 1. Force remove the loading message manually
    if (calendarGrid) {
        calendarGrid.innerHTML = "<h1>DEBUG MODE: JS IS WORKING</h1><p>If you see this, the problem is a missing file or a typo in your imports.</p>";
    }

    // 2. Simple population to see if UI elements are found
    if (mR && yR) {
        mR.add(new Option("Debug Month", 0));
        yR.add(new Option("2024", 2024));
        console.log("Dropdowns found and populated.");
    } else {
        console.error("Could not find dropdown elements in index.html");
    }
};
