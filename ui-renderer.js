/**
 * ui-renderer.js
 */
import { getWrittenDay, getPhoneticDay, getYearPolish, getYearPhonetic } from './numbers.js';
import phonetics from './phonetics.js';
import holidayData from './holiday.js';

export function updateInfoPanel(selectedDate, includeYear) {
    const plDisplay = document.getElementById('plPhrase');
    const enDisplay = document.getElementById('enPhrase');
    const phoneticDisplay = document.getElementById('phoneticPhrase');
    const holidayDisplay = document.getElementById('holidayName'); 

    if (!selectedDate || !plDisplay) return;

    const day = selectedDate.getDate();
    const monthIndex = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // 1. Centralized Data Mapping
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthKeysPl = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    
    const currentMonthKey = monthKeysPl[monthIndex];
    const monthPhonetic = phonetics.months[currentMonthKey]; 
    const monthEn = monthNamesEn[monthIndex];

    const daySpelling = getWrittenDay(day);      
    const dayPhonetic = getPhoneticDay(day);     

    // 2. Build Phonetic Phrase with Capitalization Fix
    // We capitalize the first letter of the dayPhonetic to match the "Title" look.
    const capitalizedDayPhonetic = dayPhonetic.charAt(0).toUpperCase() + dayPhonetic.slice(1);
    
    let fullPl = `${daySpelling} ${currentMonthKey}`;
    let fullEn = `${monthEn} ${day}${getEnglishSuffix(day)}`;
    let fullPhonetic = `${capitalizedDayPhonetic} ${monthPhonetic}`; 

    // 3. Check for Holiday
    const holidays = holidayData.getHolidaysForYear(year);
    const holidayKey = `${monthIndex}-${day}`;
    
    if (holidayDisplay) {
        if (holidays[holidayKey]) {
            holidayDisplay.innerText = `🎉 ${holidays[holidayKey]}`;
            holidayDisplay.style.display = "block";
        } else {
            holidayDisplay.innerText = "";
            holidayDisplay.style.display = "none";
        }
    }

    // 4. Handle the Year
    if (includeYear) {
        fullPl += ` ${getYearPolish(year)} roku`;
        fullEn += `, ${year}`;
        fullPhonetic += ` ${getYearPhonetic(year)} ro-koo`;
    }

    // 5. Update UI
    plDisplay.innerText = fullPl;
    enDisplay.innerText = fullEn;
    phoneticDisplay.innerText = fullPhonetic;
}

/**
 * Audio Engine: Speaks the Polish phrase displayed on screen
 */
export function speakPolish() {
    const text = document.getElementById('plPhrase').innerText;
    if (!text || text === "Wybierz datę") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; // Slightly slower for clear learning
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
}

function getEnglishSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}
