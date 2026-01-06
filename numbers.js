import phonetics from './phonetics.js';

/**
 * Logic for Ordinal Days (1st, 2nd... 31st)
 */
export function getPhoneticDay(day) {
    return phonetics.ordinalDays[day] || day;
}

/**
 * Logic for Ordinal Years (0 - 3000) - Written Polish
 */
export function getYearPolish(year) {
    if (year === 0) return "zerowy";
    
    const thousands = Math.floor(year / 1000);
    const hundreds = Math.floor((year % 1000) / 100);
    const lastTwo = year % 100;
    let parts = [];

    // 1. Thousands
    if (thousands > 0) {
        if (hundreds === 0 && lastTwo === 0) {
            parts.push(thousands === 1 ? "tysięczny" : (thousands === 2 ? "dwutysięczny" : "trzytysięczny"));
        } else {
            parts.push(thousands === 1 ? "tysiąc" : (thousands === 2 ? "dwa tysiące" : "trzy tysiące"));
        }
    }

    // 2. Hundreds
    const hundredsMap = {
        1: "sto", 2: "dwieście", 3: "trzysta", 4: "czterysta", 5: "pięćset", 
        6: "sześćset", 7: "siedemset", 8: "osiemset", 9: "dziewięćset"
    };
    const hundredsOrdinal = { 1: "setny", 2: "dwusetny", 3: "trzystusetny", 9: "dziewięćsetny" };

    if (hundreds > 0) {
        if (lastTwo === 0) {
            parts.push(hundredsOrdinal[hundreds] || hundredsMap[hundreds]);
        } else {
            parts.push(hundredsMap[hundreds]);
        }
    }

    // 3. Last Two Digits
    if (lastTwo > 0) {
        parts.push(getSmallOrdinalPl(lastTwo));
    }

    return parts.join(" ");
}

/**
 * Logic for Year Phonetics (0 - 3000) - Building sounds algorithmically
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
            pParts.push(thousands === 1 ? "ti-syench-ni" : "dvoo-ti-syench-ni");
        } else {
            pParts.push(thousands === 1 ? "ti-syonts" : "dva ti-syont-se");
        }
    }

    // 2. Hundreds Phonetic
    const pHundreds = { 1: "sto", 4: "chter-is-ta", 9: "jyev-yen-set" }; 
    if (hundreds > 0) {
        pParts.push(pHundreds[hundreds] || "hundreds-sound"); // Add specific sounds to phonetics.js as needed
    }

    // 3. Last Two (Ordinals from phonetics.js)
    if (lastTwo > 0) {
        pParts.push(phonetics.ordinals[lastTwo] || "");
    }

    return pParts.join(" ");
}

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
