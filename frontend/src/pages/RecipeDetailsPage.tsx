import {useCallback, useEffect} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Recipe, RecipeIngredients} from "../types/Recipe.ts";
import "./RecipeDetailsPage.css";
import {Button, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BlenderOutlinedIcon from "@mui/icons-material/BlenderOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import RatingSystem from "../components/ratingSystem/RatingSystem.tsx";


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
            <div className="recipe-details">
                <div className="recipe-header">
                    <h3 className="recipe-name">{props.recipe.name}</h3>
                    <p className="recipe-description"> {props.recipe.description}</p>
                    <img src={props.recipe.imageUrl} alt={props.recipe.name} className="recipe-image"/>
                </div>
                <div className="recipe-specification-container">
                    <div className="recipe-difficulty-origin-author-container">
                        <div className="recipe-difficulty">
                            <strong>Difficulty:</strong> {props.recipe.difficulty}
                        </div>
                        <div className="recipe-origin">
                            <strong>Origin:</strong> {props.recipe.origin}
                        </div>
                        <div className="recipe-rating">
                            <RatingSystem recipe={props.recipe} fetchData={fetchRecipeById} user={null}/>
                        </div>



                    </div>
                    <div className="recipe-type-category-container">
                        <div className="recipe-type">
                        <strong>Type:</strong> {props.recipe.type.join(', ')}
                        </div>
                        <div className="recipe-category">
                            <strong>Category:</strong> {props.recipe.category.join(', ')}
                        </div>
                        <div className="recipe-author">
                            <strong>Author:</strong> {props.recipe.author}
                        </div>
                    </div>
                    <div className="recipe-time-container">
                        <div className="recipe-preparation-time">
                        <div className="preparation-content">
                                <div className="preparation-icon">
                                    <BlenderOutlinedIcon className="icon"/>
                                </div>
                                <div className="preparation-details">
                                    <strong>Preparation Time:</strong> <br/>
                                    {props.recipe.preparationTime.hours > 0 && `${props.recipe.preparationTime.hours}h `}
                                    {props.recipe.preparationTime.minutes > 0 && `${props.recipe.preparationTime.minutes}min`}
                                </div>
                            </div>
                        </div>
                        <div className="recipe-total-time">
                            <div className="total-content">
                                <div className="total-icon">
                                    <AlarmOnOutlinedIcon className="icon"/>
                                </div>
                                <div className="total-details">
                                    <strong>Total Time:</strong> <br/>
                                    {props.recipe.totalTime.hours > 0 && `${props.recipe.totalTime.hours}h `}
                                    {props.recipe.totalTime.minutes > 0 && `${props.recipe.totalTime.minutes}min`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <strong className="recipe-instructions">Instructions:</strong>
                <br/>
                {props.recipe.instructions}
                <br/>
                <br/>
                <strong className="recipe-ingredients">Ingredients:</strong>
                <br/>
                {props.recipe.ingredients.map((ingredient: RecipeIngredients, index: number) => (
                    <li key={ingredient.name + index}>
                        {ingredient.name}: {ingredient.quantity}
                    </li>
                ))}
            </div>
            <br/>
            <br/>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
                <Button variant="contained" onClick={handleEdit} endIcon={<EditIcon/>}>
                    Edit
                </Button>
            </Stack>
            <br/>
            <Button variant="outlined" onClick={() => navigate('/recipes')}>
                Back to Recipes
            </Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

    );
}
