/**
 * app.js - Final Polished Version
 */
import { updateInfoPanel } from './ui-renderer.js';
import { setupListeners } from './events.js';
import holidayData from './holiday.js';
import { checkVoices } from './audio.js';
import culturalData from './cultural.js';

// 1. Global Cache and State
let cachedNameDays = null; 

const state = { 
    viewDate: new Date(),    
    selectedDate: new Date(), 
    includeYear: true,
    isPolish: false,
    isFormal: false
}

// 2. Main Render Function
function render() {
    const grid = document.getElementById('calendarGrid');
    const mRoller = document.getElementById('monthRoller');
    const yInput = document.getElementById('yearInput');
    const weekdayContainer = document.querySelector('.weekdays');
    const meetingBtn = document.getElementById('meetingToggle');
    const playBtn = document.getElementById('playBtn');
    const repeatYearBtn = document.getElementById('repeatYearBtn');
    
    if (!grid) return;

    const monthIndex = state.viewDate.getMonth();
    const year = state.viewDate.getFullYear();

    // --- Modal Translations ---
    const modalAboutHeader = document.getElementById('modalAboutHeader');
    const featCal = document.getElementById('featCal');
    const featCult = document.getElementById('featCult');
    const featGram = document.getElementById('featGram');
    const modalDevNote = document.getElementById('modalDevNote');
    const feedbackBtn = document.getElementById('feedbackBtn');

    if (modalAboutHeader) {
        if (state.isPolish) {
            modalAboutHeader.innerText = "O aplikacji:";
            featCal.innerHTML = "📅 <b>Kalendarz:</b> Kliknij datę, by usłyszeć wymowę.";
            featCult.innerHTML = "📖 <b>Kultura:</b> Poznaj polskie tradycje i imieniny.";
            featGram.innerHTML = "⚖️ <b>Gramatyka:</b> Opanuj odmianę liczebników.";
            modalDevNote.innerText = "Projekt niezależny. Twoja opinia pomaga mi w rozwoju!";
            feedbackBtn.innerText = "Prześlij opinię (Feedback)";
        } else {
            modalAboutHeader.innerText = "About the app:";
            featCal.innerHTML = "📅 <b>Calendar:</b> Click a date to hear pronunciation.";
            featCult.innerHTML = "📖 <b>Culture:</b> Explore Polish traditions and Name Days.";
            featGram.innerHTML = "⚖️ <b>Grammar:</b> Master the numeral cases.";
            modalDevNote.innerText = "Independent project. Your feedback helps me improve!";
            feedbackBtn.innerText = "Send Feedback";
        }
    }

    // --- Mode Button ---
    if (meetingBtn) {
        const icon = state.isFormal ? "🎉" : "📅";
        const label = state.isFormal 
            ? (state.isPolish ? "To jest dnia" : "It's on") 
            : (state.isPolish ? "Dzisiaj jest" : "Today is");
        meetingBtn.innerText = `${icon} ${label}`;
        meetingBtn.className = `pill-btn ${state.isFormal ? 'mode-btn-event' : 'mode-btn-naming'}`;
    }

    // --- Info Panel ---
    try {
        updateInfoPanel(state.selectedDate, state.includeYear, state.isFormal, state.isPolish);
    } catch (e) { console.error("Info Panel Error:", e); }

    // --- Seasonal Themes ---
    document.body.className = ''; 
    const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    document.body.classList.add(seasons[monthIndex]);

    // --- Month & Year Inputs ---
    if (mRoller) {
        const months = state.isPolish 
            ? ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
            : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        mRoller.innerHTML = months.map((name, i) => `<option value="${i}" ${i === monthIndex ? 'selected' : ''}>${name}</option>`).join('');
    }
    if (yInput) yInput.value = year;

    // --- Weekday Labels ---
    if (weekdayContainer) {
        const days = state.isPolish ? ["Nie", "Pon", "Wt", "Śr", "Czw", "Pią", "Sob"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdayContainer.innerHTML = days.map(d => `<span>${d}</span>`).join('');
    }

    // --- Button Translations ---
    if (playBtn && !playBtn.innerText.includes("⌛")) {
        playBtn.innerText = state.isPolish ? "🔊 Słuchaj" : "🔊 Listen";
    }

    if (repeatYearBtn) {
        const yearLabel = state.isPolish ? "Rok" : "Year";
        const status = state.isPolish ? (state.includeYear ? "WŁ" : "WYŁ") : (state.includeYear ? "ON" : "OFF");
        repeatYearBtn.innerText = `${yearLabel}: ${status}`;
    }

    // --- Cultural Hub Translations ---
    const cultMainTitle = document.getElementById('cultMainTitle');
    const nameSearchInput = document.getElementById('nameSearchInput');
    const dailyNamesTitle = document.getElementById('dailyNamesTitle');
    const imieninyTitle = document.getElementById('imieninyTitle');
    const imieninyText = document.getElementById('imieninyText');
    const holidaysTitle = document.getElementById('holidaysTitle');
    const holidaysText = document.getElementById('holidaysText');
    const backBtn = document.querySelector('.back-to-cal');
    const dailyNamesList = document.getElementById('dailyNamesList');

    if (cultMainTitle) {
        if (state.isPolish) {
            cultMainTitle.innerText = "Polskie Tradycje Kulturowe";
            nameSearchInput.placeholder = "Szukaj imienia (np. Maria)...";
            dailyNamesTitle.innerText = "Imieniny na wybraną datę:";
            imieninyTitle.innerText = "Imieniny";
            imieninyText.innerHTML = "W Polsce <strong>imieniny</strong> są często ważniejsze niż urodziny.";
            holidaysTitle.innerText = "Święta i Zwyczaje";
            holidaysText.innerHTML = "Szukaj dni z <em>czerwoną ramką</em>.";
            if(backBtn) backBtn.innerText = "← Powrót do kalendarza";
        } else {
            cultMainTitle.innerText = "Polish Cultural Traditions";
            nameSearchInput.placeholder = "Search for a name (e.g., Maria)...";
            dailyNamesTitle.innerText = "Name Days for selected date:";
            imieninyTitle.innerText = "Imieniny (Name Days)";
            imieninyText.innerHTML = "In Poland, <strong>Name Days</strong> are often more important than birthdays.";
            holidaysTitle.innerText = "Holidays & Customs";
            holidaysText.innerHTML = "Look for days with <em>red borders</em>.";
            if(backBtn) backBtn.innerText = "← Back to Calendar";
        }
    }

    // Update the daily name list for the selected day
   if (dailyNamesList) {
        // 1. Get the Day and Month from the state
        const dd = String(state.selectedDate.getDate()).padStart(2, '0');
        const mm = String(state.selectedDate.getMonth() + 1).padStart(2, '0');
        
        // 2. Create the key in DD-MM format to match your JSON file
        const dateKey = `${dd}-${mm}`; 

        if (cachedNameDays) {
            // 3. If we already have the names in memory, use them
            const names = cachedNameDays[dateKey] || [];
            dailyNamesList.innerText = names.length > 0 ? names.join(", ") : "---";
        } else {
            // 4. If memory is empty, fetch the file once
            fetch('./Imieniny.json')
                .then(res => res.json())
                .then(data => {
                    cachedNameDays = data; // Save to memory
                    const names = data[dateKey] || [];
                    dailyNamesList.innerText = names.length > 0 ? names.join(", ") : "---";
                })
                .catch(err => {
                    console.error("Error loading names:", err);
                    dailyNamesList.innerText = "Error loading names";
                });
        }
    }

    renderCalendarGrid(state.viewDate, state.selectedDate, (newDate) => {
        state.selectedDate = newDate;
        render(); 
    });
}

// 3. Grid Drawing Logic
function renderCalendarGrid(viewDate, selectedDate, onDateClick) {
    const grid = document.getElementById('calendarGrid'); 
    if (!grid) return;
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = new Date();
    
    const holidays = (holidayData && typeof holidayData.getHolidaysForYear === 'function') 
        ? holidayData.getHolidaysForYear(year) 
        : {};

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let x = 0; x < firstDayIndex; x++) {
        const spacer = document.createElement('div');
        spacer.className = 'calendar-day spacer';
        grid.appendChild(spacer);
    }

    for (let day = 1; day <= lastDay; day++) {
        const daySquare = document.createElement('div');
        daySquare.className = 'calendar-day';
        daySquare.innerText = day;

        const holidayKey = `${month}-${day}`;
        const holidayName = holidays[holidayKey];

        if (holidayName) {
            const cleanName = holidayName.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
            const info = culturalData.holidayExplanations[holidayKey] || 
                         culturalData.holidayExplanations[cleanName] || 
                         culturalData.holidayExplanations[holidayName];

            if (info) {
                if (info.type === 'holiday') daySquare.classList.add('is-holiday');
                else if (info.type === 'tradition') daySquare.classList.add('is-tradition');
            }
        }

        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        if (isToday) daySquare.classList.add('today-highlight');

        const isSelected = selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
        if (isSelected) daySquare.classList.add('selected');

        daySquare.onclick = () => {
            onDateClick(new Date(year, month, day));
        };

        grid.appendChild(daySquare);
    }
}

// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupListeners(state, render);

    fetch('./Imieniny.json')
        .then(res => res.json())
        .then(data => {
            cachedNameDays = data; // Store the data in your global variable
            render();              // Redraw to show names for the current date
        })
        .catch(err => console.error("Could not load Imieniny database:", err));

    // Modal Listeners
    const infoBtn = document.getElementById('navInfo');
    const aboutModal = document.getElementById('aboutModal');
    const closeBtn = document.querySelector('.close-btn');
    const feedbackBtn = document.getElementById('feedbackBtn');

    if (infoBtn && aboutModal) {
        infoBtn.addEventListener('click', () => aboutModal.style.display = 'block');
        closeBtn?.addEventListener('click', () => aboutModal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === aboutModal) aboutModal.style.display = 'none'; });
        feedbackBtn?.addEventListener('click', () => window.open('https://forms.gle/YOUR_FORM_ID', '_blank'));
    }

    // --- Search Logic (Placed Once) ---
    const searchInput = document.getElementById('nameSearchInput');
    const resultsDiv = document.getElementById('searchResults');

    searchInput?.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsDiv.innerHTML = "";
        if (query.length < 2) return;

        if (!cachedNameDays) {
            const response = await fetch('./Imieniny.json');
            cachedNameDays = await response.json();
        }

        for (const [date, names] of Object.entries(cachedNameDays)) {
            const matches = names.filter(n => n.toLowerCase().includes(query));
            matches.forEach(name => {
                const row = document.createElement('div');
                row.className = 'search-item';
                const [d, m] = date.split('-'); 
                row.innerHTML = `<span>${name}</span> <small>(${d}.${m})</small>`;
                row.style.cursor = 'pointer';
                row.onclick = () => {
                    state.viewDate = new Date(state.viewDate.getFullYear(), parseInt(m) - 1, parseInt(d));
                    state.selectedDate = new Date(state.viewDate.getFullYear(), parseInt(m) - 1, parseInt(d));
                    document.getElementById('culturalHub').style.display = 'none';
                    document.getElementById('calendarApp').style.display = 'block';
                    render(); 
                };
                resultsDiv.appendChild(row);
            });
        }
    });

    // Initial render and voice check
    requestAnimationFrame(() => render());
    checkVoices(() => render());

   // --- Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        let refreshing = false;
        // Detect when a new service worker takes over and reload the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload();
                refreshing = true;
            }
        });

// Debugging
window.render = render;
window.state = state;
window.renderCalendarGrid = renderCalendarGrid;
