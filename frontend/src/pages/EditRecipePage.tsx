import './EditRecipePage.css';
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import MultipleCheckbox from "../utility_functions/MultipleCheckbox.tsx";
import {categoryNormalizerMap, typeNormalizerMap} from "../utility_functions/recipeNormalizer.ts";

export type EditRecipePageProps = {
    recipe: Recipe;
    fetchRecipes: () => void;
};


export default function EditRecipePage(props: Readonly<EditRecipePageProps>) {
    const navigate = useNavigate();

    const [name, setName] = useState(props.recipe.name);
    const [description, setDescription] = useState(props.recipe.description);
    const [instructions, setInstructions] = useState(props.recipe.instructions);
    const [author, setAuthor] = useState(props.recipe.author);
    const [origin, setOrigin] = useState(props.recipe.origin);

    const [difficulty, setDifficulty] = useState(props.recipe.difficulty.toUpperCase());
    const [types, setTypes] = useState<string[]>(props.recipe.type);
    const [categories, setCategories] = useState<string[]>(props.recipe.category);
    const [ingredients, setIngredients] = useState<RecipeIngredients[]>(props.recipe.ingredients);
    const [preparationTimeHours, setPreparationTimeHours] = useState(props.recipe.preparationTime.hours);
    const [preparationTimeMinutes, setPreparationTimeMinutes] = useState( props.recipe.preparationTime.minutes);
    const [totalTimeHours, setTotalTimeHours] = useState(props.recipe.totalTime.hours);
    const [totalTimeMinutes, setTotalTimeMinutes] = useState(props.recipe.totalTime.minutes);

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function handleInstructionsChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setInstructions(event.target.value);
    }

    function handleAuthorChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setAuthor(event.target.value);
    }

    function handleOriginChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setOrigin(event.target.value);
    }

    function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
        setDifficulty(event.target.value);
        console.log(event.target.value);
    }

    function handleTypeChange(event: SelectChangeEvent<typeof types>) {
        const{
            target: {value},
        } = event;
        setTypes(typeof value === 'string' ? value.split(',') : value,);
    }

    function handleCategoryChange(event: SelectChangeEvent<typeof categories>) {
        const {
            target: {value},
        } = event;
        setCategories(typeof value === 'string' ? value.split(',') : value,);
    }

    const handleIngredientsChange = (event: ChangeEvent<HTMLInputElement>, index: number, fieldName: 'name' | 'quantity') => {
        const value: string = event.target.value;
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][fieldName] = value;
        setIngredients(updatedIngredients);
    };

    function handlePreparationTimeHoursChange(event: ChangeEvent<HTMLInputElement>) {
        setPreparationTimeHours(Number(event.target.value));
    }

    function handlePreparationTimeMinutesChange(event: ChangeEvent<HTMLInputElement>) {
        setPreparationTimeMinutes(Number(event.target.value));
    }

    function handleTotalTimeHoursChange(event: ChangeEvent<HTMLInputElement>) {
        setTotalTimeHours(Number(event.target.value));
    }

    function handleTotalTimeMinutesChange(event: ChangeEvent<HTMLInputElement>) {
        setTotalTimeMinutes(Number(event.target.value));
    }

    function editThisItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (props.recipe !== undefined) {
            axios.put("/api/recipes/" + props.recipe.id, {
                name: name,
                description: description,
                instructions: instructions,
                author: author,
                origin: origin,
                difficulty: difficulty,
                type: types.map((type) => typeNormalizerMap[type as keyof typeof typeNormalizerMap]),
                category: categories.map((category) => categoryNormalizerMap[category as keyof typeof categoryNormalizerMap]),
                ingredients: ingredients,
                preparationTime: {
                    hours: preparationTimeHours,
                    minutes: preparationTimeMinutes
                },
                totalTime: {
                    hours: totalTimeHours,
                    minutes: totalTimeMinutes
                }
            })
                .then(() => {
                    props.fetchRecipes();
                    navigate("/recipes/" + props.recipe.id);
                });
        }
    }

    return (
        <div className={"changeContainer"}>
            <h2>Edit your recipe here</h2>
            <form onSubmit={editThisItem}>
                <label>
                    Name: <input type="text" value={name} onChange={handleNameChange} required/>

                </label>

                <label>
                    Description:<textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                />
                </label>

                <label>
                    Instructions:<textarea
                    id="instructions"
                    name="instructions"
                    value={instructions}
                    onChange={handleInstructionsChange}
                    required
                />
                </label>

                <label>
                    Author:<textarea
                    id="author"
                    name="author"
                    value={author}
                    onChange={handleAuthorChange}
                    required
                />
                </label>

                <label>
                    Origin:<textarea
                    id="origin"
                    name="origin"
                    value={origin}
                    onChange={handleOriginChange}
                    required
                />
                </label>

                <label>
                    Difficulty:<select value={difficulty} onChange={handleDifficultyChange}>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
                </label>


                <label>
                    Ingredients: {ingredients.map((ingredient, index) => (
                    <div key={name + index}>
                        <input type="text" value={ingredient.name}
                               onChange={(e) => handleIngredientsChange(e, index, 'name')} required/>
                        <input type="text" value={ingredient.quantity}
                               onChange={(e) => handleIngredientsChange(e, index, 'quantity')} required/>
                    </div>
                ))}
                </label>

                <label>
                    Preparation Time:<input type="number" value={preparationTimeHours}
                                            onChange={handlePreparationTimeHoursChange}
                                            required/>
                    <input type="number" value={preparationTimeMinutes}
                           onChange={handlePreparationTimeMinutesChange} required/>
                </label>

                <label>
                    Total Time:<input type="number" value={totalTimeHours} onChange={handleTotalTimeHoursChange}
                                      required/>
                    <input type="number" value={totalTimeMinutes} onChange={handleTotalTimeMinutesChange} required/>
                </label>

                <MultipleCheckbox categories={categories} changeCategories={handleCategoryChange}
                                  types={types} changeTypes={handleTypeChange}
                />


                <button type="submit">Save Changes</button>
                <button onClick={() => props.recipe && navigate("/recipes/" + props.recipe.id)}>Cancel</button>


            </form>
            <br/>
            <br/>
            <br/>
            <br/>

        </div>

    );
}
