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
        // Create a new Rating object with the provided rating points and the user from OAuth2User
        Rating newRating = new Rating(ratingPoints, userService.getUserById(oAuth2User.getAttributes().get("id").toString()).orElseThrow());

        // Retrieve the recipe to update its ratings
        RecipeNormalized recipe = recipeService.getRecipeById(id);

        // Filter out the existing rating for the same user, if any
        List<Rating> newRatings = recipe.getRatings().stream()
                .filter(rating -> !rating.getUser().getId().equals(newRating.getUser().getId()))
                .collect(Collectors.toList());

        // Add the new rating to the list of ratings
        newRatings.add(newRating);

        // Update the ratings of the recipe
        recipe.setRatings(newRatings);

        // Update the original Recipe object with the new ratings
        Recipe updatedRecipe = recipeService.findRecipeById(id);
        updatedRecipe.setRatings(newRatings);

        // Save the updated recipe to the repository
        updatedRecipe = recipesRepo.save(updatedRecipe);

        // Convert the updated Recipe object back to RecipeNormalized
        return new RecipeNormalized(updatedRecipe);
    }
}