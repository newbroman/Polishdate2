import culturalData from './cultural.js';
import phonetics from './phonetics.js';
import yearData from './year.js';
import { getWrittenDay } from './numbers.js';

export function updateInfoPanel(selectedDate, includeYear) {
    const mIdx = selectedDate.getMonth();
    const dayNamePl = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"][selectedDate.getDay()];

export function updateInfoPanel(date, includeYear) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthGenitive = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];

    // FIX: Use Nominative Ordinals for the year (matching your rules page)
    const yearPl = year === 2024 ? "dwutysięczny dwudziesty czwarty" : 
                    year === 2025 ? "dwutysięczny dwudziesty piąty" : 
                    year === 2026 ? "dwutysięczny dwudziesty szósty" : `${year}`;

    const yearPhonetic = year === 2024 ? "dvoo-ti-syench-ni dvoo-dyess-ti chvar-ti" :
                         year === 2025 ? "dvoo-ti-syench-ni dvoo-dyess-ti pyon-ti" :
                         year === 2026 ? "dvoo-ti-syench-ni dvoo-dyess-ti shooss-ti" : "";

    const plDate = `${getOrdinalDay(day)} ${monthGenitive[monthIndex]}${includeYear ? ` ${yearPl}` : ''}`;
    document.getElementById('plPhrase').innerText = plDate;

    // Update Phonetic to match the Help page exactly
    const phoneticMonth = ["stich-nya", "loo-te-go", "mar-tsa", "kyev-tnya", "ma-ya", "cherv-tsa",
                           "leep-tsa", "syerp-nya", "vzhye-shnya", "paz-dzhyer-nee-ka", "lees-to-pa-da", "grood-nya"][monthIndex];
    
    document.getElementById('phoneticPhrase').innerText = `${day} ${phoneticMonth}${includeYear ? ` ${yearPhonetic}` : ''}`;
}

function getOrdinalDay(day) {
    const ordinals = ["pierwszego", "drugiego", "trzeciego", "czwartego", "piątego", "szóstego", "siódmego", "ósmego", "dziewiątego", "dziesiątego"];
    return day <= 10 ? ordinals[day-1] : day; // Simplified for this example
}
    
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
