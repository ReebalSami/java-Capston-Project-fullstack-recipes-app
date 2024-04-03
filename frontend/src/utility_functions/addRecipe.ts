import axios from "axios";


export const addRecipeToLibrary = async (formData: FormData, fetchData: () => void): Promise<void> => {
    try {

        await axios.post('/api/recipes', formData, {headers: {'Content-Type': 'multipart/form-data'}});

        fetchData();
        alert("Recipe " + formData.get("recipe") +  " added.");
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};