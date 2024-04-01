import "./Navigation.css";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Menu, MenuItem} from "@mui/material";

export default function Navigation() {
    const[anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();


    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    }
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/recipes"}>Recipes</Link></li>
                <li className={"icon-place button"}>
                    <a href="#" onClick={handleClick}>Add Recipe</a>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={() => navigate("/recipes/add")}>manually</MenuItem>
                        <MenuItem onClick={() => navigate("/recipes/generate")}>generate with AI</MenuItem>
                    </Menu>
                </li>
                <li><Link to={"/support"}>Support</Link></li>
            </ul>
        </nav>
    )
}