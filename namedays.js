/**
 * namedays.js - Polish Name Days data
 */

import namedaysData from './namedays.json' assert { type: 'json' };

/**
 * Get names for a specific date
 * @param {Date} date - The date to look up
 * @returns {Array<string>} - Array of names for that date
 */
export function getNamesForDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateKey = `${day}-${month}`;
    
    return namedaysData[dateKey] || [];
}

export default namedaysData;
