import {useCallback, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import "./RecipeDetailsPage.css";


export default function RecipeDetailsPage() {
    const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);
    const params = useParams<{ id: string }>();
    const { id } = params;

    const navigate = useNavigate();

    const fetchRecipeById = useCallback(() => {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipe", error);
                setRecipe(null);
            });
    }, [id]);

    useEffect(() => {
        fetchRecipeById();

        return () => {
        };
    }, [fetchRecipeById]);

    if (recipe === null) {
        return <Navigate to="/recipes" />;
    }

    if (recipe === undefined) {
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
            <h1 className="recipe-name">{recipe.name} Details</h1>
            <div className="recipe-details">
                <p><strong>Description:</strong> {recipe.description}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                <p><strong>Author:</strong> {recipe.author}</p>
                <p><strong>Origin:</strong> {recipe.origin}</p>
                <p><strong>Type:</strong> {recipe.type}</p>
                <p><strong>Preparation Time:</strong> {formatTime(recipe.preparationTime.hours, recipe.preparationTime.minutes)}</p>
                <p><strong>Total Time:</strong> {formatTime(recipe.totalTime.hours, recipe.totalTime.minutes)}</p>
                <p><strong>Category:</strong> {recipe.category}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                <p><strong>Ingredients:</strong></p>
                <ul className="ingredient-list">
                    {recipe.ingredients.map((ingredient: RecipeIngredients, index: number) => (
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
