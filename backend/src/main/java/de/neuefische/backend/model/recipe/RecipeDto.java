package de.neuefische.backend.model.recipe;

import java.util.List;
public record RecipeDto(
        String name,
        String description,
        String instructions,
        String author,
        String origin,
        List<RecipeType> type,
        PreparationTime preparationTime,
        TotalTime totalTime,
        List<RecipeCategory> category,
        RecipeDifficulty difficulty,
        List<RecipeIngredients> ingredients
) {

}