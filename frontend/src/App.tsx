import Layout from "./components/layout/Layout.tsx";
import {useEffect, useState} from "react";
import {Recipe} from "./types/Recipe.ts";
import axios from "axios";
import RecipesPage from "./pages/RecipesPage.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RecipeDetailsPage from "./pages/RecipeDetailsPage.tsx";
import AddRecipePage from "./pages/AddRecipePage.tsx";
import EditRecipePage from "./pages/EditRecipePage.tsx";
import GenerateRecipePage from "./pages/GenerateRecipePage.tsx";
import SearchAndFilterPage from "./pages/SearchAndFilterPage.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";

export default function App() {
    const [recipes, setRecipes] = useState<Recipe[] | null | undefined>(undefined);
    const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);
    const [user, setUser] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                setUser(response.data)
            })
            .catch(() => {
                setUser(null)
            })
    }

    function fetchRecipes() {
        axios.get("/api/recipes")
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes", error)
            })
    }

    useEffect(() => {
        fetchRecipes();
        return () => {
        };
    }, []);

    if (recipes === null) {
        return <div>No Recipes found :(</div>;
    }

    if (recipes === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <Layout user={user}>
            <Routes>
                <Route path={"/"} element={<HomePage recipes={recipes}/>}/>
                <Route element={<ProtectedRoutes user={user} />}>
                    <Route path="/recipes" element={<RecipesPage recipes={recipes}/>}/>
                    <Route path="/recipes/:id" element={<RecipeDetailsPage recipe={recipe} setRecipe={setRecipe} fetchRecipes={fetchRecipes}/>}/>
                    <Route path="/recipes/add" element={<AddRecipePage recipes={recipes} fetchRecipes={fetchRecipes}/>}/>
                    {recipe && <Route path="/recipes/:id/edit" element={<EditRecipePage recipe={recipe} fetchRecipes={fetchRecipes}/>} />}
                    <Route path="/recipes/generate" element={<GenerateRecipePage fetchRecipes={fetchRecipes}/>}/>
                    <Route path="/recipes/search" element={<SearchAndFilterPage recipes={recipes}/>}/>
                    <Route path="/recipes/search/:searchValue" element={<SearchAndFilterPage recipes={recipes}/>}/>
                </Route>
            </Routes>
        </Layout>
    )
}


