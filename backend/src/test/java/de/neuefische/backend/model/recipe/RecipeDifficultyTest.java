package de.neuefische.backend.model.recipe;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeDifficultyTest {

    @Test
    void getNormalDifficulty_returnsEasy_whenEnumCalledWithGetNormalDifficulty() {
        //GIVEN
        RecipeDifficulty recipeDifficulty = RecipeDifficulty.EASY;
        //WHEN
        String actual = recipeDifficulty.getNormalDifficulty();
        //THEN
        assertEquals("Easy", actual);
    }
}