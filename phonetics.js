/**
 * phonetics.js
 * Central database for Polish pronunciations used in the UI.
 * Optimized for dates and years 0-3000.
 */

const phonetics = {
    // 1. Days of the Week (Nominative)
    days: {
        "niedziela": "nyeh-jyeh-lah",
        "poniedziałek": "poh-nyeh-jah-wek",
        "wtorek": "vtoh-rek",
        "środa": "shroh-dah",
        "czwartek": "chvahr-tek",
        "piątek": "pyon-tek",
        "sobota": "soh-boh-tah"
    },

    // 2. Months (Genitive Case - "of ...")
    months: {
        "stycznia": "stich-nyah",
        "lutego": "loo-teh-go",
        "marca": "mahr-tsah",
        "kwietnia": "kyev-tnyah",
        "maja": "mah-yah",
        "czerwca": "cherv-tsah",
        "lipca": "leep-tsah",
        "sierpnia": "syerp-nyah",
        "września": "vzhyeh-shnyah",
        "października": "paz-jyeh-nee-kah",
        "listopada": "lees-toh-pah-dah",
        "grudnia": "grood-nyah"
    },

    // 3. Ordinal Days 1-31 (Genitive - "The 1st of...")
    // In Polish, dates sound like "pyer-vsheh-go" (of the first)
    ordinalDays: {
        1: "pyer-vsheh-go", 2: "droo-gyeh-go", 3: "ts-sheh-tsyeh-go", 4: "chvahr-teh-go",
        5: "pyon-teh-go", 6: "shooss-teh-go", 7: "shood-meh-go", 8: "ooss-meh-go",
        9: "jyev-yon-teh-go", 10: "jyeh-shon-teh-go", 11: "yeh-deh-nahs-teh-go",
        12: "dvoo-nahs-teh-go", 13: "t-sheh-nahs-teh-go", 14: "chver-nahs-teh-go",
        15: "pyent-nahs-teh-go", 16: "shes-nahs-teh-go", 17: "shyeh-dem-nahs-teh-go",
        18: "oh-syem-nahs-teh-go", 19: "jyev-yet-nahs-teh-go", 20: "dvoo-jyes-teh-go",
        21: "dvoo-jyes-teh-go pyer-vsheh-go", 22: "dvoo-jyes-teh-go droo-gyeh-go",
        23: "dvoo-jyes-teh-go ts-sheh-tsyeh-go", 24: "dvoo-jyes-teh-go chvahr-teh-go",
        25: "dvoo-jyes-teh-go pyon-teh-go", 26: "dvoo-jyes-teh-go shooss-teh-go",
        27: "dvoo-jyes-teh-go shood-meh-go", 28: "dvoo-jyes-teh-go ooss-meh-go",
        29: "dvoo-jyes-teh-go jyev-yon-teh-go", 30: "ts-sheh-jyes-teh-go",
        31: "ts-sheh-jyes-teh-go pyer-vsheh-go"
    },

    // 4. Year Ordinals 1-99 (Nominative - for building 2024, etc.)
    // Used by getYearPhonetic in numbers.js
    ordinals: {
        1: "pyer-vshi", 2: "droo-gee", 3: "ts-sheh-tsee", 4: "chvahr-ti",
        5: "pyon-ti", 6: "shooss-ti", 7: "shood-mi", 8: "ooss-mi",
        9: "jyev-yon-ti", 10: "jyeh-shon-ti", 11: "yeh-deh-nahs-ti",
        12: "dvoo-nahs-ti", 13: "t-sheh-nahs-ti", 14: "chver-nahs-ti",
        15: "pyent-nahs-ti", 16: "shes-nahs-ti", 17: "shyeh-dem-nahs-ti",
        18: "oh-syem-nahs-ti", 19: "jyev-yet-nahs-ti", 20: "dvoo-jyes-ti",
        21: "dvoo-jyes-ti pyer-vshi", 22: "dvoo-jyes-ti droo-gee",
        23: "dvoo-jyes-ti ts-sheh-tsee", 24: "dvoo-jyes-ti chvahr-ti",
        30: "ts-sheh-jyes-ti", 40: "chter-jyes-ti", 50: "pyent-jyeh-shon-ti",
        60: "shes-jyeh-shon-ti", 70: "shye-dem-jyeh-shon-ti", 
        80: "oh-syem-jyeh-shon-ti", 90: "jyev-yen-jyeh-shon-ti"
    }
};

export default phonetics;
