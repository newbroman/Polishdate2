import culturalData from './cultural.js';
import phonetics from './phonetics.js';
import { getPhoneticDay, getYearPolish, getYearPhonetic, getWrittenDay } from './numbers.js';

/**
 * Updates the main information panel with the selected date.
 * Displays written Polish words for the Day and Year, along with Phonetics.
 */
export function updateInfoPanel(date, includeYear) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    // 1. Month Names (Genitive Case - e.g., "stycznia")
    const monthGenitive = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];

    // 2. Build the Main Polish Phrase (Written words, no numerals)
    const dayNamePl = culturalData.days[dayOfWeek].pl.toLowerCase();
    const dayWrittenPl = getWrittenDay(day); // Converts "6" to "szóstego"
    const yearPl = getYearPolish(year);     // Converts "2026" to "dwutysięczny dwudziesty szósty"
    
    const fullPlPhrase = `${dayNamePl}, ${dayWrittenPl} ${monthGenitive[monthIndex]}${includeYear ? ` ${yearPl}` : ''}`;
    document.getElementById('plPhrase').innerText = fullPlPhrase;

    // 3. Build the Phonetic Phrase
    const pDayName = phonetics.days[dayNamePl] || dayNamePl;
    const pDayNum = getPhoneticDay(day);    // Pulls "shooss-teh-go" from phonetics.js
    const pMonth = phonetics.months[monthGenitive[monthIndex]] || monthGenitive[monthIndex];
    const pYear = getYearPhonetic(year);    // Pulls year phonetics

    const fullPhoneticPhrase = `${pDayName}, ${pDayNum} ${pMonth}${includeYear ? ` ${pYear}` : ''}`;
    document.getElementById('phoneticPhrase').innerText = fullPhoneticPhrase;

    // 4. Update the English Translation
    document.getElementById('enPhrase').innerText = date.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: includeYear ? 'numeric' : undefined 
    });

    // 5. Update UI Seasonal Theme
    const season = culturalData.months[monthIndex].season;
    document.body.className = season; 
}
