/**
 * holiday.js - Updated with Cultural Traditions
 */
const holidayData = {
fixed: {
        "0-1": "Nowy Rok",
        "0-6": "Święto Trzech Króli",
        "0-21": "Dzień Babci 👵",         // Grandmother's Day
        "0-22": "Dzień Dziadka 👴",       // Grandfather's Day
        "2-8": "Dzień Kobiet 🌷",        // Women's Day (Mar 8)
        "3-1": "Prima Aprilis 🤡",       // April Fools (Apr 1)
        "4-1": "Święto Pracy",
        "4-3": "Święto Konstytucji 3 Maja",
        "5-1": "Dzień Dziecka 🧸",        // Children's Day (Jun 1)
        "7-15": "Wniebowzięcie NMP",
        "10-1": "Wszystkich Świętych",
        "10-11": "Narodowe Święto Niepodległości",
        "10-29": "Andrzejki 🕯️",
        "11-6": "Mikołajki 🎅",
        "11-24": "Wigilia Bożego Narodzenia",
        "11-25": "Boże Narodzenie",
        "11-26": "Drugi Dzień Świąt"
    },

    getEaster(year) {
        // ... (Keep your existing Anonymous Gregorian Algorithm here)
        const a = year % 19; const b = Math.floor(year / 100); const c = year % 100;
        const d = Math.floor(b / 4); const e = b % 4; const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3); const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4); const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, month - 1, day);
    },

    getHolidaysForYear(year) {
        const holidays = { ...this.fixed };
        const easter = this.getEaster(year);

        // Fat Thursday (52 days before Easter)
        const fatThursday = new Date(easter);
        fatThursday.setDate(easter.getDate() - 52);
        holidays[`${fatThursday.getMonth()}-${fatThursday.getDate()}`] = "Tłusty Czwartek 🍩";

        // Ash Wednesday (46 days before Easter)
        const ashWed = new Date(easter);
        ashWed.setDate(easter.getDate() - 46);
        holidays[`${ashWed.getMonth()}-${ashWed.getDate()}`] = "Środa Popielcowa";

        // Easter Monday
        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        holidays[`${easterMonday.getMonth()}-${easterMonday.getDate()}`] = "Lany Poniedziałek 💧";

        // Corpus Christi (60 days after)
        const corpus = new Date(easter);
        corpus.setDate(easter.getDate() + 60);
        holidays[`${corpus.getMonth()}-${corpus.getDate()}`] = "Boże Ciało";

        return holidays;
    }
};

export default holidayData;
     * Returns an object of all significant holidays for a given year.
     * Logic updated to return Polish names directly as strings.
     */
    getHolidaysForYear(year) {
        const holidays = {};

        // 1. Add Fixed Holidays
        Object.keys(this.fixed).forEach(key => {
            holidays[key] = this.fixed[key];
        });

        // 2. Calculate Moveable Holidays
        const easter = this.getEaster(year);

       // Start by copying the fixed dates
        const holidays = { ...this.fixed };
        
        // Get Easter for the specific year requested
        const easter = this.getEaster(year);

        // Calculate Fat Thursday (52 days before)
        const fatThursday = new Date(easter);
        fatThursday.setDate(easter.getDate() - 52);
        holidays[`${fatThursday.getMonth()}-${fatThursday.getDate()}`] = "Tłusty Czwartek 🍩";
             
        // Easter Monday (Poniedziałek Wielkanocny) - 1 day after Easter
        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        holidays[`${easterMonday.getMonth()}-${easterMonday.getDate()}`] = "Poniedziałek Wielkanocny";

        // Corpus Christi (Boże Ciało) - 60 days after Easter
        const corpusChristi = new Date(easter);
        corpusChristi.setDate(easter.getDate() + 60);
        holidays[`${corpusChristi.getMonth()}-${corpusChristi.getDate()}`] = "Boże Ciało";

        // Pentecost (Zielone Świątki) - 49 days after Easter
        const pentecost = new Date(easter);
        pentecost.setDate(easter.getDate() + 49);
        holidays[`${pentecost.getMonth()}-${pentecost.getDate()}`] = "Zielone Świątki";

        return holidays;
    }
};

export default holidayData;
