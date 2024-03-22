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
}
