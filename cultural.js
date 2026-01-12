/**
 * cultural.js - Complete Background data synced with holidayData
 */

const culturalData = {
    months: [
        {
            pl: "stycznia",
            en: "January",
            season: "winter",
            derivation: "From 'stykać' (to connect), as the month connects the old and the new year. Historically also related to 'tyki' (poles) used by farmers."
        },
        {
            pl: "lutego",
            en: "February",
            season: "winter",
            derivation: "Named after the archaic word 'luty', meaning 'harsh', 'fierce', or 'frosty', referring to the severe Polish winter freezes."
        },
        {
            pl: "marca",
            en: "March",
            season: "spring",
            derivation: "Derived from the Latin 'Martius' (Mars). In old Slavic, it was sometimes called 'brzezień' from the birch trees (brzoza) that began to wake."
        },
        {
            pl: "kwietnia",
            en: "April",
            season: "spring",
            derivation: "Literally the 'blooming month'. Derived from 'kwiat' (flower), as plants begin to bloom across the Polish landscape."
        },
        {
            pl: "maja",
            en: "May",
            season: "spring",
            derivation: "Adopted from the Latin 'Maius' (named after the goddess Maia). It is traditionally considered the most beautiful month in Poland."
        },
        {
            pl: "czerwca",
            en: "June",
            season: "summer",
            derivation: "Derived from 'czerwie' (larvae). Historically, this was when the 'Polish cochineal' insect was harvested to produce a valuable red dye."
        },
        {
            pl: "lipca",
            en: "July",
            season: "summer",
            derivation: "Named after the 'lipa' (linden or lime tree), which blossoms in July, filling the Polish air with a distinct, sweet fragrance."
        },
        {
            pl: "sierpnia",
            en: "August",
            season: "summer",
            derivation: "Named after the 'sierp' (sickle), the tool traditionally used by Polish farmers to harvest grain during this month."
        },
        {
            pl: "września",
            en: "September",
            season: "autumn",
            derivation: "Derived from 'wrzosy' (heather). This is the time when the purple heather plants bloom beautifully in Polish forests."
        },
        {
            pl: "października",
            en: "October",
            season: "autumn",
            derivation: "From 'paździer' (flax husks). Historically, this was the month when Polish peasants processed flax and hemp to create linen."
        },
        {
            pl: "listopada",
            en: "November",
            season: "autumn",
            derivation: "A beautiful compound word: 'liść' (leaf) and 'padać' (to fall). It literally translates to 'the falling of the leaves'."
        },
        {
            pl: "grudnia",
            en: "December",
            season: "winter",
            derivation: "Derived from 'gruda' (a frozen lump of earth). It refers to the ground freezing solid as the deep winter sets in."
        }
    ],
    days: [
        { pl: "Niedziela", meaning: "From 'nie działać' (not working). The day of rest." },
        { pl: "Poniedziałek", meaning: "Means 'after Sunday' (po niedzieli)." },
        { pl: "Wtorek", meaning: "From 'wtóry' (second). The second day of the week." },
        { pl: "Środa", meaning: "Means 'middle' (środek), the midpoint of the working week." },
        { pl: "Czwartek", meaning: "From 'czwarty' (fourth day)." },
        { pl: "Piątek", meaning: "From 'piąty' (fifth day)." },
        { pl: "Sobota", meaning: "Derived from 'Sabbath' (Szabat)." }
    ],

    holidayExplanations: {
        // --- Fixed Dates ---
        "0-1": "Nowy Rok: The start of the New Year, celebrated with fireworks.",
        "0-6": "Trzech Króli: Epiphany. Many Poles write 'K+M+B' in chalk on their doors.",
        "0-21": "Dzień Babci: Grandmothers receive flowers and handmade cards from grandchildren.",
        "0-22": "Dzień Dziadka: A day to honor grandfathers for their wisdom and care.",
        "2-8": "Dzień Kobiet: International Women's Day. In Poland, it is common to give tulips to women.",
        "3-1": "Prima Aprilis: April Fools' Day. A day for jokes, hoaxes, and lighthearted fun.",
        "4-1": "Święto Pracy: Labor Day. Often the start of 'Majówka', the great Polish BBQ weekend.",
        "4-3": "Święto Konstytucji: Commemorating the 1791 Constitution, Europe's first modern constitution.",
        "4-26": "Dzień Matki: Mother's Day. Children honor their moms with 'laurki' (handmade cards).",
        "5-1": "Dzień Dziecka: Children's Day. Kids usually get small gifts or special trips to the park.",
        "5-23": "Dzień Ojca: Father's Day. A time to celebrate dads and their role in the family.",
        "7-15": "Wniebowzięcie / Wojska Polskiego: A double holiday celebrating Mary and the Polish Army.",
        "10-1": "Wszystkich Świętych: All Saints' Day. Millions of candles (znicze) light up cemeteries at night.",
        "10-11": "Święto Niepodległości: Independence Day. Celebrating the rebirth of Poland in 1918.",
        "10-29": "Andrzejki: St. Andrew’s Eve. A night of fortune-telling, like pouring hot wax through a key.",
        "11-6": "Mikołajki: St. Nicholas Day. Kids find small gifts or chocolates in their clean boots.",
        "11-24": "Wigilia: Christmas Eve. The most sacred night, involving a 12-dish meatless supper.",
        "11-25": "Boże Narodzenie: Christmas Day. A quiet time for family and singing carols (kolędy).",
        "11-26": "Drugi Dzień Świąt: Also known as St. Stephen’s Day; a day for visiting friends.",

        // --- Moveable Feasts (Keys added dynamically by holiday.js) ---
        "Tłusty Czwartek 🍩": "Fat Thursday: The last Thursday before Lent. Everyone must eat at least one pączek (donut) for good luck!",
        "Środa Popielcowa": "Ash Wednesday: Marks the beginning of Lent. Faithful have ashes placed on their foreheads.",
        "Wielkanoc 🐣": "Easter Sunday: Celebrated with a festive breakfast including blessed eggs (pisanki).",
        "Lany Poniedziałek 💧": "Wet Monday (Śmigus-Dyngus): A fun tradition of splashing friends and family with water!",
        "Zielone Świątki": "Pentecost: An old agricultural holiday where homes were decorated with green branches.",
        "Boże Ciało": "Corpus Christi: Famous for massive outdoor processions through flower-covered streets."
    }
};

