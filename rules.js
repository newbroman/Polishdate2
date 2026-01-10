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
    contextCases: { 
        title: "6. 'On the...' vs. 'It is...'", 
        explanation: "The date's ending changes depending on whether you are describing an event or just naming the day.",
        rule: "'On the...' uses Genitive (-ego), while 'It is...' uses Nominative (-y/-i).",
        example: "On the...: drugiego vs. It is...: drugi"
    }
};



export function getRulesHTML() {
    return `
        <article class="rules-container">
            <header class="rules-header">
                <h2>🇵🇱 Polish Grammar Rules</h2>
                <p>Polish dates change their endings based on whether you are describing an <strong>event</strong> or simply <strong>naming</strong> the day.</p>
            </header>

            <section class="rule-block written-mode">
                <h3>🤝 Date: (On the...) [Genitive]</h3>
                <p><strong>Default Startup Mode:</strong> This is the standard way to express a date for appointments or sentences.</p>
                <ul>
                    <li><strong>Usage:</strong> Use this when saying "I am meeting you on the..."</li>
                    <li><strong>Logic:</strong> It implies "on the day of..." (dnia...).</li>
                    <li><strong>Ending:</strong> Most numbers end in <strong>-ego</strong> and the year ends in <strong>roku</strong> (ro-koo).</li>
                    <li><strong>Example:</strong> <span class="highlight">Drugiego maja</span> (On the second of May).</li>
                </ul>
            </section>

            <section class="rule-block spoken-mode">
                <h3>🗓️ Date: (It is...) [Nominative]</h3>
                <p><strong>Identity Mode:</strong> Used when the date itself is the subject of your thought.</p>
                <ul>
                    <li><strong>Usage:</strong> Use this to answer "What is today's date?"</li>
                    <li><strong>Logic:</strong> This is the "dictionary" or "naming" form.</li>
                    <li><strong>Ending:</strong> Usually ends in <strong>-y</strong> or <strong>-i</strong> and the year ends in <strong>rok</strong> (rok).</li>
                    <li><strong>Example:</strong> <span class="highlight">Drugi maja</span> (The second of May).</li>
                </ul>
            </section>

            <section class="rule-block tips">
                <h3>💡 Learner's Tip</h3>
                <p>When in doubt, use <strong>(On the...)</strong>. It is the form you will hear and use most often in daily Polish life!</p>
            </section>
        </article>
    `;
}
