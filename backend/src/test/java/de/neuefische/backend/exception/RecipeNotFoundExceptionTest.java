package de.neuefische.backend.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeNotFoundExceptionTest {
    @Test
    void RecipeNotFoundExceptionTest_returnsErrorMessage_whenException(){
    // GIVEN
    String errorMessage = "Recipe with ID: 123 not found.";
    // WHEN
    RecipeNotFoundException exception = new RecipeNotFoundException(errorMessage);
    // THEN
    assertEquals(errorMessage, exception.getMessage());
}
}