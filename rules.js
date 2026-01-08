/**
 * rules.js - Polish Grammar & Cultural Rules
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
        explanation: "When saying the year, Poles add the word 'roku' (of the year) at the end. The year itself is also spoken as an ordinal number.",
        rule: "[Number] + roku",
        example: "2026 = dwa tysiące dwudziestego szóstego roku"
    },
    namingOrigins: {
        title: "4. Natural Origins",
        explanation: "Polish month names aren't based on Latin gods (like March/Mars). They are based on what happens in nature in Poland.",
        rule: "Vocabulary tip: Look for root words like 'flower', 'leaf', or 'ice'.",
        example: "Kwiecień (April) comes from 'kwiat' (flower)."
    },
    formalVsInformal: { // Renamed from meetingMode
        title: "5. Formal vs. Informal (Cases)",
        explanation: "By default, this app uses the Formal (Genitive) case, which is standard for scheduling meetings. The Informal (Nominative) case is used for simple statements like 'Today is...'.",
        rule: "Formal endings use -ego (the 'Time Case'), while Informal endings use -y/-i.",
        example: "Formal: pierwszego (1-go) vs. Informal: pierwszy (1.)"
    }
};



export function getRulesHTML() {
    return `
        <div class="rules-header">
            <h2>Polish Grammar Rules</h2>
        </div>
        ${Object.values(grammarRules).map(section => `
            <div class="info-block">
                <h3>${section.title}</h3>
                <p>${section.explanation}</p>
                <div class="rule-tip"><strong>Rule:</strong> ${section.rule}</div>
                <div class="rule-example"><em>Example:</em> ${section.example}</div>
            </div>
        `).join('')}
        <button class="close-culture-btn" onclick="document.getElementById('navCalendar').click()">Back to Calendar</button>
    `;
}

export default grammarRules;
