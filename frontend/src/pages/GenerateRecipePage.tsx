import {ChangeEvent, FormEvent, useState} from "react";
import {Recipe, RecipeIngredientsList} from "../types/Recipe.ts";
import axios from "axios";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {v4 as uuidv4} from 'uuid';


const BACKEND_ENDPOINT = '/api/chat';

type GenerateRecipePageProps = {
    fetchRecipes: () => void;
}
export default function GenerateRecipePage(props: Readonly<GenerateRecipePageProps>) {
    const [formData, setFormData] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<Recipe[] | null>(null);

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData(event.target.value);
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setGeneratedData(null);
            setLoading(true);

            const response = await axios.get(BACKEND_ENDPOINT, {
                params: {ingredients: formData},
            });

            const recipes: Recipe[] = response.data.recipes;

            const recipesWithIngredient = recipes.map(recipe => ({
                ...recipe,
                RecipeIngredients: [...(recipe.ingredients || []), formData],
            }));

            setGeneratedData(recipesWithIngredient);
            setFormData('');
            alert(`Recipes for "${formData}" are generated.`);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleAddToLibrary = async (generatedRecipe: Recipe) => {
        const formDataWithImage = new FormData();
        formDataWithImage.append("recipe",new Blob([JSON.stringify(generatedRecipe)], {'type': "application/json"}));

        await addRecipeToLibrary(formDataWithImage, props.fetchRecipes);
        setGeneratedData((prevData) => (prevData ? prevData.filter(recipe => recipe !== generatedRecipe) : null));
    };

    return (
        <div className="container">
            <h2>Which ingredient do you want to generate recipes for:</h2>
            <p>You will get three generated recipes you can then add to your library.</p>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="ingredient">Choose an ingredient:</label>
                <select
                    id="ingredient"
                    name="ingredient"
                    value={formData}
                    onChange={handleDropdownChange}
                    required
                >
                    <option value="">Select an ingredient</option>
                    {Object.values(RecipeIngredientsList).map((ingredient) => (
                        <option key={ingredient} value={ingredient}>
                            {ingredient}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating recipes...' : 'Generate'}
                </button>
            </form>
            {loading && <p>Generating recipes...</p>}
            {generatedData && (
                <div>
                    <h3>Generated Recipes:</h3>
                    <ul>
                        {generatedData.map((recipe) => (
                            <li key={uuidv4()} style={{
                                marginBottom: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <img src="../../public/images/mazza.jpeg" alt="Image was not found :(" style={{width: '100px', height: '100px'}}/>
                                    <strong>Name:</strong> {recipe.name} <br/>
                                    <strong>Description:</strong> {recipe.description} <br/>
                                    <strong>Instructions:</strong> {recipe.instructions} <br/>
                                    <strong>Author:</strong> {recipe.author} <br/>
                                    <strong>Origin:</strong> {recipe.origin} <br/>
                                    <strong>Type:</strong> {recipe.type.join(', ')} <br/>
                                    <strong>Preparation
                                        Time:</strong> {recipe.preparationTime.hours} hours {recipe.preparationTime.minutes} minutes <br/>
                                    <strong>Total
                                        Time:</strong> {recipe.totalTime.hours} hours {recipe.totalTime.minutes} minutes <br/>
                                    <strong>Category:</strong> {recipe.category.join(', ')} <br/>
                                    <strong>Difficulty:</strong> {recipe.difficulty} <br/>
                                    <strong>Ingredients:</strong> {recipe.ingredients.map(ingredient => (
                                    <div key={uuidv4()}>
                                        <strong>Name:</strong> {ingredient.name} <br/>
                                        <strong>Quantity:</strong> {ingredient.quantity} <br/>
                                    </div>
                                ))}
                                </div>
                                <button onClick={() => handleAddToLibrary(recipe)}>Add to Library</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}