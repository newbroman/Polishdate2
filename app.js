/**
 * app.js - Main Application Controller
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';
import { checkVoices } from './audio.js';

window.onload = () => {
    // Initializing voices ensures the 'Listen' button 
    // lights up as soon as the browser is ready.
    checkVoices((ready) => {
        console.log("Polish voices ready:", ready);
    });
    
    setupListeners(state, render);
    render(); 
};

// 1. Initialize Global State
const state = { 
    viewDate: new Date(),    
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false 
};

function render() {
    // 1. DOM Elements
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const weekdayContainer = document.querySelector('.weekdays');
    
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    // 2. Seasonal Theming (Synchronized with your CSS variables)
    document.body.className = ''; 
    const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    document.body.classList.add(seasons[monthIndex]);

    // 3. Month & Year Inputs
    if (mRoller) {
        const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        const names = state.isPolish ? monthNamesPl : monthNamesEn;
        
        mRoller.innerHTML = names.map((name, i) => 
            `<option value="${i}" ${i === monthIndex ? 'selected' : ''}>${name}</option>`
        ).join('');
    }
    if (yInput) yInput.value = year;

    // 4. Weekday Labels
    if (weekdayContainer) {
        const days = state.isPolish ? ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdayContainer.innerHTML = days.map(d => `<span>${d}</span>`).join('');
    }

    // 5. Draw Grid
    // FIX: Make sure your HTML has <div class="calendar-grid" id="calendarGrid"></div>
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); 
    });

    // 6. Update Info Panel
    try {
        updateInfoPanel(state.selectedDate, state.includeYear);
    } catch (e) { console.error("Info Panel Error:", e); }
}

function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid'); 
    if (!grid) {
        console.error("Calendar grid element not found! Check your HTML for id='calendarGrid'");
        return;
    }
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    const holidays = (holidayData && holidayData.getHolidaysForYear) ? holidayData.getHolidaysForYear(year) : {};

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Spacers (Visibility handled by CSS .spacer)
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

    // Days
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.className = 'calendar-day';
        daySquare.innerText = day;

        const holidayKey = `${month}-${day}`;
        if (holidays[holidayKey]) daySquare.classList.add('holiday');

        // Check if this day is the selected one
        if (selectedDate && day === selectedDate.getDate() && 
            month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add('selected');
        }

        // Highlight today
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today-highlight');
        }

        daySquare.onclick = () => onDateClick(new Date(year, month, day));
        grid.appendChild(daySquare);
    }
}

// 2. Start Application
window.onload = () => {
    setupListeners(state, render);
    render(); 
    
    // Theme Observer: Re-render if system theme changes while app is open
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
};
