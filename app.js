/**
 * app.js - Final Integration
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';
import { checkVoices } from './audio.js';

// 1. Initialize Global State
const state = { 
    viewDate: new Date(),    
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false 
};

note: { opened at line 18, column 19

// 3. Grid Drawing Logic
function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid'); 
    if (!grid) return;
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    // 1. Fetch holidays for the currently viewed year
    const holidays = (holidayData && typeof holidayData.getHolidaysForYear === 'function') 
        ? holidayData.getHolidaysForYear(year) 
        : {};

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // 2. Create Blank Spacers for start of month
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

    // 3. Generate Actual Days
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.className = 'calendar-day';
        daySquare.innerText = day;

        // --- Holiday Highlighting ---
        const holidayKey = `${month}-${day}`;
        if (holidays[holidayKey]) {
            daySquare.classList.add('holiday');
            daySquare.title = holidays[holidayKey]; // Hover tooltip
        }

        // --- Selection Logic (Precise Date Match) ---
        const isSelected = selectedDate && 
                           day === selectedDate.getDate() && 
                           month === selectedDate.getMonth() && 
                           year === selectedDate.getFullYear();
        
        if (isSelected) {
            daySquare.classList.add('selected');
        }

        // --- "Today" Highlighting ---
        const isToday = day === today.getDate() && 
                        month === today.getMonth() && 
                        year === today.getFullYear();
        
        if (isToday) {
            daySquare.classList.add('today-highlight');
        }

        // --- Interaction ---
        daySquare.onclick = () => {
            // Create a new date object for the clicked day
            const newSelected = new Date(year, month, day);
            onDateClick(newSelected);
        };

        grid.appendChild(daySquare);
    }
}

// 4. Initialize
window.onload = () => {
    // 1. Initialize Audio
    checkVoices((ready) => {
        console.log("Polish voices ready:", ready);
    });
    
    // 2. Setup Listeners
    setupListeners(state, render);
    
    // 3. Force render
    render();
    
    setTimeout(() => {
        render();
    }, 100);
};

// 5. Watch for System Theme Changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
