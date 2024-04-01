import {useState} from 'react';
import './HomePage.css';
import {Recipe} from '../types/Recipe.ts';
import RecipeCard from "../components/RecipeCard/RecipeCard.tsx";

type HomePageProps = {
    recipes: Recipe[];
}

export default function HomePage(props: Readonly<HomePageProps>) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % props.recipes.length;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + props.recipes.length) % props.recipes.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="homepage-container">
            <img
                src="/images/homepagePhoto.jpeg"
                alt="Homepage"
                className="homepage-image"/>

            <div className="carousel-section">
                <h3 className="carousel-title">The Latest Recipes</h3>
                <div className="carousel-nav">
                    <button className="prev-button" onClick={prevSlide}>Prev</button>
                    <div className="carousel">
                        {props.recipes.map((recipe, index) => (
                            <div key={recipe.id} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                                <RecipeCard recipe={recipe}/>
                                <h4>{recipe.name}</h4>
                            </div>

                        ))}
                    </div>
                    <button className="next-button" onClick={nextSlide}>Next</button>
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
