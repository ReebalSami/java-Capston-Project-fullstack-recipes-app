import './HomePage.css';
import {Recipe} from '../types/Recipe.ts';
import RecipeCarousel from "../components/carousel/RecipeCarousel.tsx";

type HomePageProps = {
    recipes: Recipe[];
}

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <div className="homepage-container">
            <img
                src="/images/homepagePhoto.jpeg"
                alt="Homepage"
                className="homepage-image"/>
            <div className="carousel-section">
                <h3 className="carousel-title">Latest Recipes</h3>
                <div className="carousel">
                    <RecipeCarousel recipes={props.recipes}/>
                </div>
            </div>

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
