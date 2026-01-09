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
        <article class="rules-container">
            <header class="rules-header">
                <h2>🇵🇱 Polish Grammar Rules</h2>
                <p>Polish dates change their endings based on whether you are simply naming the day or describing an event.</p>
            </header>

            <section class="rule-block written-mode">
                <h3>✍️ Written (Genitive Case)</h3>
                <p><strong>Default Mode:</strong> This is the standard way to express a date in a sentence.</p>
                <ul>
                    <li><strong>Usage:</strong> Use this for appointments, history, or when saying "on the [date]."</li>
                    <li><strong>Logic:</strong> It implies the phrase "on the day of..." (dnia...).</li>
                    <li><strong>Ending:</strong> Most numbers change their ending to <strong>-ego</strong>.</li>
                    <li><strong>Example:</strong> <em>Drugiego maja</em> (On the second of May).</li>
                </ul>
            </section>

            <section class="rule-block spoken-mode">
                <h3>🗣️ Spoken (Nominative Case)</h3>
                <p><strong>Identity Mode:</strong> This is used when the date is the subject of the sentence.</p>
                <ul>
                    <li><strong>Usage:</strong> Use this to answer "What is today's date?" or when reading a calendar header.</li>
                    <li><strong>Logic:</strong> This is the "dictionary" or "naming" form of the number.</li>
                    <li><strong>Ending:</strong> Usually ends in <strong>-y</strong> or <strong>-i</strong>.</li>
                    <li><strong>Example:</strong> <em>Drugi maja</em> (The second of May).</li>
                </ul>
            </section>

            <section class="rule-block tips">
                <h3>💡 Learner's Tip</h3>
                <p>When in doubt, use <strong>Written (Genitive)</strong>. It is the form you will hear and use most often in daily Polish life!</p>
            </section>
        </article>
    `;
}
