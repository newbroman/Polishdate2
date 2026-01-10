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

    // ADDING THE ROOM ANALOGY SECTION
    html += `
            <hr class="rule-divider">
            <h3 class="section-divider">🏠 Part 3: The "Room" Analogy</h3>
            <section class="rule-block analogy-section">
                <p>Think of Polish grammar like <strong>arranging furniture in a room:</strong></p>
                
                <div class="analogy-box">
                    <h4>🪑 The "It is..." Mode (Nominative)</h4>
                    <p>This is the furniture in the <strong>Showroom</strong>. It’s just sitting there. You are calling it by its name: <em>"That is a Chair."</em></p>
                </div>

                <div class="analogy-box">
                    <h4>☕ The "On the..." Mode (Genitive)</h4>
                    <p>This is when you <strong>use</strong> the furniture. You are placing your coffee <em>on the Chair</em>. Because the chair is now part of an action, its "shape" (the ending) changes to show its purpose.</p>
                </div>
                
                <p style="margin-top: 15px; font-style: italic; opacity: 0.9;">
                    This is why our app defaults to <strong>(On the...)</strong> — because in real life, we are usually doing something on that date!
                </p>
            </section>
        </article>
    `;

    return html;
}
