package de.neuefische.backend.service;

import de.neuefische.backend.model.recipe.Rating;
import de.neuefische.backend.model.recipe.Recipe;
import de.neuefische.backend.model.recipe.RecipeNormalized;
import de.neuefische.backend.repository.RecipesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RecipeService recipeService;
    private final RecipesRepo recipesRepo;
    private final UserService userService;

    public RecipeNormalized changeRating(OAuth2User oAuth2User, String id, double ratingPoints) {
        Rating newRating = new Rating(ratingPoints, userService.getUserById(oAuth2User.getAttributes().get("id").toString()).orElseThrow());
        RecipeNormalized recipe = recipeService.getRecipeById(id);
        List<Rating> newRatings = recipe.getRatings().stream()
                .filter(rating -> !rating.getUser().getId().equals(newRating.getUser().getId()))
                .collect(Collectors.toList());
        newRatings.add(newRating);
        recipe.setRatings(newRatings);
        Recipe updatedRecipe = recipeService.findRecipeById(id);
        updatedRecipe.setRatings(newRatings);
        updatedRecipe = recipesRepo.save(updatedRecipe);
        return new RecipeNormalized(updatedRecipe);
    }
}