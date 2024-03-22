import Layout from "./components/layout/Layout.tsx";
import {useEffect, useState} from "react";
import {Recipe} from "./types/Recipe.ts";
import axios from "axios";
import RecipesPage from "./pages/RecipesPage.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";


export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  function fetchRecipes() {
    axios.get("/api/recipes")
        .then(response => {
          setRecipes(response.data);
        })
        .catch(error => {
          console.error("Error fetching recipes", error)
        })
  }

  useEffect(fetchRecipes, []);
  if (!recipes) {
    return "Loading..."
  }

  return (
      <Layout >
        <Routes>
          <Route path={"/"} element={<HomePage recipes={recipes}/>}/>
          <Route path="/recipes" element={<RecipesPage recipes={recipes} />}/>
        </Routes>
      </Layout>
  )
}


