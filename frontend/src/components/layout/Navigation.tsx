import "./Navigation.css";
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/recipes"}>Recipes</Link></li>
                <li><Link to={"/recipes/add"}>Add Recipe</Link></li>
                <li><Link to={"/support"}>Support</Link></li>
            </ul>
        </nav>
    )
}