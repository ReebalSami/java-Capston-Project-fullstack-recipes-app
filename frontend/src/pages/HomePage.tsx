import './HomePage.css';
import {Recipe} from '../types/Recipe.ts';
import RecipeCarousel from "../components/carousel/RecipeCarousel.tsx";
import {User} from "../types/User.ts";

type HomePageProps = {
    recipes: Recipe[];
    fetchRecipe: () => void;
    user: User | null | undefined;

};

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <div className="homepage-container">
            <img
                src="/images/homepagePhoto.jpeg"
                alt="Homepage"
                className="homepage-image"/>

            <RecipeCarousel fetchRecipe={props.fetchRecipe} user={props.user} recipes={props.recipes}/>


            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
