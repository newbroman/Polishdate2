/**
 * ui-renderer.js - Simplified with Grammar Rules Removed
 */
import { getWrittenDay, getPhoneticDay, getYearPolish, getYearPhonetic } from './numbers.js';
import phonetics from './phonetics.js';
import holidayData from './holiday.js';

export function updateInfoPanel(selectedDate, includeYear, isFormal) {
    const plDisplay = document.getElementById('plPhrase');
    const enDisplay = document.getElementById('enPhrase');
    const phoneticDisplay = document.getElementById('phoneticPhrase');
    const holidayDisplay = document.getElementById('holidayName'); 
    const footer = document.querySelector('.info-panel');

    if (!selectedDate || !plDisplay) return;

    const day = selectedDate.getDate();
    const monthIndex = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // 1. Remove Grammar Tips & Apply Visual Theme
    // Tip logic removed here as it is now in rules.js
    if (footer) {
        footer.classList.toggle('formal-theme', isFormal);
        footer.classList.toggle('informal-theme', !isFormal);
    }

    // 2. Data Mapping
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthKeysPl = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    
    const currentMonthKey = monthKeysPl[monthIndex];
    const monthPhonetic = phonetics.months[currentMonthKey]; 
    const monthEn = monthNamesEn[monthIndex];

    const daySpelling = getWrittenDay(day, isFormal);      
    const dayPhonetic = getPhoneticDay(day, isFormal);
    const yearSpelling = getYearPolish(year); // No toggle needed
    const yearPhonetic = getYearPhonetic(year); // No toggle needed

    // 3. Intros - Removed for a cleaner look
    // Capitalize the day spelling since it's now the start of the line
    const capitalizedDaySpelling = daySpelling.charAt(0).toUpperCase() + daySpelling.slice(1);
    const capitalizedDayPhonetic = dayPhonetic.charAt(0).toUpperCase() + dayPhonetic.slice(1);
    
    let fullPl = `${capitalizedDaySpelling} ${currentMonthKey}`;
    let fullEn = `${monthEn} ${day}${getEnglishSuffix(day)}`;
    let fullPhonetic = `${capitalizedDayPhonetic} ${monthPhonetic}`;

   // 4. Year Logic (Dates always use Genitive/Formal year endings)
    if (includeYear) {
        // Updated: Removed the second argument (true) to match new numbers.js logic
        fullPl += ` ${getYearPolish(year)} roku`;
        fullEn += `, ${year}`;
        fullPhonetic += ` ${getYearPhonetic(year)} ro-koo`;
    }

    // 5. Holiday Display
    const holidays = holidayData.getHolidaysForYear(year);
    const holidayKey = `${monthIndex}-${day}`;
    
    if (holidayDisplay) {
        if (holidays[holidayKey]) {
            holidayDisplay.innerText = `🎉 ${holidays[holidayKey]}`;
            holidayDisplay.style.display = "block";
        } else {
            holidayDisplay.style.display = "none";
        }
    }

   // 6. Update UI - Trimmed to remove potential leading spaces
    plDisplay.innerText = fullPl.trim();
    enDisplay.innerText = fullEn.trim();
    phoneticDisplay.innerText = fullPhonetic.trim();
}

function getEnglishSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

/**
 * Audio Engine
 */
export function speakPolish() {
    const text = document.getElementById('plPhrase').innerText;
    if (!text || text === "Wybierz datę") return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; 
    window.speechSynthesis.speak(utterance);
}