export function getCulturalHTML() {
    // 1. Generate Months Section
    const monthsHtml = culturalData.months.map((info) => {
        const capitalizedMonth = info.pl.charAt(0).toUpperCase() + info.pl.slice(1);
        const seasonClass = info.season.split(' ')[0].toLowerCase();

        return `
            <div class="info-block ${seasonClass}">
                <h3>${capitalizedMonth}</h3>
                <p><strong>English:</strong> ${info.en}</p>
                <p><strong>Origin:</strong> ${info.derivation}</p>
                <span class="badge">${info.season.toUpperCase()}</span>
            </div>
        `;
    }).join('');

    // 2. Generate Days Section
    const daysHtml = culturalData.days.map((info) => `
        <div class="info-block">
            <h3>${info.pl}</h3>
            <p>${info.meaning}</p>
        </div>
    `).join('');

    // 3. NEW: Generate Holidays Section
    // This loops through the holidayExplanations object you have in your data
    const holidaysHtml = Object.entries(culturalData.holidayExplanations).map(([key, description]) => `
        <div class="info-block holiday-block">
            <p>${description}</p>
        </div>
    `).join('');

    return `
        <div class="culture-container">
            <h2 class="section-title">The Origins of Polish Dates</h2>
            
            <div class="culture-section">
                <h3 class="subsection-title">Months & Seasons</h3>
                <div class="culture-grid">${monthsHtml}</div>
            </div>

            <div class="culture-section">
                <h3 class="subsection-title">Days of the Week</h3>
                <div class="culture-grid">${daysHtml}</div>
            </div>

            <div class="culture-section">
                <h3 class="subsection-title">Significant Holidays & Traditions</h3>
                <div class="culture-grid">${holidaysHtml}</div>
            </div>

            <button class="pill-btn" onclick="document.getElementById('navCalendar').click()">Back to Calendar</button>
        </div>
    `;
}

export default culturalData;
