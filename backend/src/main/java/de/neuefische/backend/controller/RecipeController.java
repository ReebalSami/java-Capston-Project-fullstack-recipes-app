package de.neuefische.backend.controller;

import de.neuefische.backend.model.recipe.RecipeDto;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeNormalized saveNewRecipe(@RequestPart(name = "file", required = false) MultipartFile image, @RequestPart(name = "recipe") RecipeDto recipeDto) throws IOException {
        String imageUrl = "";
        if (image != null) {
            imageUrl = service.uploadImage(image);
        }
        RecipeDto recipeDtoWithImage = recipeDto.withImageUrl(imageUrl);
        return service.saveNewRecipe(recipeDtoWithImage);
    }

    @PutMapping("/{id}")
    public RecipeNormalized updateRecipeById(@PathVariable String id,@RequestBody RecipeDto recipeDto){
        return service.updateRecipeById(id,recipeDto);
    }

    @DeleteMapping("/{id}")
    public String deleteRecipeById(@PathVariable String id){
        return service.deleteById(id);
    }

}
