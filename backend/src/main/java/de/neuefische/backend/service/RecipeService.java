package de.neuefische.backend.service;

import de.neuefische.backend.exception.RecipeNotFoundException;
import de.neuefische.backend.model.recipe.RecipeCategory;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.model.recipe.RecipeType;
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
        return repo.findAll().stream().map(recipe -> new RecipeNormalized(
                recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                recipe.getInstructions(),
                recipe.getAuthor(),
                recipe.getOrigin(),
                recipe.getType().stream().map(RecipeType::getNormalType).toList(),
                recipe.getPreparationTime(),
                recipe.getTotalTime(),
                recipe.getCategory().stream().map(RecipeCategory::getNormalCategory).toList(),
                recipe.getDifficulty().getNormalDifficulty(),
                recipe.getIngredients()
        )).toList();
    }

    public RecipeNormalized getRecipeById(String id) {
        return repo
                .findById(id).stream().map(recipe -> new RecipeNormalized(
                        recipe.getId(),
                        recipe.getName(),
                        recipe.getDescription(),
                        recipe.getInstructions(),
                        recipe.getAuthor(),
                        recipe.getOrigin(),
                        recipe.getType().stream().map(RecipeType::getNormalType).toList(),
                        recipe.getPreparationTime(),
                        recipe.getTotalTime(),
                        recipe.getCategory().stream().map(RecipeCategory::getNormalCategory).toList(),
                        recipe.getDifficulty().getNormalDifficulty(),
                        recipe.getIngredients()
                )).findFirst()
                .orElseThrow(() -> new RecipeNotFoundException(message.replace("${id}", id)));
    }
}
