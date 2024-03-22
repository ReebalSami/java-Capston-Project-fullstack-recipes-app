import './HomePage.css';
import RecipesPage from "./RecipesPage.tsx";
import {Recipe} from "../types/Recipe.ts";

type HomePageProps = {
    recipes: Recipe[];
}

export default function HomePage(props: Readonly<HomePageProps>){
    return (
        <div className="homepage-container">
            <img
                src="/images/homepagePhoto.jpeg"
                alt="Homepage"
                className="homepage-image"
            />
            <RecipesPage recipes={props.recipes}/>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}



