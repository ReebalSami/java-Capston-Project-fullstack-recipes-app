package de.neuefische.backend.model.recipe;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecipeDto {
    private String name;
    private String description;
    private String instructions;
    private String author;
    private String origin;
    private List<RecipeType> type;
    private PreparationTime preparationTime;
    private TotalTime totalTime;
    private List<RecipeCategory> category;
    private RecipeDifficulty difficulty;
    private List<RecipeIngredients> ingredients;
}
