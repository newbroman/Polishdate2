import holidayData from './holiday.js';
import culturalData from './cultural.js';

export function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const holidays = holidayData.getHolidaysForYear(year);

    // Adjust for Monday-start calendar (Polish standard)
    let startEdge = firstDay === 0 ? 6 : firstDay - 1;

    // Create Empty Slots
    for (let i = 0; i < startEdge; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Create Day Cells
    for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.innerText = d;

        const dateKey = `${month}-${d}`;
        if (holidays[dateKey]) cell.classList.add('holiday');
        
        if (d === selectedDate.getDate() && 
            month === selectedDate.getMonth() && 
            year === selectedDate.getFullYear()) {
            cell.classList.add('selected');
        }

        cell.onclick = () => onDateClick(new Date(year, month, d));
        grid.appendChild(cell);
    }
}
