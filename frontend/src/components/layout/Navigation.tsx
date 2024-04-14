import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Button, Menu, MenuItem, Stack} from "@mui/material";

export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClickAddRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (destination: string) => {
        navigate(destination);
        handleClose();
    };

    return (
        <nav>
            <Stack direction="row" spacing={1}>
                <Button component={Link} to={"/"} style={{color: 'white'}}>Home</Button>
                <Button component={Link} to={"/recipes"} style={{color: 'white'}}>Recipes</Button>
                <Button onClick={handleClickAddRecipe} style={{color: 'white'}}>Add Recipe</Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={() => handleMenuItemClick("/recipes/add")}>manually</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("/recipes/generate")}>generate with AI</MenuItem>
                </Menu>
                <Button component={Link} to={"/support"} style={{color: 'white'}}>Support</Button>
            </Stack>
        </nav>
    );
}
