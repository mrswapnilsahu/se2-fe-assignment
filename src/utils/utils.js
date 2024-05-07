/**
 * Reusable function to filter data based on search query string
 * @param {Array} data - Array of objects to be filtered
 * @param {string} searchQuery - The string to search for in the data
 * @returns {Array} - Matched set of responses based on searchQuery
 */
export const filterData = (data, searchQuery) => {
    // Filtering data based on searchQuery
    return data.filter((item) => {
        // Check if any value in the object item contains the searchQuery
        const res = Object.values(item).some((value) =>
            Array.isArray(value) ? // Check if the value is an array
                searchElementInArray(value, searchQuery) : // Check if any element in array matches searchQuery
                value.toLowerCase().includes(searchQuery.toLowerCase()) // Check if value matches searchQuery
        );
        return res; // Return true if any value matches the searchQuery
    });
}

/**
 * Searches for a specific value in an array using a case-insensitive search query.
 * @param {string[]} value - The array to search through.
 * @param {string} searchQuery - The search query to look for in the array.
 * @returns {boolean} - True if the search query is found in the array, false otherwise.
 */
export const searchElementInArray = (value, searchQuery) => {
    return value.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())); // Check if any element in array matches searchQuery
}

