package de.neuefische.backend.service;

import de.neuefische.backend.exception.RecipeNotFoundException;
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
}
