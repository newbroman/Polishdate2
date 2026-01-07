import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';

const state = { 
    viewDate: new Date(), 
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false 
};

function render() {
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    // 1. Seasonal Theming
    const body = document.body;
    body.classList.remove('spring', 'summer', 'autumn', 'winter');
    if (monthIndex >= 2 && monthIndex <= 4) body.classList.add('spring');
    else if (monthIndex >= 5 && monthIndex <= 7) body.classList.add('summer');
    else if (monthIndex >= 8 && monthIndex <= 10) body.classList.add('autumn');
    else body.classList.add('winter');

    // 2. Localize & Sync Dropdown
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesPl = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    const monthNames = state.isPolish ? monthNamesPl : monthNamesEn;
    
    if (mRoller) {
        mRoller.innerHTML = ""; 
        monthNames.forEach((name, index) => {
            const opt = new Option(name, index);
            if (index === monthIndex) opt.selected = true;
            mRoller.add(opt);
        });
    }

    if (yInput) yInput.value = year;

    // 3. Localize Weekdays
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysPl = ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"];
    const weekdayContainer = document.querySelector('.weekdays');
    if (weekdayContainer) {
        weekdayContainer.innerHTML = (state.isPolish ? daysPl : daysEn)
            .map(day => `<div>${day}</div>`).join('');
    }

       // 4. Draw Grid
    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); 
    });

    updateInfoPanel(state.selectedDate, state.includeYear);
}

function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const holidays = holidayData.getHolidaysForYear(year);

    // Spacers
    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.classList.add('calendar-day', 'spacer');
        grid.appendChild(spacer);
    }

    // Day Squares
    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('calendar-day');
        daySquare.innerText = day;

        const holidayKey = `${month}-${day}`;
        if (holidays && holidays[holidayKey]) {
            daySquare.classList.add('holiday');
            daySquare.title = holidays[holidayKey]; 
        }

        if (selectedDate && day === selectedDate.getDate() && 
            month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add('selected');
        }

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today-highlight');
        }

        daySquare.onclick = () => {
            const newSelectedDate = new Date(year, month, day);
            onDateClick(newSelectedDate);
        };
        grid.appendChild(daySquare);
    }
}

window.onload = () => {
    try {
        setupListeners(state, render);
        render(); 
    } catch (e) {
        console.error("Startup failed:", e);
    }
};
