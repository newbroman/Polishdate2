/**
 * numbers.js - Logic for converting numbers to Polish words and phonetics
 * Includes Nominative (Today is...) and Genitive (Meeting on...) cases.
 */
import phonetics from './phonetics.js';

/**
 * Returns the written Polish ordinal day.
 * @param {number} day - The day of the month.
 * @param {boolean} isGenitive - If true, returns "pierwszego", if false "pierwszy".
 */
export function getWrittenDay(day, isGenitive = false) {
    const nominativeDays = {
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

    const genitiveDays = {
        1: "pierwszego", 2: "drugiego", 3: "trzeciego", 4: "czwartego", 5: "piątego",
        6: "szóstego", 7: "siódmego", 8: "ósmego", 9: "dziewiątego", 10: "dziesiątego",
        11: "jedenastego", 12: "dwunastego", 13: "trzynastego", 14: "czternastego",
        15: "piętnastego", 16: "szesnastego", 17: "siedemnastego", 18: "osiemnastego",
        19: "dziewiętnastego", 20: "dwudziestego", 21: "dwudziestego pierwszego",
        22: "dwudziestego drugiego", 23: "dwudziestego trzeciego", 24: "dwudziestego czwartego",
        25: "dwudziestego piątego", 26: "dwudziestego szóstego", 27: "dwudziestego siódmego",
        28: "dwudziestego ósmego", 29: "dwudziestego dziewiątego", 30: "trzydziestego",
        31: "trzydziestego pierwszego"
    };

    if (isGenitive) return genitiveDays[day] || day.toString();
    return nominativeDays[day] || day.toString();
}

/**
 * Returns the Phonetic Day from phonetics.js
 */
export function getPhoneticDay(day, isGenitive = false) {
    if (isGenitive) {
        // Appends "go" or "eh-go" sounds to the standard phonetic
        return phonetics.ordinalDaysGenitive[day] || phonetics.ordinalDays[day] + "-go";
    }
    return phonetics.ordinalDays[day] || day.toString();
}

/**
 * Builds the Phonetic Year using phonetics.js
 */
export function getYearPhonetic(year, isGenitive = false) {
    if (year === 0) return "ze-ro-vi";
    
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let pParts = [];

    if (thousands > 0) {
        pParts.push(thousands === 1 ? "ti-syonts" : (thousands === 2 ? "dva ti-syont-se" : "t-she ti-syont-se"));
    }

    const pHundreds = { 1: "sto", 2: "dvyeh-sh-tsyeh", 3: "t-sheh-stah", 4: "chter-is-ta", 5: "pyent-set", 6: "shes-set", 7: "shye-dem-set", 8: "oh-syem-set", 9: "jyev-yen-set" };
    if (hundreds > 0) pParts.push(pHundreds[hundreds]);

    if (lastTwo > 0) {
        let phoneticYear = phonetics.ordinals[lastTwo] || lastTwo.toString();
        // Adjust phonetic ending for Meeting Mode
        if (isGenitive) {
            phoneticYear = phoneticYear.replace(/-y$/, "-eh-go").replace(/-ee$/, "-eh-go");
        }
        pParts.push(phoneticYear);
    } else if (isGenitive) {
        // Handles even centuries like "2000" -> "tysięcznego"
        pParts[pParts.length - 1] += "-neh-go";
    }

    return pParts.join(" ");
}

/**
 * Logic for Written Ordinal Years (Now with Genitive support)
 */
export function getYearPolish(year, isGenitive = false) {
    if (year === 0) return "zerowy";
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let parts = [];

    if (thousands > 0) {
        parts.push(thousands === 1 ? "tysiąc" : (thousands === 2 ? "dwa tysiące" : "trzy tysiące"));
    }

    const hundredsMap = { 1: "sto", 2: "dwieście", 3: "trzysta", 4: "czterysta", 5: "pięćset", 6: "sześćset", 7: "siedemset", 8: "osiemset", 9: "dziewięćset" };
    if (hundreds > 0) parts.push(hundredsMap[hundreds]);

    if (lastTwo > 0) {
        const units = ["", "pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty"];
        const teens = ["dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty"];
        const tens = ["", "", "dwudziesty", "trzydziesty", "czterdziesty", "pięćdziesiąty", "sześćdziesiąty", "siedemdziesiąty", "osiemdziesiąty", "dziewięćdziesiąty"];

        let yearWord = "";
        if (lastTwo < 10) yearWord = units[lastTwo];
        else if (lastTwo < 20) yearWord = teens[lastTwo - 10];
        else {
            yearWord = tens[Math.floor(lastTwo / 10)];
            if (lastTwo % 10 !== 0) yearWord += " " + units[lastTwo % 10];
        }

        if (isGenitive) {
            // Transform to Genitive (dwudziesty -> dwudziestego)
            yearWord = yearWord.replace(/y /g, "ego ").replace(/y$/, "ego").replace(/i$/, "iego");
        }
        parts.push(yearWord);
    }
    return parts.join(" ");
}
