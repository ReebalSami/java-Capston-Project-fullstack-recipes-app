package de.neuefische.backend.controller;

import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
