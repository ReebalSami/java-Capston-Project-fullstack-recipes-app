package de.neuefische.backend.model.recipe;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("recipes")
public class Recipe {
    private String id;
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
    private String imageUrl;
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Rating> ratings = new ArrayList<>();
}
