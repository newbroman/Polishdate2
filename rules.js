/**
 * rules.js - Updated for Grammatical Precision
 */

const grammarRules = {
    ordinalNumbers: {
        title: "1. Ordinal Numbers",
        explanation: "In English, we say 'January first'. In Polish, we always use ordinal numbers (1st, 2nd, 3rd) for the day. These must match the gender of the word 'day' (dzień), which is masculine.",
        rule: "Day numbers usually end in -y or -i.",
        example: "1st = pierwszy, 2nd = drugi, 3rd = trzeci"
    },
    monthCasing: {
        title: "2. The 'Of' Case (Genitive)",
        explanation: "This is the most important rule. We don't say '1 January'. We say '1st day OF January'. This possessive relationship changes the ending of the month name.",
        rule: "Most months change their ending to -a or -ego.",
        example: "Styczeń (January) becomes Stycznia (of January)"
    },
    yearStructure: {
        title: "3. Including the Year",
        explanation: "When saying a full date, Poles use the Genitive form for the year (answering 'of which year?'). We add the word 'roku' (of the year) at the end.",
        rule: "[Ordinal Number in -ego] + roku",
        example: "2026 = dwa tysiące dwudziestego szóstego roku"
    }
};

export function getRulesHTML(state) {
    // 1. Get current month and year from state
    const currentYear = state.viewDate.getFullYear();
    const monthIndex = state.viewDate.getMonth();
    
    // 2. Map for Genitive month names
    const monthKeysPl = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    const dynamicMonth = monthKeysPl[monthIndex];

    let html = `
        <article class="rules-container">
            <h3 class="section-divider">🏠 Part 3: The "Room" Analogy for ${currentYear}</h3>
            <section class="rule-block analogy-section">
                <p>Think of Polish grammar like <strong>arranging furniture in a room.</strong> Here is how the analogy works with the two modes in this app:</p>
                
                <div class="analogy-box">
                    <h4>🎉 Mode: (It's on...) — The Event</h4>
                    <p>You are actually <strong>using</strong> the space for a party. Because an action is happening "on" the day, the endings shift to the Genitive.</p>
                    <p><strong>Result:</strong> <em>Dziesiątego ${dynamicMonth} ${currentYear} roku.</em></p>
                </div>

                <div class="analogy-box">
                    <h4>📅 Mode: (Today is...) — The Map</h4>
                    <p>You are looking at the calendar like a map. You are just naming the coordinates: <em>"This square is the 10th of ${dynamicMonth}."</em></p>
                    <p><strong>Result:</strong> <em>Dziesiąty ${dynamicMonth} ${currentYear} roku.</em></p>
                </div>
                
                <p style="margin-top: 20px; font-weight: bold; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                    💡 Why we use "roku":
                </p>
                <p style="font-style: italic; opacity: 0.9;">
                    In dates, the year is always possessive. Just as we say "of ${dynamicMonth}" (${dynamicMonth}), we say "of the year" (roku). 
                </p>
            </section>
        </article>
    `;

    return html;
}
