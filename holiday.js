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
        "11-6": "Miko ląjki 🎅",
        "11-24": "Wigilia Bożego Narodzenia",
        "11-25": "Boże Narodzenie",
        "11-26": "Drugi Dzień Świąt"
    },

    // Cultural descriptions for the Hub
    descriptions: {
        "Nowy Rok": "New Year's Day. A quiet day of rest after the 'Sylwester' (New Year's Eve) celebrations.",
        "Święto Trzech Króli": "Epiphany. Poles mark 'K+M+B' in chalk on their doors to bless their homes.",
        "Dzień Babci 👵": "Grandmother's Day. Children visit their grandmothers with flowers and handmade gifts.",
        "Dzień Dziadka 👴": "Grandfather's Day. A day to honor grandfathers, celebrated right after Grandmother's day.",
        "Dzień Kobiet 🌷": "International Women's Day. Traditionally, women in Poland receive carnations or tulips.",
        "Prima Aprilis 🤡": "April Fools' Day. A day of pranks and jokes; even news outlets join in the fun.",
        "Święto Pracy": "Labor Day. A public holiday often marked by spring walks and family gatherings.",
        "Święto Konstytucji 3 Maja": "Constitution Day. Commemorates Europe's first modern constitution, signed in 1791.",
        "Dzień Matki 💐": "Mother's Day. Moms are celebrated with 'laurki' (handmade cards) and flowers.",
        "Dzień Dziecka 🧸": "Children's Day. Schools often host fun events, and kids receive small gifts or sweets.",
        "Dzień Ojca 👔": "Father's Day. A day to celebrate dads with family dinners and gifts.",
        "Wniebowzięcie NMP": "Assumption of Mary. Also Armed Forces Day, featuring military parades and herbal bouquets.",
        "Wszystkich Świętych": "All Saints' Day. Poles visit cemeteries to light 'znicze' (lanterns) for their ancestors.",
        "Narodowe Święto Niepodległości": "Independence Day. Celebrating the restoration of Poland's sovereignty in 1918.",
        "Andrzejki 🕯️": "St. Andrew's Eve. A night of magic and fortune-telling, like pouring hot wax through a key.",
        "Mikołajki 🎅": "St. Nicholas Day. Small gifts are hidden under pillows or in shoes for children to find.",
        "Wigilia Bożego Narodzenia": "Christmas Eve. The most important Polish celebration featuring a 12-dish meatless supper.",
        "Boże Narodzenie": "Christmas Day. A day for family visits, church, and singing 'kolędy' (carols).",
        "Drugi Dzień Świąt": "Boxing Day / St. Stephen's. A day for visiting extended family and relaxing.",
        "Wielkanoc 🐣": "Easter Sunday. A major family celebration featuring the 'Święconka' (blessed food basket).",
        "Tłusty Czwartek 🍩": "Fat Thursday. The day everyone eats 'pączki' (donuts) to prepare for Lent.",
        "Środa Popielcowa": "Ash Wednesday. Marking the beginning of Lent; a day of reflection and fasting.",
        "Lany Poniedziałek 💧": "Easter Monday (Śmigus-Dyngus). A playful tradition of throwing water for luck.",
        "Zielone Świątki": "Pentecost. Celebrating the descent of the Holy Spirit; often linked to rural folk traditions.",
        "Boże Ciało": "Corpus Christi. Large colorful religious processions take place through the streets."
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

        holidays[`${easter.getMonth()}-${easter.getDate()}`] = "Wielkanoc 🐣";

        const fatThursday = new Date(easter);
        fatThursday.setDate(easter.getDate() - 52);
        holidays[`${fatThursday.getMonth()}-${fatThursday.getDate()}`] = "Tłusty Czwartek 🍩";

        const ashWed = new Date(easter);
        ashWed.setDate(easter.getDate() - 46);
        holidays[`${ashWed.getMonth()}-${ashWed.getDate()}`] = "Środa Popielcowa";

        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        holidays[`${easterMonday.getMonth()}-${easterMonday.getDate()}`] = "Lany Poniedziałek 💧";

        const pentecost = new Date(easter);
        pentecost.setDate(easter.getDate() + 49);
        holidays[`${pentecost.getMonth()}-${pentecost.getDate()}`] = "Zielone Świątki";

        const corpus = new Date(easter);
        corpus.setDate(easter.getDate() + 60);
        holidays[`${corpus.getMonth()}-${corpus.getDate()}`] = "Boże Ciało";

        return holidays;
    }
};

export default holidayData;
