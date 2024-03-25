package de.neuefische.backend.service;

import de.neuefische.backend.exception.RecipeNotFoundException;
import de.neuefische.backend.model.recipe.Recipe;
import de.neuefische.backend.model.recipe.RecipeDto;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.repository.RecipesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipesRepo repo;
    String message = "Recipe with ID: ${id} not found.";

    public List<RecipeNormalized> getAllRecipes() {
        return repo.findAll().stream().map(RecipeNormalized::new)
            .toList();
    }

    public RecipeNormalized getRecipeById(String id) {
        return repo
                .findById(id).stream().map(RecipeNormalized::new)
                .findFirst()
                .orElseThrow(() -> new RecipeNotFoundException(message.replace("${id}", id)));
    }


    public RecipeNormalized saveNewRecipe(RecipeDto recipeDto) {
        Recipe temp = repo.save(new Recipe(
                null,
                recipeDto.name(),
                recipeDto.description(),
                recipeDto.instructions(),
                recipeDto.author(),
                recipeDto.origin(),
                recipeDto.type(),
                recipeDto.preparationTime(),
                recipeDto.totalTime(),
                recipeDto.category(),
                recipeDto.difficulty(),
                recipeDto.ingredients()
        ));

        return new RecipeNormalized(temp);
    }

    public Recipe findRecipeById(String id) {
        return repo
                .findById(id)
                .orElseThrow(() -> new RecipeNotFoundException("Recipe with ID: " + id + " not found."));
    }

    public String deleteById(String id) {
        Recipe recipe = findRecipeById(id);
        repo.delete(recipe);
        return "Recipe with ID: " + id + " has been deleted successfully.";
    }
}

