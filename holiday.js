/**
 * holiday.js
 * Handles fixed and moveable Polish holidays and cultural traditions.
 */

const holidayData = {
    fixed: {
        "0-1": "Nowy Rok",
        "0-6": "Święto Trzech Króli",
        "0-21": "Dzień Babci 👵",
        "0-22": "Dzień Dziadka 👴",
        "2-8": "Dzień Kobiet 🌷",
        "3-1": "Prima Aprilis 🤡",
        "4-1": "Święto Pracy",
        "4-3": "Święto Konstytucji 3 Maja",
        "4-26": "Dzień Matki 💐",
        "5-1": "Dzień Dziecka 🧸",
        "5-23": "Dzień Ojca 👔",
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
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, month - 1, day);
    },

    getHolidaysForYear(year) {
        const holidays = { ...this.fixed };
        const easter = this.getEaster(year);

        // Easter Sunday
        holidays[`${easter.getMonth()}-${easter.getDate()}`] = "Wielkanoc 🐣";

        // Fat Thursday (52 days before Easter)
        const fatThursday = new Date(easter);
        fatThursday.setDate(easter.getDate() - 52);
        holidays[`${fatThursday.getMonth()}-${fatThursday.getDate()}`] = "Tłusty Czwartek 🍩";

        // Ash Wednesday (46 days before Easter)
        const ashWed = new Date(easter);
        ashWed.setDate(easter.getDate() - 46);
        holidays[`${ashWed.getMonth()}-${ashWed.getDate()}`] = "Środa Popielcowa";

        // Easter Monday (1 day after)
        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        holidays[`${easterMonday.getMonth()}-${easterMonday.getDate()}`] = "Lany Poniedziałek 💧";

        // Pentecost (49 days after)
        const pentecost = new Date(easter);
        pentecost.setDate(easter.getDate() + 49);
        holidays[`${pentecost.getMonth()}-${pentecost.getDate()}`] = "Zielone Świątki";

        // Corpus Christi (60 days after)
        const corpus = new Date(easter);
        corpus.setDate(easter.getDate() + 60);
        holidays[`${corpus.getMonth()}-${corpus.getDate()}`] = "Boże Ciało";

        return holidays;
    }
};

export default holidayData;
