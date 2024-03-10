export const fetchDataFromDatabase = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5050/api/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle errors
        console.error("Error fetching data from the database:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
};
