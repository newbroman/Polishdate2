/**
 * cultural.js
 * Contains etymology for months and days, as well as holiday descriptions.
 */

const culturalData = {
    // Month name history and seasonal context
    months: {
        0: { pl: "Styczeń", derivation: "From 'stykać' (to meet/join), as the old year meets the new year.", season: "winter" },
        1: { pl: "Luty", derivation: "From the old Polish word 'luty' meaning fierce, severe, or bitter frost.", season: "winter" },
        2: { pl: "Marzec", derivation: "Derived from 'Mars', the Roman god of war; originally the first month of the Roman calendar.", season: "spring" },
        3: { pl: "Kwiecień", derivation: "From the word 'kwiat' (flower), representing the month when flowers begin to bloom.", season: "spring" },
        4: { pl: "Maj", derivation: "Named after the Roman goddess Maia, associated with growth and spring.", season: "spring" },
        5: { pl: "Czerwiec", derivation: "From 'czerw' (larva/worm), referring to the cochineal insects harvested for red dye.", season: "summer" },
        6: { pl: "Lipiec", derivation: "From 'lipa' (linden tree), which typically blossoms during this time in Poland.", season: "summer" },
        7: { pl: "Sierpień", derivation: "From 'sierp' (sickle), the traditional tool used for the grain harvest.", season: "summer" },
        8: { pl: "Wrzesień", derivation: "From 'wrzos' (heather), the plant that purple-carpets Polish forests in autumn.", season: "autumn" },
        9: { pl: "Październik", derivation: "From 'paździerz' (wooden waste from flax or hemp), processed during this month.", season: "autumn" },
        10: { pl: "Listopad", derivation: "A literal combination of 'liść' (leaf) and 'padać' (to fall).", season: "autumn" },
        11: { pl: "Grudzień", derivation: "From 'gruda' (a frozen clump of earth), as the ground freezes for winter.", season: "winter" }
    },

    // NEW: Meaning of the days of the week
    days: {
        0: { pl: "Niedziela", meaning: "From 'nie działać' (to not work), the traditional day of rest." },
        1: { pl: "Poniedziałek", meaning: "Meaning 'po niedzieli' (after Sunday/the day of rest)." },
        2: { pl: "Wtorek", meaning: "Derived from 'wtóry', meaning 'the second' day of the week." },
        3: { pl: "Środa", meaning: "From 'środek' (the middle), as it is the middle of the work week." },
        4: { pl: "Czwartek", meaning: "Derived from 'czwarty', meaning 'the fourth' day of the week." },
        5: { pl: "Piątek", meaning: "Derived from 'piąty', meaning 'the fifth' day of the week." },
        6: { pl: "Sobota", meaning: "Derived from 'Sabbat' (Sabbath), the traditional day of preparation." }
    },

    // Descriptions for holidays used in the Cultural Hub
    holidayExplanations: {
        "0-1": "Nowy Rok: Celebration of the New Year with festivities and resolutions.",
        "0-6": "Trzech Króli: Epiphany, celebrating the visit of the Magi to the Christ child.",
        "4-1": "Święto Pracy: International Workers' Day, a day of rest and appreciation for labor.",
        "4-3": "Święto Konstytucji: Commemorating the Constitution of May 3, 1791, Europe's first modern constitution.",
        "7-15": "Wniebowzięcie: Feast of the Assumption and also Polish Armed Forces Day.",
        "10-1": "Wszystkich Świętych: All Saints' Day, a solemn day when Poles visit cemeteries to light candles for the dead.",
        "10-11": "Święto Niepodległości: Independence Day, marking the restoration of Poland's sovereignty in 1918.",
        "11-25": "Boże Narodzenie: Christmas Day, the primary celebration of the birth of Jesus.",
        "11-26": "Drugi Dzień Świąt: St. Stephen's Day, a time for visiting family and continued celebration.",
        // Moveable dates are handled by index-day logic in events.js
        "EasterMonday": "Poniedziałek Wielkanocny: Also known as Śmigus-dyngus, a tradition of splashing water for luck.",
        "CorpusChristi": "Boże Ciało: Feast of the Corpus Christi, marked by large outdoor religious processions."
    }
};

export default culturalData;
