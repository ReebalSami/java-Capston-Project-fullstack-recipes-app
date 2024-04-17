import {Recipe, RecipeCategory, RecipeType} from "../types/Recipe.ts";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard.tsx";
import {Autocomplete, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {User} from "../types/User.ts";

type SearchAndFilterPageProps = {
    recipes: Recipe[];
    fetchRecipe: () => void;
    user: User | null | undefined;
}

export default function SearchAndFilterPage(props: Readonly<SearchAndFilterPageProps>) {
    const params = useParams();
    const searchTerm = params.searchValue;

    const [searchValue, setSearchValue] = useState<string>(searchTerm ?? "");
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("");

    const optionalCategories = Object.values(RecipeCategory)
    const optionalTypes = Object.values(RecipeType)

    const sortedRecipes = [...props.recipes].sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });

    useEffect(() => {
        setSearchValue(searchTerm ?? "");
    }, [searchTerm]);

    const filteredRecipes = sortedRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            recipe.category.toString().includes(searchCategory) &&
            recipe.type.toString().includes(searchType)
    })

    return (
        <>
            <div className={"searchForm"}>
                <Autocomplete
                    disablePortal
                    options={optionalCategories}
                    onInputChange={(_e, value) => setSearchCategory(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose Category"/>}/>
                <Autocomplete
                    disablePortal
                    options={optionalTypes}
                    onInputChange={(_e, value) => setSearchType(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose Type"/>}/>
            </div>
            <div className="recipe-list">
                <h2>Recipe List</h2>
                <div className="recipes-container"
                     style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} fetchRecipe={props.fetchRecipe} user={props.user}/>
                    ))}
                </div>
            </div>
        </>
    )
}