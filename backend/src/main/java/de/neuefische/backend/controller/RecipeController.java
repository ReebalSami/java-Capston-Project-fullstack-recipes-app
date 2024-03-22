package de.neuefische.backend.controller;

import de.neuefische.backend.exception.RecipeNotFoundException;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;
    @GetMapping
    public List<RecipeNormalized> getAllRecipes(){
        return service.getAllRecipes();
    }

    @GetMapping("/{id}")
    public RecipeNormalized getRecipeById(@PathVariable String id){
        return service.getRecipeById(id);
    }

    @ExceptionHandler(RecipeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleRecipeNotFoundException(RecipeNotFoundException exception){
        return exception.getMessage();
    }

}
