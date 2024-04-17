import {Recipe} from "../../types/Recipe.ts";
import {useNavigate} from "react-router-dom";
import "./RecipeCard.css";
import Card from "@mui/material/Card";
import {CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {User} from "../../types/User.ts";
import RatingSystem from "../ratingSystem/RatingSystem.tsx";

type RecipeCardProps = {
    recipe: Recipe
    user: User | null | undefined
    fetchRecipe: () => void
}

export default function RecipeCard(props: Readonly<RecipeCardProps>) {
    const navigate = useNavigate();

    function goToRecipeDetailsPage(id: string | undefined) {
        navigate("/recipes/" + id);
    }

    return (
        <Card className="recipe-card">
            <CardActionArea onClick={() => (goToRecipeDetailsPage(props.recipe.id))}>
                <CardMedia
                    component="img"
                    height="140"
                    image= {props.recipe.imageUrl}
                    alt= "Image was not found :("
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="recipe-name">
                        {props.recipe.name.length > 20 ? props.recipe.name.substring(0, 20) + '...' : props.recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Preparation time:
                        {props.recipe.preparationTime.hours} h :
                        {props.recipe.preparationTime.minutes} m <br/>
                        Total time:
                        {props.recipe.totalTime.hours} h :
                        {props.recipe.totalTime.minutes} m
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <RatingSystem recipe={props.recipe} fetchData={props.fetchRecipe} user={props.user}/>
            </CardActions>
        </Card>
    );
}
