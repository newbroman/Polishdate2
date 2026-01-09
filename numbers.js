/**
 * numbers.js - Logic for Polish number-to-word conversion.
 * Default set to Genitive (Event Case) as requested.
 */
import phonetics from './phonetics.js';

/**
 * Returns the written Polish ordinal day.
 * @param {boolean} isNominative - Default is false (loads Genitive: "drugiego").
 */
export function getWrittenDay(day, isNominative = false) {
    const nominativeDays = {
        1: "pierwszy", 2: "drugi", 3: "trzeci", 4: "czwarty", 5: "piąty",
        6: "szósty", 7: "siódmy", 8: "ósmy", 9: "dziewiąty", 10: "dziesiąty",
        11: "jedenasty", 12: "dwunasty", 13: "trzynasty", 14: "czternasty",
        15: "piętnasty", 16: "szesnasty", 17: "siedemnasty", 18: "osiemnasty",
        19: "dziewiętnasty", 20: "dwudziesty", 21: "dwudziesty pierwszy",
        22: "dwudziesty drugi", 23: "dwudziesty trzeci", 24: "dwudziesty czwarty",
        25: "dwudziesty piąty", 26: "dwudziesty szósty", 27: "dwudziesty siódmy",
        28: "dwudziesty ósmy", 29: "dwudziesty dziewiąty", 30: "trzydziesty",
        31: "trzydziesty pierwszy"
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

    return isNominative ? nominativeDays[day] : genitiveDays[day];
}

/**
 * Returns the Phonetic Day.
 */
export function getPhoneticDay(day, isNominative = false) {
    if (!isNominative) {
        if (phonetics.ordinalDaysGenitive && phonetics.ordinalDaysGenitive[day]) {
            return phonetics.ordinalDaysGenitive[day];
        }
        // Fallback: Strip the 'y' or 'ee' and add 'eh-go'
        let base = phonetics.ordinalDays[day] || "";
        return base.replace(/-ee$/, "").replace(/-y$/, "") + "-eh-go";
    }
    // If it's 'Spoken' mode (Nominative), return the standard ordinal sound
    return phonetics.ordinalDays[day] || day.toString();
}
/**
 * Written Year Logic (Always Genitive for dates).
 */
export function getYearPolish(year) {
    if (year === 0) return "zerowego";
    
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let parts = [];

    if (thousands > 0) {
        const thousandsMap = { 1: "tysiąc", 2: "dwa tysiące", 3: "trzy tysiące" };
        parts.push(thousandsMap[thousands] || `${thousands} tysięcy`);
    }

    const hundredsMap = { 
        1: "sto", 2: "dwieście", 3: "trzysta", 4: "czterysta", 5: "pięćset", 
        6: "sześćset", 7: "siedemset", 8: "osiemset", 9: "dziewięćset" 
    };
    if (hundreds > 0) parts.push(hundredsMap[hundreds]);

    if (lastTwo > 0 || (thousands === 0 && hundreds === 0)) {
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

        // Convert year to Genitive: -y/-i becomes -ego/-iego
        yearWord = yearWord.replace(/y /g, "ego ").replace(/y$/, "ego").replace(/i$/, "iego");
        parts.push(yearWord);
    }
    
    return parts.join(" ");
}

/**
 * Phonetic Year Logic (Always Genitive).
 */
export function getYearPhonetic(year) {
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
        let pYear = phonetics.ordinals[lastTwo] || lastTwo.toString();
        // Fix phonetic endings to -eh-go
        pYear = pYear.replace(/-y$/, "-eh-go").replace(/-ee$/, "-eh-go");
        pParts.push(pYear);
    }

    return pParts.join(" ");
}
