import {useCallback, useEffect} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import "./RecipeDetailsPage.css";

type RecipeDetailsPageProps = {
    recipe: Recipe | null | undefined;
    setRecipe: (recipe: Recipe | null) => void;
}
export default function RecipeDetailsPage(props: Readonly<RecipeDetailsPageProps>) {
    const params = useParams<{ id: string }>();
    const { id } = params;

    const navigate = useNavigate();

    const fetchRecipeById = useCallback(() => {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                props.setRecipe(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipe", error);
                props.setRecipe(null);
            });
    }, [id, props]);

    useEffect(() => {
        fetchRecipeById();

        return () => {
        };
    }, [fetchRecipeById]);

    if (props.recipe === null) {
        return <Navigate to="/recipes" />;
    }

    if (props.recipe === undefined) {
        // Render a loading spinner or skeleton UI
        return <div>Loading...</div>;
    }

    const formatTime = (hours: number, minutes: number): string => {
        if (hours === 0) {
            return `${minutes} minutes`;
        } else if (minutes === 0) {
            return `${hours} hours`;
        } else {
            return `${hours} hours ${minutes} minutes`;
        }
    };

    return (
        <div className="recipe-details-container">
            <h1 className="recipe-name">{props.recipe.name} Details</h1>
            <div className="recipe-details">
                <p><strong>Description:</strong> {props.recipe.description}</p>
                <p><strong>Instructions:</strong> {props.recipe.instructions}</p>
                <p><strong>Author:</strong> {props.recipe.author}</p>
                <p><strong>Origin:</strong> {props.recipe.origin}</p>
                <p><strong>Type:</strong> {props.recipe.type}</p>
                <p><strong>Preparation Time:</strong> {formatTime(props.recipe.preparationTime.hours, props.recipe.preparationTime.minutes)}</p>
                <p><strong>Total Time:</strong> {formatTime(props.recipe.totalTime.hours, props.recipe.totalTime.minutes)}</p>
                <p><strong>Category:</strong> {props.recipe.category}</p>
                <p><strong>Difficulty:</strong> {props.recipe.difficulty}</p>
                <p><strong>Ingredients:</strong></p>
                <ul className="ingredient-list">
                    {props.recipe.ingredients.map((ingredient: RecipeIngredients, index: number) => (
                        <li key={ingredient.name + index}>
                            {ingredient.name}: {ingredient.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="back-button" onClick={() => navigate('/recipes')}>Back to Recipes</button>
        </div>
    );
}
