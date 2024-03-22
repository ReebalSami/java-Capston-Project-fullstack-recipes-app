import "./AddRecipePage.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {SelectChangeEvent} from "@mui/material";
import {Recipe} from "../types/Recipe.ts";

type AddRecipePageProps = {
    recipes: Recipe[];
    fetchRecipes: () => void;
}

export default function AddRecipePage(props: Readonly<AddRecipePageProps>) {
    const [category, setCategory] = useState<string[]>([]);
    const [type, setType] = useState<string[]>([]);
    const [formData, setFormData] = useState<Recipe>({
        name: "",
        description: "",
        instructions: "",
        author: "",
        origin: "",
        type: [],
        preparationTime: { hours: 0, minutes: 0 },
        totalTime: { hours: 0, minutes: 0 },
        category: [],
        difficulty: "",
        ingredients: [{ name: "", quantity: "" }]
    });

    const [error, setError] = useState(false);

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: value,
        }));
        setError(false);
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const handleChangeInstructions = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            instructions: value,
        }));
    };

    const handleChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            author: value,
        }));
    };

    const handleChangeOrigin = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            origin: value,
        }));
    };

    const handleChangeType = (event: SelectChangeEvent<typeof type>) => {
        const value = event.target.value;
        const updatedType = typeof value === 'string' ? value.split(',') : value;
        setType(updatedType);
        setFormData((prevData) => ({
            ...prevData,
            type: updatedType,
        }));
    };

    const handleChangePreparationTime = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            preparationTime: {
                ...prevData.preparationTime,
                [name]: parseInt(value, 10) || 0
            }
        }));
    };

    const handleChangeTotalTime = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            totalTime: {
                ...prevData.totalTime,
                [name]: parseInt(value, 10) || 0
            }
        }));
    };

    const handleChangeCategory = (event: SelectChangeEvent<typeof category>) => {
        const value = event.target.value;
        const updatedCategory = typeof value === 'string' ? value.split(',') : value;
        setType(updatedCategory);
        setFormData((prevData) => ({
            ...prevData,
            category: updatedCategory,
        }));
    };
    const handleChangeDifficulty = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            difficulty: value,
        }));
    };

    const handleChangeIngredients = (event: ChangeEvent<HTMLInputElement>, index: number, fieldName: 'name' | 'quantity') => {
        const { value } = event.target;
        const newIngredients = [...formData.ingredients];
        newIngredients[index][fieldName] = value;

        setFormData((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };


    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const matchingRecipe = props.recipes.find(recipe => recipe.name === formData.name);
        if (matchingRecipe) {
            setError(true);
            return;
        }


        await addRecipeToLibrary(formData, props.fetchRecipes);
        setFormData({
            name: "",
            description: "",
            instructions: "",
            author: "",
            origin: "",
            type: [],
            preparationTime: { hours: 0, minutes: 0 },
            totalTime: { hours: 0, minutes: 0 },
            category: [],
            difficulty: "",
            ingredients: [{ name: "", quantity: "" }]
        });
        setCategory([]);
        setType([]);
    };

    return (
        <div className={"addRecipePage"}>
            <h1>Add Recipe</h1>
            <form className={"addRecipeForm"} onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeName}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChangeDescription}
                />
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChangeInstructions}
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChangeAuthor}
                />
                <label htmlFor="origin">Origin:</label>
                <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChangeOrigin}
                />
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChangeType}
                />
                <label htmlFor="preparationTimeHours">Preparation Time Hours:</label>
                <input
                    type="number"
                    id="preparationTimeHours"
                    name="hours"
                    value={formData.preparationTime.hours}
                    onChange={handleChangePreparationTime}
                />
                <label htmlFor="preparationTimeMinutes">Preparation Time Minutes:</label>
                <input
                    type="number"
                    id="preparationTimeMinutes"
                    name="minutes"
                    value={formData.preparationTime.minutes}
                    onChange={handleChangePreparationTime}
                />
                <label htmlFor="totalTimeHours">Total Time Hours:</label>
                <input
                    type="number"
                    id="totalTimeHours"
                    name="hours"
                    value={formData.totalTime.hours}
                    onChange={handleChangeTotalTime}
                />
                <label htmlFor="totalTimeMinutes">Total Time Minutes:</label>
                <input
                    type="number"
                    id="totalTimeMinutes"
                    name="minutes"
                    value={formData.totalTime.minutes}
                    onChange={handleChangeTotalTime}
                />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChangeCategory}
                />
                <label htmlFor="difficulty">Difficulty:</label>
                <input
                    type="text"
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChangeDifficulty}
                />
                <label htmlFor="ingredients">Ingredients:</label>
                {formData.ingredients.map((ingredient, index) => (
                    <div key={`${index}-${ingredient.name}`}>
                        <input
                            type="text"
                            name={`ingredient-name-${index}`} // Unique name for the ingredient name input
                            value={ingredient.name}
                            onChange={(event) => handleChangeIngredients(event, index, 'name')} // Pass the index and field name to handleChangeIngredients
                        />
                        <input
                            type="text"
                            name={`ingredient-amount-${index}`} // Unique name for the ingredient amount input
                            value={ingredient.quantity}
                            onChange={(event) => handleChangeIngredients(event, index, 'quantity')} // Pass the index and field name to handleChangeIngredients
                        />
                    </div>
                ))}

                <button type="submit">Add Recipe</button>
            </form>
            {error && <div className="error">Recipe already exists!</div>}

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
