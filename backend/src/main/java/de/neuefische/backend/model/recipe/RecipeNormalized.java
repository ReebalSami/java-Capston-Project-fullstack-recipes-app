package de.neuefische.backend.model.recipe;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeNormalized {
    private String id;
    private String name;
    private String description;
    private String instructions;
    private String author;
    private String origin;
    private List<String> type;
    private PreparationTime preparationTime;
    private TotalTime totalTime;
    private List<String> category;
    private String difficulty;
    private List<RecipeIngredients> ingredients;
    private String imageUrl;

    public RecipeNormalized(Recipe recipe) {
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.description = recipe.getDescription();
        this.instructions = recipe.getInstructions();
        this.author = recipe.getAuthor();
        this.origin = recipe.getOrigin();
        this.type = recipe.getType().stream().map(RecipeType::getNormalType).toList();
        this.preparationTime = recipe.getPreparationTime();
        this.totalTime = recipe.getTotalTime();
        this.category = recipe.getCategory().stream().map(RecipeCategory::getNormalCategory).toList();
        this.difficulty = recipe.getDifficulty().getNormalDifficulty();
        this.ingredients = recipe.getIngredients();
        this.imageUrl = recipe.getImageUrl();
    }
}
