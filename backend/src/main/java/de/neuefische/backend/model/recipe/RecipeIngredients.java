package de.neuefische.backend.model.recipe;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecipeIngredients {
    private String name;
    private String quantity;
}
