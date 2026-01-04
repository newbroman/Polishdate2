import culturalData from './cultural.js';
import phonetics from './phonetics.js';
import yearData from './year.js';
import { getWrittenDay } from './numbers.js';

export function updateDateDisplay(selectedDate, includeYear) {
    const mIdx = selectedDate.getMonth();
    const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][selectedDate.getDay()];
    const dayNamePl = culturalData.days[dayKey].split(' ')[0];
    
    // Genitive conversion logic
    const monthGen = culturalData.months[mIdx].pl
        .replace(/ń$/, 'nia').replace(/ec$/, 'ca').replace(/y$/, 'ego').toLowerCase();
    
    const dayNumWritten = getWrittenDay(selectedDate.getDate());
    const yearPl = yearData.getYearInPolish(selectedDate.getFullYear());

    // Phonetic mapping
    const pDayName = phonetics.days[dayNamePl.toLowerCase()] || dayNamePl;
    const pMonth = phonetics.months[monthGen] || monthGen;
    const pYear = yearData.getYearPhonetic(selectedDate.getFullYear());
    const pDayNum = phonetics.numbers[selectedDate.getDate()] || selectedDate.getDate();

    const plDate = `${dayNamePl}, ${dayNumWritten} ${monthGen}`;
    const phDate = `${pDayName}, ${pDayNum} ${pMonth}`;

    document.getElementById('plPhrase').innerText = includeYear ? `${plDate} ${yearPl}` : plDate;
    document.getElementById('phoneticPhrase').innerText = includeYear ? `${phDate} ${pYear}` : phDate;
}
