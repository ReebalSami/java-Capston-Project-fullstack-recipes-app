import {Recipe} from "../../types/Recipe.ts";
import {useNavigate} from "react-router-dom";
import "./RecipeCard.css";
import Card from "@mui/material/Card";
import {Button, CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type RecipeCardProps = {
    recipe: Recipe
}

export default function RecipeCard(props: Readonly<RecipeCardProps>) {
    const navigate = useNavigate();

    function goToRecipeDetailsPage(id: string | undefined) {
        navigate("/recipes/" + id);
    }

    return (
        <Card className="recipe-card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image= {props.recipe.imageUrl}
                    alt= "https://res.cloudinary.com/dergdq6qs/image/upload/v1712181382/o5gm3luzvcnv0ifsznnw.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.recipe.name}
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
                <Button onClick={() => (goToRecipeDetailsPage(props.recipe.id))}>
                    learn more
                </Button>
            </CardActions>
        </Card>
    );
}
