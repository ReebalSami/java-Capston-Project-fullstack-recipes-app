import axios from "axios";
import {Recipe} from "../types/Recipe";

export const addRecipeToLibrary = async (formData: Recipe, fetchData: () => void): Promise<void> => {
    try {
        await axios.post('/api/recipes', formData);
        fetchData();
        alert(`Recipe "${formData.name}" added.`);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};