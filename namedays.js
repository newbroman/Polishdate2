/**
 * namedays.js - Polish Name Days data
 * Non-module version for maximum compatibility
 */

(function() {
    let namedaysData = null;

    // Fetch and cache the namedays data
    async function loadNamedaysData() {
        if (!namedaysData) {
            try {
                const response = await fetch('./namedays.json');
                namedaysData = await response.json();
            } catch (error) {
                console.error('Error loading namedays data:', error);
                namedaysData = {};
            }
        }
        return namedaysData;
    }

    /**
     * Get names for a specific date
     * @param {Date} date - The date to look up
     * @returns {Promise<Array<string>>} - Array of names for that date
     */
    window.getNamesForDate = async function(date) {
        const data = await loadNamedaysData();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dateKey = `${day}-${month}`;
        
        return data[dateKey] || [];
    };
})();
