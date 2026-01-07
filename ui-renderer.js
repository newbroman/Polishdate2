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

    // 1. Fetch the correct grammatical form of the month
    const monthData = getPolishMonthData(monthIndex);

    // 2. Build the Polish Phrase (Genitive Case for dates)
    // Example: "7 Stycznia"
    let fullPl = `${day} ${monthData.pl}`;
    
    // Build the English Phrase (Standard format)
    // Example: "January 7"
    let fullEn = `${monthData.en} ${day}`;
    
    // Build the Phonetic Guide (Tan text in your CSS)
    // Example: "7 stich-nyah"
    let fullPhonetic = `${day} ${monthData.phonetic}`;

    // 3. Handle the "Include Year" logic
    if (includeYear) {
        // In Polish, years in dates must end with 'roku' (of the year)
        fullPl += ` ${year} roku`;
        fullEn += `, ${year}`;
        fullPhonetic += ` ${year} ro-koo`;
    }

    // 4. Update the DOM
    plDisplay.innerText = fullPl;
    enDisplay.innerText = fullEn;
    phoneticDisplay.innerText = fullPhonetic;
}

/**
 * Helper mapping for Polish months in the Genitive (Date) case.
 * Dictionary form (Nominative) vs. Date form (Genitive):
 * Styczeń -> Stycznia, Luty -> Lutego, etc.
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
