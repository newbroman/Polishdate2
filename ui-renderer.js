import culturalData from './cultural.js';
import phonetics from './phonetics.js'; // Using your phonetics file
import { getOrdinalYearPl, getOrdinalYearPhonetic } from './numbers.js'; // We'll build these helpers

export function updateInfoPanel(date, includeYear) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    // 1. Get Month Names & Phonetics from data files
    const monthGenitive = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];
    
    // Pull phonetic month from phonetics.js (e.g., phonetics.months["stycznia"])
    const pMonth = phonetics.months[monthGenitive[monthIndex]] || monthGenitive[monthIndex];

    // 2. Handle Years (0-3000)
    // We call a helper function to turn the number into Polish words/phonetics
    const yearPl = getOrdinalYearPl(year);
    const yearPhonetic = getOrdinalYearPhonetic(year);

    // 3. Construct Final Phrases
    const dayNamePl = culturalData.days[dayOfWeek].pl.toLowerCase();
    const pDayName = phonetics.days[dayNamePl] || dayNamePl;

    const fullPlDate = `${dayNamePl}, ${day} ${monthGenitive[monthIndex]}${includeYear ? ` ${yearPl}` : ''}`;
    const fullPhonetic = `${pDayName}, ${day} ${pMonth}${includeYear ? ` ${yearPhonetic}` : ''}`;

    // 4. Render to UI
    document.getElementById('plPhrase').innerText = fullPlDate;
    document.getElementById('phoneticPhrase').innerText = fullPhonetic;
    document.getElementById('enPhrase').innerText = date.toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'long', year: includeYear ? 'numeric' : undefined 
    });
}
