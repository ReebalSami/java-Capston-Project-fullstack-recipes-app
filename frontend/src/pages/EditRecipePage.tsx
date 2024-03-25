import './EditRecipePage.css';
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import MultipleCheckbox from "../utility_functions/MultipleCheckbox.tsx";
import {categoryNormalizerMap, typeNormalizerMap} from "../utility_functions/recipeNormalizer.ts";

export type EditRecipePageProps = {
    recipes: Recipe[];
    fetchRecipes: () => void;
};

export default function EditRecipePage(props: Readonly<EditRecipePageProps>) {
    const params = useParams();
    const navigate = useNavigate();

    const recipe = props.recipes.find((recipe) => recipe.id === params.id);
    const [name, setName] = useState(recipe ? recipe.name : '');
    const [description, setDescription] = useState(recipe ? recipe.description : '');
    const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
    const [author, setAuthor] = useState(recipe ? recipe.author : '');
    const [origin, setOrigin] = useState(recipe ? recipe.origin : '');

    const [difficulty, setDifficulty] = useState(recipe ? recipe.difficulty : "");
    const [types, setTypes] = useState<string[]>(recipe && Array.isArray(recipe.type) ? recipe.type : []);
    const [categories, setCategories] = useState<string[]>(recipe && Array.isArray(recipe.category) ? recipe.category : []);
    const [ingredients, setIngredients] = useState<RecipeIngredients[]>(recipe && Array.isArray(recipe.ingredients) ? recipe.ingredients : []);
    const [preparationTimeHours, setPreparationTimeHours] = useState(recipe ? recipe.preparationTime.hours : 0);
    const [preparationTimeMinutes, setPreparationTimeMinutes] = useState(recipe ? recipe.preparationTime.minutes : 0);
    const [totalTimeHours, setTotalTimeHours] = useState(recipe ? recipe.totalTime.hours : 0);
    const [totalTimeMinutes, setTotalTimeMinutes] = useState(recipe ? recipe.totalTime.minutes : 0);

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
    }

    function handleTypeChange(event: SelectChangeEvent<typeof types>) {
        const value = event.target.value;
        setTypes(typeof value === 'string' ? value.split(',') : value,);
    }

    function handleCategoryChange(event: SelectChangeEvent<typeof categories>) {
        const value = event.target.value;
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
        if (recipe !== undefined) {
            axios.put("/api/recipes/" + recipe.id, {
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
                    navigate("/recipes/" + recipe.id);
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
                <button onClick={() => recipe && navigate("/recipes/" + recipe.id)}>Cancel</button>


            </form>
            <br/>
            <br/>
            <br/>
            <br/>

        </div>

    );
}
