import culturalData from './cultural.js';

export function updateInfoPanel(date, includeYear) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday...

    // 1. Polish Genitive Months (The "of" form)
    const monthGenitive = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];

    // 2. Phonetic Months (Matches your help page)
    const phoneticMonths = [
        "stich-nya", "loo-te-go", "mar-tsa", "kyev-tnya", "ma-ya", "cherv-tsa",
        "leep-tsa", "syerp-nya", "vzhye-shnya", "paz-dzhyer-nee-ka", "lees-to-pa-da", "grood-nya"
    ];

    // 3. Year Translation (Nominative Ordinal - matching Grammar Rules)
    const yearPl = year === 2024 ? "dwutysięczny dwudziesty czwarty" : 
                    year === 2025 ? "dwutysięczny dwudziesty piąty" : 
                    year === 2026 ? "dwutysięczny dwudziesty szósty" : `${year}`;

    const yearPhonetic = year === 2024 ? "dvoo-ti-syench-ni dvoo-dyess-ti chvar-ti" :
                         year === 2025 ? "dvoo-ti-syench-ni dvoo-dyess-ti pyon-ti" :
                         year === 2026 ? "dvoo-ti-syench-ni dvoo-dyess-ti shooss-ti" : "";

    // 4. Polish Day Name
    const dayNamesPl = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    const currentDayPl = dayNamesPl[dayOfWeek];

    // 5. Construct the Phrases
    // Format: "poniedziałek, 6 stycznia 2024"
    const fullPlDate = `${currentDayPl}, ${day} ${monthGenitive[monthIndex]}${includeYear ? ` ${yearPl}` : ''}`;
    
    // Phonetic Format: "6 stich-nya dvoo-ti..."
    const fullPhonetic = `${day} ${phoneticMonths[monthIndex]}${includeYear ? ` ${yearPhonetic}` : ''}`;

    // 6. Update HTML
    document.getElementById('plPhrase').innerText = fullPlDate;
    document.getElementById('phoneticPhrase').innerText = fullPhonetic;
    document.getElementById('enPhrase').innerText = date.toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'long', year: includeYear ? 'numeric' : undefined 
    });
}
