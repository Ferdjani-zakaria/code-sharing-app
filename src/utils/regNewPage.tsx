export const regNewPage = async (value: string, lang: string) => {
    try {
        const response = await fetch("https://code-sharing-server.onrender.com/api", {
            method: "POST",
            body: JSON.stringify({
                editorValue: value,
                language: lang,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
