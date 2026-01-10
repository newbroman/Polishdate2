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
    }
};

export function getRulesHTML() {
    // Start with the Dynamic Mode Comparison (The new stuff)
    let html = `
        <article class="rules-container">
            <header class="rules-header">
                <h2>🇵🇱 Polish Date Mastery</h2>
                <p>In Polish, dates are "chameleons"—they change their shape based on how you use them.</p>
            </header>

            <section class="rule-block written-mode">
                <h3>🤝 Mode: (On the...) — Genitive</h3>
                <p>Used for <strong>appointments and events.</strong> (Answers: <em>When?</em>)</p>
                <div class="full-example">
                    <span class="highlight">Dziesiątego stycznia ... roku</span>
                </div>
            </section>

            <section class="rule-block spoken-mode">
                <h3>🗓️ Mode: (It is...) — Nominative</h3>
                <p>Used for <strong>naming the day.</strong> (Answers: <em>What day is it?</em>)</p>
                <div class="full-example">
                    <span class="highlight">Dziesiąty stycznia ... rok</span>
                </div>
            </section>

            <hr class="rule-divider">
            <h3>📖 Core Grammar Principles</h3>
    `;

    // Restore the Original Grammar Rules loop
    Object.values(grammarRules).forEach(item => {
        html += `
            <section class="rule-block">
                <h4>${item.title}</h4>
                <p>${item.explanation}</p>
                <p><strong>Rule:</strong> ${item.rule}</p>
                <p><em>Example: ${item.example}</em></p>
            </section>
        `;
    });

    html += `</article>`;
    return html;
}
