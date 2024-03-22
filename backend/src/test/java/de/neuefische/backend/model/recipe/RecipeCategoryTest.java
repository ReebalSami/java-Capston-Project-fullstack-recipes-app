package de.neuefische.backend.model.recipe;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeCategoryTest {

    @Test
    void getNormalCategory_returnsBreakfast_whenEnumCalledWithGetNormalCategory() {
        //GIVEN
        RecipeCategory recipeCategory = RecipeCategory.BREAKFAST;
        //WHEN
        String actual = recipeCategory.getNormalCategory();
        //THEN
        assertEquals("Breakfast", actual);
    }
}