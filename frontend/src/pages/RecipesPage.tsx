import {Recipe} from "../types/Recipe.ts";
import RecipeCard from "../components/RecipeCard/RecipeCard.tsx";
import {User} from "../types/User.ts";

type RecipesPageProps = {
    recipes: Recipe[];
    fetchRecipe: () => void;
    user: User | null | undefined;

}

export default function RecipesPage(props: Readonly<RecipesPageProps>) {
    return (
        <div className="recipes-page-container">
            <div className="recipe-list">
                <h2>Recipe List</h2>
                <div className="recipes-container"
                     style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
                    {props.recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} fetchRecipe={props.fetchRecipe} user={props.user}/>
                    ))}
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}
