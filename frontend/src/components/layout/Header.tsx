import Navigation from "./Navigation.tsx";
import "./Header.css";
import "../search/Search.tsx";
import Search from "../search/Search.tsx";
import UserAction from "../userActions/UserAction.tsx";

export default function Header() {

    return (
        <header>
            <div className="header-left">
                <div className="logo"> MyRecipes</div>
                <Navigation/>
            </div>
            <div className="header-right">
                <Search/>
                <div className="separator"></div>
                <UserAction/>
            </div>
        </header>
    )
}