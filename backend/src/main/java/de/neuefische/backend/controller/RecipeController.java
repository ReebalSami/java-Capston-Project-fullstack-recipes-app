package de.neuefische.backend.controller;

import de.neuefische.backend.model.recipe.RecipeDto;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.service.RatingService;
import de.neuefische.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;
    private final RatingService ratingService;
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
        if (image != null){
            String imageUrl = service.uploadImage(image);
            RecipeDto recipeDtoWithImage = recipeDto.withImageUrl(imageUrl);
            return service.saveNewRecipe(recipeDtoWithImage);
        } else if (recipeDto.imageUrl() != null && !recipeDto.imageUrl().isEmpty()){
            return service.saveNewRecipe(recipeDto);
        } else if (Objects.equals(recipeDto.imageUrl(), "")){
            String defaultImageUrl = "/images/mazza.jpeg";
            RecipeDto recipeDtoWithoutImage = recipeDto.withImageUrl(defaultImageUrl);
            return service.saveNewRecipe(recipeDtoWithoutImage);
        }
        return service.saveNewRecipe(recipeDto);
    }

    @PutMapping("/{id}")
    public RecipeNormalized updateRecipeById(@PathVariable String id,@RequestBody RecipeDto recipeDto){
        return service.updateRecipeById(id,recipeDto);
    }

    @DeleteMapping("/{id}")
    public String deleteRecipeById(@PathVariable String id){
        return service.deleteById(id);
    }

    @PutMapping(value="/change-rating/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public RecipeNormalized changeRating(@AuthenticationPrincipal OAuth2User oAuth2User, @PathVariable String id, @RequestBody double ratingPoints){
        return ratingService.changeRating(oAuth2User, id, ratingPoints);
    }
}


