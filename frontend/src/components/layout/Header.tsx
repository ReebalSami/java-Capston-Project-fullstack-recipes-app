import Navigation from "./Navigation.tsx";
import "./Header.css";
import UserAction from "../userActions/UserAction.tsx";
import Search from "../search/Search.tsx";

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