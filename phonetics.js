/**
 * phonetics.js
 * Central database for Polish pronunciations.
 * Uses Nominative for Days/Ordinals and Genitive for Months.
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
    // In Polish dates, the month always takes the genitive form.
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

    // 3. Ordinal Days 1-31 (Nominative - "The Seventh")
    // Adjusted to match written titles (Siódmy, etc.)
// Standard sounds for "Today is..." (Nominative)
    ordinalDays: {
        1: "pyer-v-shy", 2: "droo-gy", 3: "t-sheh-chee", 4: "chvar-ty", 5: "pyon-ty",
        6: "shoos-ty", 7: "shood-my", 8: "oos-my", 9: "jyev-yon-ty", 10: "jyeh-shon-ty",
        11: "yeh-den-as-ty", 12: "dvoo-nas-ty", 13: "t-she-nas-ty", 14: "chter-nas-ty", 15: "pyent-nas-ty",
        16: "shes-nas-ty", 17: "shyeh-dem-nas-ty", 18: "oh-syem-nas-ty", 19: "jyev-yet-nas-ty", 20: "dvoo-jyes-ty",
        21: "dvoo-jyes-ty pyer-v-shy", 22: "dvoo-jyes-ty droo-gy", 23: "dvoo-jyes-ty t-sheh-chee",
        24: "dvoo-jyes-ty chvar-ty", 25: "dvoo-jyes-ty pyon-ty", 26: "dvoo-jyes-ty shoos-ty",
        27: "dvoo-jyes-ty shood-my", 28: "dvoo-jyes-ty oos-my", 29: "dvoo-jyes-ty jyev-yon-ty",
        30: "t-shy-jyes-ty", 31: "t-shy-jyes-ty pyer-v-shy"
    },

    // Meeting Mode sounds for "Meeting is on..." (Genitive)
    ordinalDaysGenitive: {
        1: "pyer-v-sheh-go", 2: "droo-gyeh-go", 3: "t-sheh-chyeh-go", 4: "chvar-teh-go", 5: "pyon-teh-go",
        6: "shoos-teh-go", 7: "shood-meh-go", 8: "oos-meh-go", 9: "jyev-yon-teh-go", 10: "jyeh-shon-teh-go",
        11: "yeh-den-as-teh-go", 12: "dvoo-nas-teh-go", 13: "t-she-nas-teh-go", 14: "chter-nas-teh-go", 15: "pyent-nas-teh-go",
        16: "shes-nas-teh-go", 17: "shyeh-dem-nas-teh-go", 18: "oh-syem-nas-teh-go", 19: "jyev-yet-nas-teh-go", 20: "dvoo-jyes-teh-go",
        21: "dvoo-jyes-teh-go pyer-v-sheh-go", 22: "dvoo-jyes-teh-go droo-gyeh-go", 23: "dvoo-jyes-teh-go t-sheh-chyeh-go",
        24: "dvoo-jyes-teh-go chvar-teh-go", 25: "dvoo-jyes-teh-go pyon-teh-go", 26: "dvoo-jyes-teh-go shoos-teh-go",
        27: "dvoo-jyes-teh-go shood-meh-go", 28: "dvoo-jyes-teh-go oos-meh-go", 29: "dvoo-jyes-teh-go jyev-yon-teh-go",
        30: "t-shy-jyes-teh-go", 31: "t-shy-jyes-teh-go pyer-v-sheh-go"
    }
};

    // 4. Large Ordinals for Years (Unchanged)
    ordinals: {
        1: "pyer-vshi", 2: "droo-gee", 3: "ts-sheh-tsee", 4: "chvahr-ti",
        5: "pyon-ti", 6: "shooss-ti", 7: "shood-mi", 8: "ooss-mi",
        9: "jyev-yon-ti", 10: "jyeh-shon-ti", 11: "yeh-deh-nahs-ti",
        12: "dvoo-nahs-ti", 13: "t-sheh-nahs-ti", 14: "chver-nahs-ti",
        15: "pyent-nahs-ti", 16: "shes-nahs-ti", 17: "shyeh-dem-nahs-ti",
        18: "oh-syem-nahs-ti", 19: "jyev-yet-nahs-ti", 20: "dvoo-jyes-ti",
        30: "ts-sheh-jyes-ti", 40: "chter-jyes-ti", 50: "pyent-jyeh-shon-ti",
        60: "shes-jyeh-shon-ti", 70: "shye-dem-jyeh-shon-ti", 
        80: "oh-syem-jyeh-shon-ti", 90: "jyev-yen-jyeh-shon-ti"
    }
};

export default phonetics;
