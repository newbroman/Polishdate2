/**
 * calendar-core.js
 * Handles the logic for rendering the 7-column date grid.
 */
import holidayData from './holiday.js';
import culturalData from './cultural.js';

export function renderCalendarGrid(viewDate, selectedDate, onDayClick) {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // Update season theme on body
    document.body.className = culturalData.months[month].season;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const holidays = holidayData.getHolidaysForYear(year);

    // Padding for first week
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Create day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.innerText = day;

        const dateObj = new Date(year, month, day);

        // Highlight if holiday
        if (holidays[`${month}-${day}`]) dayEl.classList.add('holiday');
        
        // Highlight if selected
        if (dateObj.toDateString() === selectedDate.toDateString()) {
            dayEl.classList.add('selected');
        }

        dayEl.onclick = () => onDayClick(dateObj);
        grid.appendChild(dayEl);
    }
}
