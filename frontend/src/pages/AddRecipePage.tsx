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
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const handleTimeInput = (key: string, hourInputName: string, minuteInputName: string) => {
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

    const handleAddIngredient = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, {name: "", quantity: ""}],
        }));
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...formData.ingredients];
        newIngredients.splice(index, 1);
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
                <select
                    id="hours"
                    name="preparationTimeHours"
                    value={formData.preparationTime.hours}
                    onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                >
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
                <label htmlFor="minutes">Preparation Time (minutes):</label>
                <select
                    id="minutes"
                    name="preparationTimeMinutes"
                    value={formData.preparationTime.minutes}
                    onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                >
                    {[...Array(60).keys()].map((minute) => (
                        <option key={minute} value={minute}>{minute}</option>
                    ))}
                </select>
                <label htmlFor="totalTimeHours">Total Time Hours:</label>
                <select
                    id="totalTimeHours"
                    name="totalTimeHours"
                    value={formData.totalTime.hours}
                    onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                >
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
                <label htmlFor="totalTimeMinutes">Total Time Minutes:</label>
                <select
                    id="totalTimeMinutes"
                    name="totalTimeMinutes"
                    value={formData.totalTime.minutes}
                    onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                >
                    {[...Array(60).keys()].map((minute) => (
                        <option key={minute} value={minute}>{minute}</option>
                    ))}
                </select>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChangeEvent.bind(null, 'array', 'type')}
                >
                    <option value="VEGAN">Vegan</option>
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="WITH_MEAT">With Meat</option>
                    <option value="PESCATARIAN">Pescatarian</option>
                    <option value="GLUTEN_FREE">Gluten Free</option>
                    <option value="LACTOSE_FREE">Lactose Free</option>
                    <option value="OTHER">Other</option>
                </select>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChangeEvent.bind(null, 'array', 'category')}
                >
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                    <option value="DESSERT">Dessert</option>
                    <option value="SNACK">Snack</option>
                    <option value="DRINK">Drink</option>
                    <option value="APPETIZER">Appetizer</option>
                    <option value="SALAD">Salad</option>
                    <option value="SOUP">Soup</option>
                    <option value="SIDE_DISH">Side Dish</option>
                    <option value="MAIN_DISH">Main Dish</option>
                    <option value="BAKING">Baking</option>
                    <option value="OTHER">Other</option>
                </select>
                <label htmlFor="difficulty">Difficulty:</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChangeEvent.bind(null, 'string', 'difficulty')}
                >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={`${index}-${ingredient.name}`}>
                            <label htmlFor={`ingredient-name-${index}`}>Ingredient Name:</label>
                            <input
                                type="text"
                                name={`ingredient-name-${index}`}
                                value={ingredient.name}
                                onChange={(event) => handleChangeIngredients(event, index, 'name')}
                            />
                            <label htmlFor={`ingredient-quantity-${index}`}>Quantity:</label>
                            <input
                                type="text"
                                name={`ingredient-quantity-${index}`}
                                value={ingredient.quantity}
                                onChange={(event) => handleChangeIngredients(event, index, 'quantity')}
                            />
                            <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                </div>
                <br/>

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
