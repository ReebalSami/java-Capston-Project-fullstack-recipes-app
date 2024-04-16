import {FormEvent, SyntheticEvent, useState} from "react";
import {Recipe, RecipeIngredientsList} from "../types/Recipe.ts";
import axios from "axios";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {v4 as uuidv4} from 'uuid';
import MultipleCheckboxOpenAi from "../utility_functions/MultipleCheckboxOpenAi.tsx";
import "./GenerateRecipePage.css";
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import {Button} from "@mui/material";


const BACKEND_ENDPOINT = '/api/chat';

type GenerateRecipePageProps = {
    fetchRecipes: () => void;
}

export default function GenerateRecipePage(props: Readonly<GenerateRecipePageProps>) {
    const [loading, setLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<Recipe[] | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const ingredientsString = ingredients.join('+');

    const handleDropdownChange = (_event: SyntheticEvent<Element, Event>, value: RecipeIngredientsList[]) => {
        setIngredients(value);
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (ingredients.length < 3) {
            alert('Please select at least three ingredients.');
            return;
        }

        try {
            setGeneratedData(null);
            setLoading(true);

            const response = await axios.get(BACKEND_ENDPOINT, {
                params: { ingredients: ingredientsString },
            });

            const recipes: Recipe[] = response.data.recipes;

            const recipesWithIngredient = recipes.map(recipe => ({
                ...recipe,
                RecipeIngredients: [...(recipe.ingredients || []), ingredients],
            }));

            setGeneratedData(recipesWithIngredient);
            setIngredients([]);
            alert(`Recipes for "${ingredients}" are generated.`);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToLibrary = async (generatedRecipe: Recipe) => {
        const formDataWithImage = new FormData();
        formDataWithImage.append("recipe", new Blob([JSON.stringify(generatedRecipe)], { 'type': "application/json" }));

        await addRecipeToLibrary(formDataWithImage, props.fetchRecipes);
        setGeneratedData((prevData) => (prevData ? prevData.filter(recipe => recipe !== generatedRecipe) : null));
    };

    return (
        <div className="recipe-generator-container">
            <h2 className="title">Cooking Magic Generator</h2>
            <p className="description">List your ingredients and let the culinary wizardry begin! You will get three recipes, you can then add to your library.</p>
            <form onSubmit={handleOnSubmit} className="recipe-form">
                <label htmlFor="ingredient" className="form-label">Choose what you have in the fridge:</label>
                <MultipleCheckboxOpenAi handleIngredients={handleDropdownChange} />
                <Button type="submit" variant="contained" disabled={loading} color="success" >
                    {loading ? 'Generating recipes...' : 'Generate'}
                </Button>
            </form>
            {loading && <p className="loading">Generating recipes...</p>}
            {generatedData && (
                <div>
                    <h3 className="generated-title">Generated Recipes:</h3>
                    <ul className="recipe-list">
                        {generatedData.map((recipe) => (
                            <li key={uuidv4()} className="recipe-item">
                                <div className="recipe-details">
                                    <div className="recipe-header">
                                        <h3 className="recipe-name">{recipe.name}</h3>
                                        <p className="recipe-description"> {recipe.description}</p>
                                        <img src={recipe.imageUrl} alt="Image not found"
                                             className="recipe-image"/>
                                    </div>
                                    <div className="recipe-specification-container">
                                        <div className="recipe-difficulty-origin-author-container">
                                            <div className="recipe-difficulty">
                                                <strong>Difficulty:</strong> {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1).toLowerCase()}
                                            </div>
                                            <div className="recipe-origin">
                                                <strong>Origin:</strong> {recipe.origin.charAt(0).toUpperCase() + recipe.origin.slice(1).toLowerCase()}
                                            </div>
                                            <div className="recipe-author">
                                                <strong>Author:</strong> {recipe.author}
                                            </div>
                                        </div>
                                        <div className="recipe-type-category-container">
                                            <div className="recipe-type">
                                                <strong>Type:</strong> {recipe.type.map(type => {
                                                const formattedType = type.replace(/_/g, ' ');
                                                return formattedType.charAt(0).toUpperCase() + formattedType.slice(1).toLowerCase();
                                            }).join(', ')}
                                            </div>
                                            <div className="recipe-category">
                                                <strong>Category:</strong> {recipe.category.map(category => {
                                                const formattedCategory = category.replace(/_/g, ' ');
                                                return formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1).toLowerCase();
                                            }).join(', ')}
                                            </div>
                                        </div>

                                        <div className="recipe-time-container">
                                            <div className="recipe-preparation-time">
                                                <div className="preparation-content">
                                                    <div className="preparation-icon">
                                                        <BlenderOutlinedIcon className="icon"/>
                                                    </div>
                                                    <div className="preparation-details">
                                                        <strong>Preparation Time:</strong> <br/>
                                                        {recipe.preparationTime.hours > 0 && `${recipe.preparationTime.hours}h `}
                                                        {recipe.preparationTime.minutes > 0 && `${recipe.preparationTime.minutes}min`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="recipe-total-time">
                                                <div className="total-content">
                                                    <div className="total-icon">
                                                        <AlarmOnOutlinedIcon className="icon"/>
                                                    </div>
                                                    <div className="total-details">
                                                        <strong>Total Time:</strong> <br/>
                                                        {recipe.totalTime.hours > 0 && `${recipe.totalTime.hours}h `}
                                                        {recipe.totalTime.minutes > 0 && `${recipe.totalTime.minutes}min`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <br/>
                                    <strong className="recipe-instructions">Instructions:</strong>
                                    {recipe.instructions}
                                    <br/>
                                    <br/>
                                    <strong className="recipe-ingredients">Ingredients:</strong>
                                    {recipe.ingredients.map(ingredient => (
                                        <div key={uuidv4()} className="ingredient-item">
                                            <p className="ingredient-quantity"> {ingredient.quantity}</p> <p
                                            className="ingredient-name">{ingredient.name}</p>
                                        </div>
                                    ))}
                                </div>
                              <br/>
                              <br/>
                                <Button variant="contained" color="success" onClick={() => handleAddToLibrary(recipe)}>
                                    Add to Library
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
