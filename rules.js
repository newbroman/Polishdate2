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
        explanation: "Polish month names are based on nature (flowers, leaves, ice) rather than Latin gods.",
        rule: "Vocabulary tip: Kwiecień (April) comes from 'kwiat' (flower).",
        example: "Listopad (November) means 'leaf-fall'."
    }
};

export function getRulesHTML() {
    let html = `
        <article class="rules-container">
            <header class="rules-header">
                <h2>🇵🇱 Polish Date Mastery</h2>
                <p>Understand the two ways to express dates in Polish conversation.</p>
            </header>
            
            <h3 class="section-divider">🔄 Part 1: Contextual Ending Changes</h3>
            <p>The endings change depending on whether you are describing an <strong>event</strong> or <strong>naming</strong> the day.</p>

            <section class="rule-block written-mode">
                <h3>🤝 Mode: (On the...) — Genitive</h3>
                <p>Used for <strong>appointments and events.</strong> (Answers: <em>When?</em>)</p>
                <div class="full-example">
                    <strong>2026 Example:</strong><br>
                    <span class="highlight">Dziesiątego stycznia dwa tysiące dwudziestego szóstego roku</span>
                </div>
            </section>

            <section class="rule-block spoken-mode">
                <h3>🗓️ Mode: (It is...) — Nominative</h3>
                <p>Used for <strong>naming the day.</strong> (Answers: <em>What day is it?</em>)</p>
                <div class="full-example">
                    <strong>2026 Example:</strong><br>
                    <span class="highlight">Dziesiąty stycznia dwa tysiące dwudziesty szósty rok</span>
                </div>
            </section>

            <section class="rule-block tips">
                <h3>💡 Pro-Tip</h3>
                <p>If you are unsure, always use <strong>(On the...)</strong>. It is much more common in daily conversation!</p>
            </section>

            <hr class="rule-divider">
            <h3 class="section-divider">📖 Part 2: Core Principles</h3>
    `;

    // Now the Core Grammar Rules follow at the bottom
    Object.values(grammarRules).forEach(item => {
        html += `
            <section class="rule-block core-rule">
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
