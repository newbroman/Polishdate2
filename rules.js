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
            
            <section class="rule-block spoken-mode">
                <h3>📅 Mode: (Today is...) — The Map</h3>
                <p>Used for simply <strong>identifying</strong> the date. (Answers: <em>What day is it?</em>)</p>
                <div class="full-example">
                    <span class="highlight">Dziesiąty stycznia 2026 roku</span>
                </div>
            </section>

            <section class="rule-block written-mode">
                <h3>🎉 Mode: (It's on...) — The Event</h3>
                <p><strong>Primary Mode.</strong> Used for scheduling and appointments. (Answers: <em>When?</em>)</p>
                <div class="full-example">
                    <span class="highlight">Dziesiątego stycznia 2026 roku</span>
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

    html += `
            <hr class="rule-divider">
            <h3 class="section-divider">🏠 Part 3: The "Address" Analogy</h3>
            <section class="rule-block analogy-section">
                <p>Think of a full date like a <strong>Physical Address</strong>. The grammar depends on whether you are <em>looking</em> at the house or <em>entering</em> it.</p>
                
                <div class="analogy-box">
                    <h4>🏗️ The Fixed Structure (Month & Year)</h4>
                    <p>The <strong>Year</strong> is the Building and the <strong>Month</strong> is the Room. They are the "owners" of the date. In Polish, owners go into the <strong>Genitive (Possessive)</strong> case.</p>
                    <p><strong>Why they never change:</strong> Whether you are just naming the date or having a party, the room (January) and the building (2026) don't move. They stay <em>stycznia... roku</em>.</p>
                </div>

                <div class="analogy-box" style="border-left: 4px solid #ffd700; margin-top: 15px;">
                    <h4>📅 The Map Mode (Today is...)</h4>
                    <p>You are standing outside pointing at the calendar. You are just naming the <strong>Day</strong> as a subject.</p>
                    <p><strong>Result:</strong> <span style="color: #ffd700;">Dziesiąty</span> (10th) stays in its basic form.</p>
                </div>

                <div class="analogy-box" style="border-left: 4px solid #4a90e2; margin-top: 15px;">
                    <h4>🎉 The Event Mode (It's on...)</h4>
                    <p>You are now <strong>using</strong> the day for an event. The "action" of the party forces the <strong>Day</strong> to shift into the possessive case too.</p>
                    <p><strong>Result:</strong> <span style="color: #4a90e2;">Dziesiątego</span> (of the 10th) changes to match the rest of the address.</p>
                </div>
                
                <p style="margin-top: 20px; font-weight: bold; border-top: 1px solid var(--border-color); padding-top: 10px;">
                    💡 Summary of 2026:
                </p>
                <p style="font-style: italic; opacity: 0.9;">
                    The year 2026 is always <strong>"roku"</strong> (of the year) because the day and month belong to that year. Only the <strong>Day</strong> number toggles when you switch modes!
                </p>
            </section>
        </article>
    `;

    return html;
}
