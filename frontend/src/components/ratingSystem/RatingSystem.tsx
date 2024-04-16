import {Rating} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import axios from "axios";
import "./RatingSystem.css";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Recipe} from "../../types/Recipe.ts";
import {User} from "../../types/User.ts";

type RatingSystemProps = {
    recipe: Recipe;
    fetchData: () => void;
    user: User | null | undefined;
}
export default function RatingSystem(props: Readonly<RatingSystemProps>) {
    const initialState= props.recipe.ratings?.find(rating=> rating.user.id === props.user?.id)?.ratingPoints;
    const [myRating, setMyRating] = useState<number>(initialState ?? 0);

    function calculateAverageRating(): number {
        let sumUpRating = 0
        if (props.recipe.ratings){
             sumUpRating = props.recipe.ratings
                .map(rating => rating.ratingPoints)
                .reduce((a, b) => a + b, 0);
        }
        if(sumUpRating !== 0 && props.recipe.ratings){
            return sumUpRating / props.recipe.ratings.length
        }
        return 0;
    }

    function handleSelectStars(_: SyntheticEvent<Element, Event>, value: number | null) {
        if (value !== 0 && value !== null) {
            setMyRating(value);
            axios.put("/api/recipes/change-rating/" + props.recipe.id, value, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(props.fetchData);
        }
    }

    const averageRating = calculateAverageRating();

    return (
        <div className={"ratingSystem"}>
            <div className={"ratingWrapper"}>
                <Rating emptyIcon={<StarBorderIcon className={"emptyIcon"} />} name={"half-rating"} value={myRating} onChange={handleSelectStars} precision={0.5}/>
            </div>
            { averageRating !== 0 &&
                <div className={"averageRating"}>
                <span className={"averageRatingText"}>
                    {averageRating.toFixed(1)}
                </span>
                    <StarBorderIcon className={"emptyIcon"}/>
                </div>
            }
        </div>
    )


}
