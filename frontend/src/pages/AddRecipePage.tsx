import "./AddRecipePage.css";
import {ChangeEvent, FormEvent, SyntheticEvent, useState} from "react";
import {addRecipeToLibrary} from "../utility_functions/addRecipe.ts";
import {Recipe, RecipeFormPrimitiveInputType, RecipeFormPrimitiveInputValue} from "../types/Recipe.ts";
import OriginSelect from "../utility_functions/OriginSelect.tsx";
import {RecipeOrigin} from "../types/RecipeOrigin.ts";
import MultipleCheckboxCategory from "../utility_functions/MultipleCheckboxCategory.tsx";
import MultipleCheckboxType from "../utility_functions/MultipleCheckboxType.tsx";
import {RecipeDifficulty} from "../types/RecipeDifficulty.ts";
import DifficultySelect from "../utility_functions/DifficultySelect.tsx";
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Button, Fab, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import {useNavigate} from "react-router-dom";


type AddRecipePageProps = {
    recipes: Recipe[];
    fetchRecipes: () => void;
}

export default function AddRecipePage(props: Readonly<AddRecipePageProps>) {
    const [recipe, setRecipe] = useState<Recipe>({
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
        ingredients: [{name: "", quantity: ""}],
        imageUrl: ""
    });
    const [image, setImage] = useState<File>();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const changeFormValue = (key: string, value: RecipeFormPrimitiveInputValue) => {
        setRecipe((prevData) => ({
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
    const handleChangeOrigin = (_event: SyntheticEvent<Element, Event>, value: RecipeOrigin | null) => {
        if (value) {
            changeFormValue('origin', value.label);
        } else {
            changeFormValue('origin', '');
        }
    }
    const handleChangeDifficulty = (_event: SyntheticEvent<Element, Event>, value:RecipeDifficulty  | null) => {
        if (value) {

            changeFormValue('difficulty', value.toUpperCase());
        } else {
            changeFormValue('difficulty', '');
        }
    }

    const handleCategoryChange = (_event: SyntheticEvent<Element, Event>, value: string[]) => {
        const uppercaseCategories = value.map(category => category.toUpperCase());
        changeFormValue('category', uppercaseCategories);
    }

    const handleTypeChange = (_event: SyntheticEvent<Element, Event>, value: string[]) => {
        const uppercaseTypes = value.map(type => type.toUpperCase());
        changeFormValue('type', uppercaseTypes);
    }

    const handleTimeInput = (key: string, hourInputName: string, minuteInputName: string) => {
        const hours = getFormElementValue(hourInputName);
        const minutes = getFormElementValue(minuteInputName);
        setRecipe((prevData) => ({
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
        const newIngredients = [...recipe.ingredients];
        newIngredients[index][fieldName] = value;

        setRecipe((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const handleAddIngredient = () => {
        setRecipe((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, {name: "", quantity: ""}],
        }));
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients.splice(index, 1);
        setRecipe((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const matchingRecipe = props.recipes.find(currentRecipe => currentRecipe.name === recipe.name);
        if (matchingRecipe) {
            setError(true);
            return;
        }
        const formDataWithImage = new FormData();
        formDataWithImage.append("recipe",new Blob([JSON.stringify(recipe)], {'type': "application/json"}));

        if (image) {
            formDataWithImage.append("file", image);
        }

        await addRecipeToLibrary(formDataWithImage, props.fetchRecipes);
    };

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className={"addRecipePage"}>
            <h1>Add Recipe</h1>
            <form className={"addRecipeForm"} id="recipe-form" onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleChangeEvent.bind(null, 'string', 'name')}
                />
                <label htmlFor={"image"}>Image:</label>
                <Button
                    component="label"
                    role={undefined}
                    style={{width: 144.22}}
                    variant="contained"
                    className={"upload-button"}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload file
                    <VisuallyHiddenInput type="file"
                                         id={"image"}
                                         name={"image"}
                                         onChange={onImageChange}/>
                </Button>
                <img src={image ? URL.createObjectURL(image) : ""} alt={"Recipe"} className={"recipe-image"}/>

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={recipe.description}
                    onChange={handleChangeEvent.bind(null, "string", "description")}
                />
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChangeEvent.bind(null, "string", "instructions")}
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={recipe.author}
                    onChange={handleChangeEvent.bind(null, 'string', 'author')}
                />
                <label htmlFor="origin">Origin:</label>
                <OriginSelect handleOrigins={handleChangeOrigin}/>
                <div>
                    <label htmlFor="hours" style={{display: 'inline-block', marginRight: '10px'}}>Preparation
                        Time:</label>
                    <select
                        id="hours"
                        name="preparationTimeHours"
                        value={recipe.preparationTime.hours}
                        onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                        style={{width: '100px', display: 'inline-block', marginRight: '5px'}} // Adjust width as needed
                    >
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <span style={{display: 'inline-block', marginRight: '5px'}}>h</span>
                    <select
                        id="minutes"
                        name="preparationTimeMinutes"
                        value={recipe.preparationTime.minutes}
                        onChange={handleTimeInput.bind(null, 'preparationTime', 'preparationTimeHours', 'preparationTimeMinutes')}
                        style={{width: '100px', display: 'inline-block', marginRight: '5px'}} // Adjust width as needed
                    >
                        {[...Array(60).keys()].map((minute) => (
                            <option key={minute} value={minute}>{minute}</option>
                        ))}
                    </select>
                    <span style={{display: 'inline-block'}}>min</span>
                </div>


                <div>
                    <label htmlFor="totalTimeHours" style={{display: 'inline-block', marginRight: '10px'}}>Total Time
                        Hours:</label>
                    <select
                        id="totalTimeHours"
                        name="totalTimeHours"
                        value={recipe.totalTime.hours}
                        onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                        style={{width: '100px', display: 'inline-block', marginRight: '5px'}} // Adjust width as needed
                    >
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <span style={{display: 'inline-block', marginRight: '5px'}}>h</span>
                    <select
                        id="totalTimeMinutes"
                        name="totalTimeMinutes"
                        value={recipe.totalTime.minutes}
                        onChange={handleTimeInput.bind(null, 'totalTime', 'totalTimeHours', 'totalTimeMinutes')}
                        style={{width: '100px', display: 'inline-block', marginRight: '5px'}} // Adjust width as needed
                    >
                        {[...Array(60).keys()].map((minute) => (
                            <option key={minute} value={minute}>{minute}</option>
                        ))}
                    </select>
                    <span style={{display: 'inline-block'}}>min</span>
                </div>


                <label htmlFor="category">Category:</label>
                <MultipleCheckboxCategory categories={recipe.category} handleCategories={handleCategoryChange}/>
                <label htmlFor="type">Type:</label>
                <MultipleCheckboxType types={recipe.type} handleTypes={handleTypeChange}/>
                <label htmlFor="difficulty">Difficulty:</label>
                <DifficultySelect handleDifficulty={handleChangeDifficulty}/>

                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
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
                            <Fab color="secondary" aria-label="delete ingredient">
                                <DeleteIcon onClick={() => handleDeleteIngredient(index)}/>
                            </Fab>
                        </div>
                    ))}
                    <Fab color="primary" aria-label="add ingredient">
                        <AddIcon onClick={handleAddIngredient}/>
                    </Fab>
                </div>
                <br/>

                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<CancelIcon onClick={() => navigate("/")} />}>
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit"  endIcon={<SendIcon/>}>
                        Save Recipe
                    </Button>
                </Stack>
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
