import {Box, Grid, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Recipe} from "../../types/Recipe.ts";
import {useState} from "react";
import RecipeCard from "../RecipeCard/RecipeCard.tsx";


type RecipeCarouselProps = {
    recipes: Recipe[];
};

export default function RecipeCarousel(props: Readonly<RecipeCarouselProps>) {
    const [startIndex, setStartIndex] = useState(0);
    const visibleRecipes = props.recipes.slice(startIndex, startIndex + 3);
    const goToPrevious = () => {
        setStartIndex((prevIndex) => Math.max(0, prevIndex - 3));
    };
    const goToNext = () => {
        setStartIndex((prevIndex) => Math.min(props.recipes.length - 3, prevIndex + 3));
    };
    return (
        <Box className="recipe-carousel-container">
            <Grid className="grid1" container spacing={14}>
                <Grid className="grid2" item xs={12}>
                    <Paper className="paper">
                        <Box className="box-content">
                            <IconButton className="navigation-buttons" onClick={goToPrevious} disabled={startIndex === 0}>
                                <NavigateBeforeIcon/>
                            </IconButton>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={2}>
                                    {visibleRecipes.map((recipe) => (
                                        <Grid key={recipe.id} item>
                                            <RecipeCard recipe={recipe}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <IconButton className="navigation-buttons" onClick={goToNext} disabled={startIndex >= props.recipes.length - 3}>
                                <NavigateNextIcon/>
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}
