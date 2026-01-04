import culturalData from './cultural.js';
import phonetics from './phonetics.js';
import yearData from './year.js';
import { getWrittenDay } from './numbers.js';

export function updateInfoPanel(selectedDate, includeYear) {
    const mIdx = selectedDate.getMonth();
    const dayNamePl = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"][selectedDate.getDay()];
    
    // 1. Get Written Polish (Genitive Case)
    const monthGen = culturalData.months[mIdx].pl
        .replace(/ń$/, 'nia').replace(/ec$/, 'ca').replace(/y$/, 'ego').toLowerCase();
    const dayNumPl = getWrittenDay(selectedDate.getDate());
    const yearPl = yearData.getYearInPolish(selectedDate.getFullYear());

    // 2. Get Phonetics from your mapping
    const pDayName = phonetics.days[dayNamePl] || dayNamePl;
    const pMonth = phonetics.months[monthGen] || monthGen;
    const pDayNum = phonetics.numbers[selectedDate.getDate()] || selectedDate.getDate();
    const pYear = yearData.getYearPhonetic(selectedDate.getFullYear());

    // 3. Render to HTML
    document.getElementById('plPhrase').innerText = `${dayNamePl}, ${dayNumPl} ${monthGen} ${includeYear ? yearPl : ""}`;
    document.getElementById('phoneticPhrase').innerText = `${pDayName}, ${pDayNum} ${pMonth} ${includeYear ? pYear : ""}`;
    document.getElementById('enPhrase').innerText = selectedDate.toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'long', year: includeYear ? 'numeric' : undefined 
    });
}
