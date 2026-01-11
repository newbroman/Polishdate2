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
export function getRulesHTML() {
    let html = `
        <article class="rules-container">
            <header class="rules-header">
                <h2>🇵🇱 Polish Date Mastery</h2>
                <p>Understand the logic behind the endings.</p>
            </header>
            
            <h3 class="section-divider">🔄 Part 1: Contextual Ending Changes</h3>
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
            <h3 class="section-divider">📖 Part 2: Core Principles</h3>
    `;

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

    // INTEGRATED 2026 SUMMARY ANALOGY
    html += `
            <hr class="rule-divider">
            <h3 class="section-divider">🏠 Part 3: The "Room" Analogy for 2026</h3>
            <section class="rule-block analogy-section">
                <p>Think of Polish grammar like <strong>arranging furniture in a room.</strong> Here is how the analogy works with the two modes in this app:</p>
                
                <div class="analogy-box">
                    <h4>🪑 Mode: (It is...) — The Catalog</h4>
                    <p>You are looking at a blueprint or a catalog. You are simply naming the item: <em>"This is the <strong>Table</strong> (10th) of <strong>the Kitchen</strong> (January)."</em></p>
                    <p><strong>Result:</strong> Words stay in their "naming" form. <br><em>Dziesiąty stycznia... rok.</em></p>
                </div>

                <div class="analogy-box">
                    <h4>☕ Mode: (On the...) — The Placement</h4>
                    <p>You are actually <strong>using</strong> the furniture. You are placing a coffee <em>on the Table</em> for an appointment. Because the table is now part of an action, its "shape" (ending) changes to show its purpose.</p>
                    <p><strong>Result:</strong> The day and the year shift to Genitive. <br><em>Dziesiątego stycznia... roku.</em></p>
                </div>
                
                <p style="margin-top: 20px; font-weight: bold; border-top: 1px solid rgba(255,255,255,0.1); pt-2;">
                    💡 Why we default to (On the...):
                </p>
                <p style="font-style: italic; opacity: 0.9;">
                    In real life, we are usually doing something on a date! By defaulting to this mode, the app prepares you for actual conversation.
                </p>
            </section>
        </article>
    `;

    return html;
}
