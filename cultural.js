/**
 * cultural.js - Categorized Background data
 */

const culturalData = {
    months: [
        { pl: "stycznia", en: "January", season: "Zima (Winter)", derivation: "From 'stykać' (to connect), as the month connects the old and the new year." },
        { pl: "lutego", en: "February", season: "Zima (Winter)", derivation: "Named after 'luty', meaning 'harsh' or 'fierce', referring to severe freezes." },
        { pl: "marca", en: "March", season: "Wiosna (Spring)", derivation: "Derived from Latin 'Martius'. In old Slavic, called 'brzezień' from birch trees." },
        { pl: "kwietnia", en: "April", season: "Wiosna (Spring)", derivation: "The 'blooming month'. Derived from 'kwiat' (flower)." },
        { pl: "maja", en: "May", season: "Wiosna (Spring)", derivation: "Adopted from Latin 'Maius'. Traditionally the most beautiful month in Poland." },
        { pl: "czerwca", en: "June", season: "Lato (Summer)", derivation: "Derived from 'czerwie' (larvae), used historically to produce red dye." },
        { pl: "lipca", en: "July", season: "Lato (Summer)", derivation: "Named after 'lipa' (linden tree), which blossoms and scents the air." },
        { pl: "sierpnia", en: "August", season: "Lato (Summer)", derivation: "Named after 'sierp' (sickle), used by farmers for the harvest." },
        { pl: "września", en: "September", season: "Jesień (Autumn)", derivation: "Derived from 'wrzosy' (heather), which blooms in Polish forests." },
        { pl: "października", en: "October", season: "Jesień (Autumn)", derivation: "From 'paździer' (flax husks), from the time of processing flax for linen." },
        { pl: "listopada", en: "November", season: "Jesień (Autumn)", derivation: "A compound of 'liść' (leaf) and 'padać' (to fall)." },
        { pl: "grudnia", en: "December", season: "Zima (Winter)", derivation: "From 'gruda' (frozen lump of earth), as the ground freezes solid." }
    ],
    days: [
        { pl: "Niedziela", meaning: "From 'nie działać' (not working). The day of rest." },
        { pl: "Poniedziałek", meaning: "Means 'after Sunday' (po niedzieli)." },
        { pl: "Wtorek", meaning: "From 'wtóry' (second). The second day of the week." },
        { pl: "Środa", meaning: "Means 'middle' (środek), the midpoint of the week." },
        { pl: "Czwartek", meaning: "From 'czwarty' (fourth day)." },
        { pl: "Piątek", meaning: "From 'piąty' (fifth day)." },
        { pl: "Sobota", meaning: "Derived from 'Sabbath' (Szabat)." }
    ],

    holidayExplanations: {
        // --- Official State Holidays (Dni wolne od pracy) ---
        "0-1": { text: "Nowy Rok: The start of the New Year, celebrated with fireworks and parties.", type: "holiday" },
        "0-6": { text: "Trzech Króli: Epiphany. Poles write 'K+M+B' in chalk on their doors to bless the home.", type: "holiday" },
        "4-1": { text: "Święto Pracy: Labor Day. Often the start of 'Majówka', the great Polish BBQ weekend.", type: "holiday" },
        "4-3": { text: "Święto Konstytucji: Commemorating the 1791 Constitution, Europe's first modern constitution.", type: "holiday" },
        "7-15": { text: "Wniebowzięcie / Wojska Polskiego: A double holiday celebrating Mary and the Polish Army.", type: "holiday" },
        "10-1": { text: "Wszystkich Świętych: All Saints' Day. Millions of candles (znicze) light up cemeteries.", type: "holiday" },
        "10-11": { text: "Święto Niepodległości: Independence Day. Celebrating the rebirth of Poland in 1918.", type: "holiday" },
        "11-25": { text: "Boże Narodzenie: Christmas Day. A quiet time for family and singing carols.", type: "holiday" },
        "11-26": { text: "Drugi Dzień Świąt: St. Stephen’s Day; a day for visiting friends and family.", type: "holiday" },
        "Wielkanoc 🐣": { text: "Easter Sunday: Celebrated with a festive breakfast including blessed eggs (pisanki).", type: "holiday" },
        "Lany Poniedziałek 💧": { text: "Wet Monday: A fun tradition of splashing friends with water! Also a day off.", type: "holiday" },
        "Boże Ciało": { text: "Corpus Christi: Famous for massive outdoor processions through flower-covered streets.", type: "holiday" },

        // --- Cultural Traditions (Working Days) ---
        "0-21": { text: "Dzień Babci: Grandmothers receive flowers and handmade cards from grandchildren.", type: "tradition" },
        "0-22": { text: "Dzień Dziadka: A day to honor grandfathers for their wisdom and care.", type: "tradition" },
        "2-8": { text: "Dzień Kobiet: Women's Day. In Poland, it is common to give tulips to women.", type: "tradition" },
        "3-1": { text: "Prima Aprilis: April Fools' Day. A day for jokes, hoaxes, and lighthearted fun.", type: "tradition" },
        "3-3": { text: "Wielki Piątek: Good Friday. A solemn day of fasting and visiting 'Lord's Tombs' in churches.", type: "tradition" },
        "4-26": { text: "Dzień Matki: Mother's Day. Children honor their moms with 'laurki' (handmade cards).", type: "tradition" },
        "5-1": { text: "Dzień Dziecka: Children's Day. Kids usually get small gifts or special trips.", type: "tradition" },
        "5-23": { text: "Dzień Ojca: Father's Day. A time to celebrate dads and their role in the family.", type: "tradition" },
        "10-29": { text: "Andrzejki: St. Andrew’s Eve. A night of fortune-telling, like pouring hot wax.", type: "tradition" },
        "11-6": { text: "Mikołajki: St. Nicholas Day. Kids find gifts or chocolates in their clean boots.", type: "tradition" },
        "11-24": { text: "Wigilia: Christmas Eve. The most sacred night, involving a 12-dish meatless supper.", type: "tradition" },
        "Tłusty Czwartek 🍩": { text: "Fat Thursday: The last Thursday before Lent. Everyone eats pączki (donuts)!", type: "tradition" },
        "Środa Popielcowa": { text: "Ash Wednesday: Marks the beginning of Lent. Ashes are placed on foreheads.", type: "tradition" },
        "Zielone Świątki": { text: "Pentecost: An old agricultural holiday where homes were decorated with branches.", type: "tradition" }
    }
};

export default culturalData;
