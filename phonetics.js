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
    ordinalDays: {
        1: "pyerv-shih",
        2: "droo-ghee",
        3: "ts-sheh-tsee",
        4: "chvahr-tih",
        5: "pyon-tih",
        6: "shooss-tih",
        7: "shood-mih",
        8: "ooss-mih",
        9: "jyev-yon-tih",
        10: "jyeh-shon-tih",
        11: "yeh-deh-nahs-tih",
        12: "dvoo-nahs-tih",
        13: "t-sheh-nahs-tih",
        14: "chver-nahs-tih",
        15: "pyent-nahs-tih",
        16: "shes-nahs-tih",
        17: "shyeh-dem-nahs-tih",
        18: "oh-syem-nahs-tih",
        19: "jyev-yet-nahs-tih",
        20: "dvoo-jyes-tih",
        21: "dvoo-jyes-tih pyerv-shih",
        22: "dvoo-jyes-tih droo-ghee",
        23: "dvoo-jyes-tih ts-sheh-tsee",
        24: "dvoo-jyes-tih chvahr-tih",
        25: "dvoo-jyes-tih pyon-tih",
        26: "dvoo-jyes-tih shooss-tih",
        27: "dvoo-jyes-tih shood-mih",
        28: "dvoo-jyes-tih ooss-mih",
        29: "dvoo-jyes-tih jyev-yon-tih",
        30: "ts-sheh-jyes-tih",
        31: "ts-sheh-jyes-tih pyerv-shih"
    },

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
