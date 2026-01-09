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
                <p>Polish dates change their endings based on how they are used in a sentence.</p>
            </header>

            <section class="rule-block">
                <h3>✍️ Written (Genitive Case)</h3>
                <p><strong>Default Mode:</strong> This is the most common way to express a date in Poland.</p>
                <ul>
                    <li><strong>When to use:</strong> For events, meetings, birthdays, or anytime you would say "on the [date]."</li>
                    <li><strong>Logic:</strong> It implies the word <em>dnia</em> (on the day of...).</li>
                    <li><strong>Ending:</strong> Usually ends in <strong>-ego</strong>.</li>
                    <li><strong>Example:</strong> <em>Drugiego maja</em> (On the second of May).</li>
                </ul>
            </section>

            <section class="rule-block">
                <h3>🗣️ Spoken (Nominative Case)</h3>
                <p><strong>Identity Mode:</strong> This is used when simply naming the date.</p>
                <ul>
                    <li><strong>When to use:</strong> Answering the question "What is today's date?" or reading a calendar header.</li>
                    <li><strong>Logic:</strong> It is the "dictionary" form of the number.</li>
                    <li><strong>Ending:</strong> Usually ends in <strong>-y</strong> or <strong>-i</strong>.</li>
                    <li><strong>Example:</strong> <em>Drugi maja</em> (The second of May).</li>
                </ul>
            </section>

            <section class="rule-block tips">
                <h3>💡 Quick Tip</h3>
                <p>If you aren't sure which to use, stick with <strong>Written (Genitive)</strong>. In 90% of real-life Polish conversations, this is the version you will need!</p>
            </section>
        </article>
    `;
}
