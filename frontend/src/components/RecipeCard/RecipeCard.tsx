import {Recipe} from "../../types/Recipe.ts";
import {useNavigate} from "react-router-dom";
import "./RecipeCard.css";

type RecipeCardProps = {
    recipe: Recipe
}

export default function RecipeCard(props: Readonly<RecipeCardProps>) {
    const navigate = useNavigate();

    function goToRecipeDetailsPage(id: string | undefined) {
        navigate("/recipes/" + id);
    }

    return (
        <button className="recipe-card" onClick={() => (goToRecipeDetailsPage(props.recipe.id))}>
            <h3>{props.recipe.name}</h3>
            <p>{props.recipe.description}</p>
        </button>
    )
}
