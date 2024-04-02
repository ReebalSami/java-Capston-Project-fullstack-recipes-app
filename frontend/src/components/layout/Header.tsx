import Navigation from "./Navigation.tsx";
import "./Header.css";
import UserAction from "../userActions/UserAction.tsx";
import Search from "../search/Search.tsx";

type HeaderProps={
    user:string | undefined | null
}
export default function Header(props: Readonly<HeaderProps>) {

    return (
        <header>
            <div className="header-left">
                <div className="logo"> MyRecipes</div>
                <Navigation/>
            </div>
            <div className="header-right">
                <Search/>
                <div className="separator"></div>
                <UserAction user={props.user}/>
            </div>
        </header>
    )
}