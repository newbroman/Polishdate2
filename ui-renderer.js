import culturalData from './cultural.js';
import phonetics from './phonetics.js';
import { getPhoneticDay, getYearPolish, getYearPhonetic } from './numbers.js';

/**
 * Updates the main information panel with the selected date in Polish,
 * Phonetic, and English formats.
 */
export function updateInfoPanel(date, includeYear) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    // 1. Get Month Names (Genitive Case for dates)
    const monthGenitive = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];

    // 2. Build Polish Phrase
    // Format: [Day Name], [Day Number] [Month Name] [Year]
    const dayNamePl = culturalData.days[dayOfWeek].pl.toLowerCase();
    const yearPl = getYearPolish(year);
    
    const plPhrase = `${dayNamePl}, ${day} ${monthGenitive[monthIndex]}${includeYear ? ` ${yearPl}` : ''}`;
    document.getElementById('plPhrase').innerText = plPhrase;

    // 3. Build Phonetic Phrase (Using phonetics.js and numbers.js)
    const pDayName = phonetics.days[dayNamePl] || dayNamePl;
    const pMonth = phonetics.months[monthGenitive[monthIndex]] || monthGenitive[monthIndex];
    const pDayNum = getPhoneticDay(day);
    const pYear = getYearPhonetic(year);

    const phoneticPhrase = `${pDayName}, ${pDayNum} ${pMonth}${includeYear ? ` ${pYear}` : ''}`;
    document.getElementById('phoneticPhrase').innerText = phoneticPhrase;

    // 4. Update English Translation
    document.getElementById('enPhrase').innerText = date.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: includeYear ? 'numeric' : undefined 
    });

    // 5. Update Seasonal Theme (Optional - based on styles.css)
    const season = culturalData.months[monthIndex].season;
    document.body.className = season; 
}
