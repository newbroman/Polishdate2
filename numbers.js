/**
 * numbers.js - Logic for converting numbers to Polish words and phonetics
 */
import phonetics from './phonetics.js';

/**
 * Returns the written Polish ordinal day (Nominative Case)
 * used for the text display.
 */
export function getWrittenDay(day) {
    const writtenDays = {
        1: "Pierwszy", 2: "Drugi", 3: "Trzeci", 4: "Czwarty", 5: "Piąty",
        6: "Szósty", 7: "Siódmy", 8: "Ósmy", 9: "Dziewiąty", 10: "Dziesiąty",
        11: "Jedenasty", 12: "Dwunasty", 13: "Trzynasty", 14: "Czternasty",
        15: "Piętnasty", 16: "Szesnasty", 17: "Siedemnasty", 18: "Osiemnasty",
        19: "Dziewiętnasty", 20: "Dwudziesty", 21: "Dwudziesty pierwszy",
        22: "Dwudziesty drugi", 23: "Dwudziesty trzeci", 24: "Dwudziesty czwarty",
        25: "Dwudziesty piąty", 26: "Dwudziesty szósty", 27: "Dwudziesty siódmy",
        28: "Dwudziesty ósmy", 29: "Dwudziesty dziewiąty", 30: "Trzydziesty",
        31: "Trzydziesty pierwszy"
    };
    return writtenDays[day] || day.toString();
}

/**
 * Returns the Phonetic Day from phonetics.js
 */
export function getPhoneticDay(day) {
    return phonetics.ordinalDays[day] || day.toString();
}

/**
 * Builds the Phonetic Year (0-3000) using phonetics.js
 */
export function getYearPhonetic(year) {
    if (year === 0) return "ze-ro-vi";
    
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let pParts = [];

    // 1. Thousands Phonetic
    if (thousands > 0) {
        if (hundreds === 0 && lastTwo === 0) {
            pParts.push(thousands === 1 ? "ti-syench-ni" : (thousands === 2 ? "dvoo-ti-syench-ni" : "t-she-ti-syench-ni"));
        } else {
            pParts.push(thousands === 1 ? "ti-syonts" : (thousands === 2 ? "dva ti-syont-se" : "t-she ti-syont-se"));
        }
    }

    // 2. Hundreds Phonetic
    const pHundreds = { 
        1: "sto", 2: "dvyeh-sh-tsyeh", 3: "t-sheh-stah", 4: "chter-is-ta", 
        5: "pyent-set", 6: "shes-set", 7: "shye-dem-set", 8: "oh-syem-set", 9: "jyev-yen-set" 
    };
    if (hundreds > 0) pParts.push(pHundreds[hundreds]);

    // 3. Last Two (Ordinals from phonetics.js)
    if (lastTwo > 0) {
        // Special logic for numbers like 25 (20 + 5)
        if (phonetics.ordinals[lastTwo]) {
            pParts.push(phonetics.ordinals[lastTwo]);
        } else {
            const tens = Math.floor(lastTwo / 10) * 10;
            const units = lastTwo % 10;
            if (phonetics.ordinals[tens]) pParts.push(phonetics.ordinals[tens]);
            if (phonetics.ordinals[units]) pParts.push(phonetics.ordinals[units]);
        }
    }

    return pParts.join(" ");
}

/**
 * Logic for Written Ordinal Years
 */
export function getYearPolish(year) {
    if (year === 0) return "zerowy";
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let parts = [];

    if (thousands > 0) {
        if (hundreds === 0 && lastTwo === 0) {
            parts.push(thousands === 1 ? "tysięczny" : (thousands === 2 ? "dwutysięczny" : "trzytysięczny"));
        } else {
            parts.push(thousands === 1 ? "tysiąc" : (thousands === 2 ? "dwa tysiące" : "trzy tysiące"));
        }
    }

    const hundredsMap = { 1: "sto", 2: "dwieście", 3: "trzysta", 4: "czterysta", 5: "pięćset", 6: "sześćset", 7: "siedemset", 8: "osiemset", 9: "dziewięćset" };
    if (hundreds > 0) parts.push(hundredsMap[hundreds]);

    if (lastTwo > 0) {
        const units = ["", "pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty"];
        const teens = ["dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty"];
        const tens = ["", "", "dwudziesty", "trzydziesty", "czterdziesty", "pięćdziesiąty", "sześćdziesiąty", "siedemdziesiąty", "osiemdziesiąty", "dziewięćdziesiąty"];

        if (lastTwo < 10) parts.push(units[lastTwo]);
        else if (lastTwo < 20) parts.push(teens[lastTwo - 10]);
        else {
            parts.push(tens[Math.floor(lastTwo / 10)]);
            if (lastTwo % 10 !== 0) parts.push(units[lastTwo % 10]);
        }
    }
    return parts.join(" ");
}
