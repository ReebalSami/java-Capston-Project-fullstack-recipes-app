import "./AddRecipePage.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {Recipe, RecipeFormPrimitiveInputType, RecipeFormPrimitiveInputValue} from "../types/Recipe.ts";


type AddRecipePageProps = {
    recipes: Recipe[];
    fetchRecipes: () => void;
}

export default function AddRecipePage(props: Readonly<AddRecipePageProps>) {
    const [formData, setFormData] = useState<Recipe>({
        name: "",
        description: "",
        instructions: "",
        author: "",
        origin: "",
        type: [],
        preparationTime: {hours: 0, minutes: 0},
        totalTime: {hours: 0, minutes: 0},
        category: [],
        difficulty: "",
        ingredients: [{name: "", quantity: ""}]
    });

    const [error, setError] = useState(false);
    const changeFormValue = (key: string, value: RecipeFormPrimitiveInputValue) => {
        setFormData((prevData) => ({
            ...prevData, //...spread operator
            [key]: value,
        }));
    }
    const handleChangeEvent = (
                                inputType: RecipeFormPrimitiveInputType,
                                key: string,
                                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                                ) => {

        let value: RecipeFormPrimitiveInputValue = event.target.value;

        if (inputType === "string") {
            changeFormValue(key, value);
            return;
        }
        if (inputType === "array") {
            value = value.split(',');
            changeFormValue(key, value);
        }
    };

    const handleTimeInput = (key:string, hourInputName: string, minuteInputName: string) => {
        const hours = getFormElementValue(hourInputName);
        const minutes = getFormElementValue(minuteInputName);
        setFormData((prevData) => ({
            ...prevData,
            [key]: {hours, minutes},
        }));
    }
    const getFormElementValue = (key: string) => {
        const form = document.getElementById("recipe-form") as HTMLFormElement;
        const input = form.elements.namedItem(key) as HTMLInputElement;
        return input.value;
    }

    const handleChangeIngredients = (event: ChangeEvent<HTMLInputElement>, index: number, fieldName: 'name' | 'quantity') => {
        const {value} = event.target;
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
            preparationTime: {hours: 0, minutes: 0},
            totalTime: {hours: 0, minutes: 0},
            category: [],
            difficulty: "",
            ingredients: [{name: "", quantity: ""}]
        });
    };

    return (
        <div className={"addRecipePage"}>
            <h1>Add Recipe</h1>
            <form className={"addRecipeForm"} id="recipe-form" onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeEvent.bind(null, 'string', 'name')}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChangeEvent.bind(null, "string", "description")}
                />
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChangeEvent.bind(null, "string", "instructions")}
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChangeEvent.bind(null, 'string', 'author')}
                />
                <label htmlFor="origin">Origin:</label>
                <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChangeEvent.bind(null, 'string', 'origin')}
                />
                <label htmlFor="hours">Preparation Time (hours):</label>
                <input
                    type="number"
                    id="hours"
                    name="preparationTimeHours"
                    value={formData.preparationTime.hours}
                    onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                />
                <label htmlFor="minutes">Preparation Time (minutes):</label>
                <input
                    type="number"
                    id="minutes"
                    name="preparationTimeMinutes"
                    value={formData.preparationTime.minutes}
                    onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                />
                <label htmlFor="totalTimeHours">Total Time Hours:</label>
                <input
                    type="number"
                    id="totalTimeHours"
                    name="totalTimeHours"
                    value={formData.totalTime.hours}
                    onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                />
                <label htmlFor="totalTimeMinutes">Total Time Minutes:</label>
                <input
                    type="number"
                    id="totalTimeMinutes"
                    name="totalTimeMinutes"
                    value={formData.totalTime.minutes}
                    onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                />
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChangeEvent.bind(null, 'array', 'type')}
                />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChangeEvent.bind(null, 'array', 'category')}
                />
                <label htmlFor="difficulty">Difficulty:</label>
                <input
                    type="text"
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChangeEvent.bind(null, 'string', 'difficulty')}
                />
                <label htmlFor="ingredients">Ingredients:</label>
                {formData.ingredients.map((ingredient, index) => (
                    <div key={`${index}-${ingredient.name}`}>
                        <input
                            type="text"
                            name={`ingredient-name-${index}`}
                            value={ingredient.name}
                            onChange={(event) => handleChangeIngredients(event, index, 'name')}
                        />
                        <input
                            type="text"
                            name={`ingredient-quantity-${index}`}
                            value={ingredient.quantity}
                            onChange={(event) => handleChangeIngredients(event, index, 'quantity')}
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
