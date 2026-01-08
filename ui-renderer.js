/**
 * ui-renderer.js - Final Formal/Informal Integration
 */
import { getWrittenDay, getPhoneticDay, getYearPolish, getYearPhonetic } from './numbers.js';
import phonetics from './phonetics.js';
import holidayData from './holiday.js';

export function updateInfoPanel(selectedDate, includeYear, isFormal) {
    const plDisplay = document.getElementById('plPhrase');
    const enDisplay = document.getElementById('enPhrase');
    const phoneticDisplay = document.getElementById('phoneticPhrase');
    const holidayDisplay = document.getElementById('holidayName'); 
    const footer = document.querySelector('.info-panel'); // For theme swapping

    if (!selectedDate || !plDisplay) return;

    const day = selectedDate.getDate();
    const monthIndex = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // 1. Update Grammar Tip and Visual Theme
    const tipContainer = document.getElementById('grammarTipContainer');
    const tipText = document.getElementById('grammarTipText');

    if (tipContainer && tipText) {
        tipContainer.style.display = 'block'; 
        tipText.innerText = isFormal ? 
            "💡 Formal (Genitive): Used for scheduling. Endings change to '-ego'." : 
            "💡 Informal (Nominative): Used for today's date. Endings are '-y/-i'.";
    }

    // Apply the Visual Mode Glow
    if (footer) {
        footer.classList.toggle('formal-theme', isFormal);
        footer.classList.toggle('informal-theme', !isFormal);
    }

    // 2. Centralized Data Mapping
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthKeysPl = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    
    const currentMonthKey = monthKeysPl[monthIndex];
    const monthPhonetic = phonetics.months[currentMonthKey]; 
    const monthEn = monthNamesEn[monthIndex];

    const daySpelling = getWrittenDay(day, isFormal);      
    const dayPhonetic = getPhoneticDay(day, isFormal);     

    // 3. Determine Intros (Formal is now default)
    const plIntro = isFormal ? "Spotkanie odbędzie się" : "Dzisiaj jest";
    const enIntro = isFormal ? "The meeting will be on" : "Today is";
    const phoneticIntro = isFormal ? "Spot-ka-nyeh od-ben-jeh sheh" : "Djee-shigh yest";

    const capitalizedPhoneticIntro = phoneticIntro.charAt(0).toUpperCase() + phoneticIntro.slice(1);
    
    let fullPl = `${plIntro} ${daySpelling} ${currentMonthKey}`;
    let fullEn = `${enIntro} ${monthEn} ${day}${getEnglishSuffix(day)}`;
    let fullPhonetic = `${capitalizedPhoneticIntro} ${dayPhonetic} ${monthPhonetic}`; 

    // 4. Check for Holiday
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

    // 5. Handle the Year
    if (includeYear) {
        fullPl += ` ${getYearPolish(year, true)} roku`;
        fullEn += `, ${year}`;
        fullPhonetic += ` ${getYearPhonetic(year, true)} ro-koo`;
    }

    // 6. Update UI
    plDisplay.innerText = fullPl;
    enDisplay.innerText = fullEn;
    phoneticDisplay.innerText = fullPhonetic;
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

function getEnglishSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}
