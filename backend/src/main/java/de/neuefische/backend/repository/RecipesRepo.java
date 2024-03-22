package de.neuefische.backend.repository;

import de.neuefische.backend.model.recipe.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipesRepo extends MongoRepository<Recipe, String> {
}
