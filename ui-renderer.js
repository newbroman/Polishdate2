/**
 * ui-renderer.js
 * Handles the display of the Polish date, phonetics, and English translation.
 */

/**
 * Main function called by render() in app.js
 * @param {Date} selectedDate - The date currently highlighted
 * @param {boolean} includeYear - Whether the "Include Year" toggle is ON
 */
export function updateInfoPanel(selectedDate, includeYear) {
    const plDisplay = document.getElementById('plPhrase');
    const enDisplay = document.getElementById('enPhrase');
    const phoneticDisplay = document.getElementById('phoneticPhrase');

    // Safety check to prevent errors if elements aren't found
    if (!selectedDate || !plDisplay || !enDisplay || !phoneticDisplay) return;

    const day = selectedDate.getDate();
    const monthIndex = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
/**
 * ui-renderer.js
 * Renders the Polish date phrase using Nominative Days and Genitive Months.
 */
import { getWrittenDay, getYearPolish, getYearPhonetic } from './numbers.js';

/**
 * Updates the footer info panel based on the selected date.
 * @param {Date} selectedDate 
 * @param {boolean} includeYear 
 */
export function updateInfoPanel(selectedDate, includeYear) {
    const plDisplay = document.getElementById('plPhrase');
    const enDisplay = document.getElementById('enPhrase');
    const phoneticDisplay = document.getElementById('phoneticPhrase');

    if (!selectedDate || !plDisplay || !enDisplay || !phoneticDisplay) return;

    const day = selectedDate.getDate();
    const monthIndex = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // 1. Get Month Data (Genitive Case)
    const monthData = getPolishMonthData(monthIndex);

    // 2. Get Day Spelling (Nominative Case from numbers.js)
    const daySpelling = getWrittenDay(day);

    // 3. Construct the Polish Phrase 
    // Format: "Siódmy stycznia"
    let fullPl = `${daySpelling} ${monthData.pl}`;
    
    // 4. Construct the English Phrase
    // Format: "January 7th"
    let fullEn = `${monthData.en} ${day}${getEnglishSuffix(day)}`;
    
    // 5. Construct the Phonetic Phrase
    // Format: "7 stich-nyah"
    let fullPhonetic = `${day} ${monthData.phonetic}`;

    // 6. Handle the Year Logic
    if (includeYear) {
        // Polish grammar: When year is added to a date, append "roku"
        fullPl += ` ${year} roku`;
        fullEn += `, ${year}`;
        fullPhonetic += ` ${year} ro-koo`;
    }

    // 7. Update the DOM elements
    plDisplay.innerText = fullPl;
    enDisplay.innerText = fullEn;
    phoneticDisplay.innerText = fullPhonetic;
}

/**
 * Helper: Provides English ordinal suffixes
 */
function getEnglishSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

/**
 * Helper: Provides Month names in Genitive case and Phonetics
 */
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
