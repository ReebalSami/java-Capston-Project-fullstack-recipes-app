import "./AddRecipePage.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {Recipe} from "../types/Recipe.ts";


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
    const changeFormValue = (key: string, value: string | string[] | number | { hours: number, minutes: number }) => {
        setFormData((prevData) => ({
            ...prevData, //...spread operator
            [key]: value,
        }));
    }
    const handleChangeEvent = (inputType: "string" | "array" | "number" | "time", key: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value: string | string[] | number | { hours: number, minutes: number } = event.target.value;
        if (inputType === "string" || inputType === "number") {
            changeFormValue(key, value);
            return;
        }
        if (inputType === "time") {
            const {name, value} = event.target;
            const timeKey = name === "hours" ? "hours" : "minutes";
            const newValue = {
                ...formData.preparationTime,
                [timeKey]: parseInt(value)
            };
            changeFormValue("preparationTime", newValue);
        }
        if (inputType === "array") {
            value = value.split(',');
            changeFormValue(key, value);
        }
    }

    const handleChangeTotalTime = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            totalTime: {
                ...prevData.totalTime,
                [name]: parseInt(value, 10) || 0
            }
        }));
    };

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
            <form className={"addRecipeForm"} onSubmit={handleOnSubmit}>
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
                    name="hours"
                    value={formData.preparationTime.hours}
                    onChange={handleChangeEvent.bind(null, 'time', 'preparationTime')}
                />
                <label htmlFor="minutes">Preparation Time (minutes):</label>
                <input
                    type="number"
                    id="minutes"
                    name="minutes"
                    value={formData.preparationTime.minutes}
                    onChange={handleChangeEvent.bind(null, 'time', 'preparationTime')}
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
