import phonetics from './phonetics.js';

/**
 * Logic for Ordinal Days (1st, 2nd... 31st)
 * In Polish dates, these are always in the Genitive case (ending in -ego).
 */
export function getPhoneticDay(day) {
    // These should be defined in your phonetics.js as ordinalDays: { 1: "pyer-vshe-go", ... }
    return phonetics.ordinalDays[day] || day;
}

/**
 * Logic for Ordinal Years (0 - 3000)
 * Years in Polish dates are treated as long ordinal numbers.
 */
export function getYearPolish(year) {
    if (year === 0) return "zerowy";
    
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;

    let parts = [];

    // 1. Thousands
    const thousandsMap = {
        1: "tysiąc",
        2: "dwutysięczny" // 2000 is special in Polish dates
    };
    if (thousands > 0) {
        // If it's exactly 1000 or 2000 with no remainder, use the ordinal form
        if (hundreds === 0 && lastTwo === 0) {
            parts.push(thousands === 1 ? "tysięczny" : "dwutysięczny");
        } else {
            parts.push(thousands === 1 ? "tysiąc" : "dwa tysiące");
        }
    }

    // 2. Hundreds
    const hundredsMap = {
        1: "sto", 2: "dwieście", 3: "trzysta", 4: "czterysta", 
        5: "pięćset", 6: "sześćset", 7: "siedemset", 8: "osiemset", 9: "dziewięćset"
    };
    if (hundreds > 0) {
        if (lastTwo === 0) {
            // Ordinal form for flat hundreds (e.g., 1900th)
            const hundredsOrdinal = { 1: "setny", 9: "dziewięćsetny" }; // simplify for common uses
            parts.push(hundredsOrdinal[hundreds] || hundredsMap[hundreds]);
        } else {
            parts.push(hundredsMap[hundreds]);
        }
    }

    // 3. Last Two Digits (Ordinal)
    if (lastTwo > 0) {
        parts.push(getSmallOrdinalPl(lastTwo));
    }

    return parts.join(" ");
}

/**
 * Logic for Year Phonetics (0 - 3000)
 */
export function getYearPhonetic(year) {
    const thousands = Math.floor(year / 1000);
    const lastTwo = year % 100;

    // Simplified phonetic builder for the 2000s
    if (thousands === 2) {
        let p = "dvoo-ti-syench-ni";
        if (lastTwo > 0) {
            p += " " + (phonetics.ordinals[lastTwo] || "");
        }
        return p;
    }
    
    // Fallback for other centuries using your phonetics.js mapping
    return phonetics.years[year] || year.toString();
}

/**
 * Helper for numbers 1-99 in Ordinal Polish
 */
function getSmallOrdinalPl(n) {
    const units = ["", "pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty"];
    const teens = ["dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty"];
    const tens = ["", "", "dwudziesty", "trzydziesty", "czterdziesty", "pięćdziesiąty", "sześćdziesiąty", "siedemdziesiąty", "osiemdziesiąty", "dziewięćdziesiąty"];

    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    
    const tenPart = tens[Math.floor(n / 10)];
    const unitPart = units[n % 10];
    return (tenPart + " " + unitPart).trim();
}
