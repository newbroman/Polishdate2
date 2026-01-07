/**
 * ui-renderer.js
 */
import { getWrittenDay } from './numbers.js';
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

    // 1. Get Month & Day Data
    const monthData = getPolishMonthData(monthIndex);
    const daySpelling = getWrittenDay(day);

    // 2. Build Basic Polish Phrase
    // fullPl uses words (e.g., "Dwunasty stycznia")
    let fullPl = `${daySpelling} ${monthData.pl}`;
    let fullEn = `${monthData.en} ${day}${getEnglishSuffix(day)}`;
    
    // Fix: Using daySpelling for phonetic as well so it matches the sound
    let fullPhonetic = `${daySpelling} ${monthData.phonetic}`; 

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

    if (includeYear) {
        fullPl += ` ${year} roku`;
        fullEn += `, ${year}`;
        // Phonetic approximation for "roku"
        fullPhonetic += ` ${year} ro-koo`;
    }

    // 4. Update UI
    plDisplay.innerText = fullPl;
    enDisplay.innerText = fullEn;
    phoneticDisplay.innerText = fullPhonetic;
}

/**
 * Audio Engine: Speaks the Polish phrase
 */
export function speakPolish() {
    const text = document.getElementById('plPhrase').innerText;
    if (!text || text === "Wybierz datę") return;

    // Cancel current speech to prevent overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.rate = 0.85; // Slightly slower for learning
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

function getPolishMonthData(index) {
    const months = [
        { pl: "stycznia", en: "January", phonetic: "stich-nyah" },
        { pl: "lutego", en: "February", phonetic: "loo-teh-go" },
        { pl: "marca", en: "March", phonetic: "mar-tsah" },
        { pl: "kwietnia", en: "April", phonetic: "kyet-nyah" },
        { pl: "maja", en: "May", phonetic: "ma-yah" },
        { pl: "czerwca", en: "June", phonetic: "cher-vtsah" },
        { pl: "lipca", en: "July", phonetic: "leep-tsah" },
        { pl: "sierpnia", en: "August", phonetic: "syerp-nyah" },
        { pl: "września", en: "September", phonetic: "v-zhesh-nyah" },
        { pl: "października", en: "October", phonetic: "paz-dye-nyee-kah" },
        { pl: "listopada", en: "November", phonetic: "lees-toh-pah-dah" },
        { pl: "grudnia", en: "December", phonetic: "grood-nyah" }
    ];
    return months[index];
}
