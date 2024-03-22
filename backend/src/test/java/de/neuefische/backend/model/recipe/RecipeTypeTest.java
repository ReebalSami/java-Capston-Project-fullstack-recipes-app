package de.neuefische.backend.model.recipe;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeTypeTest {

    @Test
    void getNormalType_returnsVegan_whenEnumCalledWithGetNormalType() {
        //GIVEN
        RecipeType recipeType = RecipeType.VEGAN;
        //WHEN
        String actual = recipeType.getNormalType();
        //THEN
        assertEquals("Vegan", actual);
    }
}