import {useCallback, useEffect} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import "./RecipeDetailsPage.css";
import {Button, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type RecipeDetailsPageProps = {
    recipe: Recipe | null | undefined;
    setRecipe: (recipe: Recipe | null) => void;
    fetchRecipes: () => void;
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
        // eslint-disable-next-line
    }, [id]);

    if (props.recipe === null) {
        return <Navigate to="/recipes" />;
    }

    if (props.recipe === undefined) {
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

    function handleDelete() {
        if (props.recipe !== undefined && props.recipe !== null) {
            axios.delete(`/api/recipes/` + props.recipe.id)
                .then(() => {
                    props.fetchRecipes();
                    navigate('/recipes');
                })
                .catch(error => {
                    console.error("Error deleting recipe", error);
                });
        }
    }
    function handleEdit() {
        if (props.recipe !== undefined && props.recipe !== null) {
            navigate(`/recipes/` + props.recipe.id + `/edit`);
        }
    }

    return (
        <div className="recipe-details-container">
            <h1 className="recipe-name">{props.recipe.name} Details</h1>
            <div className="recipe-details">
                <img src={props.recipe.imageUrl} alt={props.recipe.name} className="recipe-image"/>
                <p><strong>Description:</strong> {props.recipe.description}</p>
                <p><strong>Instructions:</strong> {props.recipe.instructions}</p>
                <p><strong>Author:</strong> {props.recipe.author}</p>
                <p><strong>Origin:</strong> {props.recipe.origin}</p>
                <p><strong>Type:</strong> {props.recipe.type.join(', ')}</p>
                <p><strong>Preparation
                    Time:</strong> {formatTime(props.recipe.preparationTime.hours, props.recipe.preparationTime.minutes)}
                </p>
                <p><strong>Total
                    Time:</strong> {formatTime(props.recipe.totalTime.hours, props.recipe.totalTime.minutes)}</p>
                <p><strong>Category:</strong> {props.recipe.category.join(', ')}</p>
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
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
                <Button variant="contained" onClick={handleEdit} endIcon={<EditIcon/>}>
                    Edit
                </Button>
            </Stack>
            <button className="back-button" onClick={() => navigate('/recipes')}>Back to Recipes</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

    );
}
