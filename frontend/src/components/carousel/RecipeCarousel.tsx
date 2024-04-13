import {Box, Grid} from "@mui/material";
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
        setStartIndex((prevIndex) => Math.min(props.recipes.length - 2, prevIndex + 2));
    };
    return (
            <div className="carousel">
                <h2 className="carousel-title" style={{marginLeft: '75px'}}>Latest Recipes</h2>
                <Box className="box-content" display="flex" alignItems="center" justifyContent="center" >
                    <IconButton
                        className="navigation-buttons"
                        onClick={goToPrevious}
                        disabled={startIndex === 0}
                    >
                        <NavigateBeforeIcon/>
                    </IconButton>
                    <Grid container spacing={14}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={2}>
                                {visibleRecipes.map((recipe) => (
                                    <Grid key={recipe.id} item>
                                        <RecipeCard recipe={recipe}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <IconButton
                        className="navigation-buttons"
                        onClick={goToNext}
                        disabled={startIndex >= props.recipes.length - 2}
                    >
                        <NavigateNextIcon/>
                    </IconButton>
                </Box>
            </div>
    );
}