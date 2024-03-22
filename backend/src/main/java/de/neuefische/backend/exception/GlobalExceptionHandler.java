package de.neuefische.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RecipeNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleRecipeNotFoundException(RecipeNotFoundException exception){
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

}
