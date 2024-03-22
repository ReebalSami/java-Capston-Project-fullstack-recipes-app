package de.neuefische.backend.service;

import de.neuefische.backend.exception.RecipeNotFoundException;
import de.neuefische.backend.model.recipe.*;
import de.neuefische.backend.repository.RecipesRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class RecipeServiceTest {
    private final RecipesRepo repo = mock(RecipesRepo.class);
    private final RecipeService recipeService = new RecipeService(repo);

    @Test
    void getAllRecipes_shouldReturnEmptyList_WhenCalledInitially() {
        //GIVEN
        List<RecipeNormalized> expected = List.of();
        List<Recipe> expectedRecipes = List.of();
        when(repo.findAll()).thenReturn(expectedRecipes);
        //WHEN
        List<RecipeNormalized> actual = recipeService.getAllRecipes();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void getAllRecipes_shouldReturnListWithOneRecipe_whenOneRecipeIsInRepo() {
        //GIVEN
        PreparationTime preparationTime = new PreparationTime(0, 30);
        TotalTime totalTime = new TotalTime(1, 15);
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        recipeIngredients.add(new RecipeIngredients("name test", "quantity 1"));
        recipeIngredients.add(new RecipeIngredients("name test 2", "quantity 2"));
        List<RecipeNormalized> expected = List.of(new RecipeNormalized("1",
                "Test Recipe",
                "Test Description",
                "Test Instructions",
                "Test Author",
                "Test Origin",
                List.of(RecipeType.VEGETARIAN.getNormalType(), RecipeType.WITH_MEAT.getNormalType()),
                preparationTime,
                totalTime,
                List.of(RecipeCategory.DINNER.getNormalCategory(), RecipeCategory.SIDE_DISH.getNormalCategory()),
                RecipeDifficulty.EASY.getNormalDifficulty(),
                recipeIngredients
        ));
        List<Recipe> expectedRecipes = List.of(new Recipe("1",
                "Test Recipe",
                "Test Description",
                "Test Instructions",
                "Test Author",
                "Test Origin",
                List.of(RecipeType.VEGETARIAN, RecipeType.WITH_MEAT),
                preparationTime,
                totalTime,
                List.of(RecipeCategory.DINNER, RecipeCategory.SIDE_DISH),
                RecipeDifficulty.EASY,
                recipeIngredients
        ));
        when(repo.findAll()).thenReturn(expectedRecipes);
        //WHEN
        List<RecipeNormalized> actual = recipeService.getAllRecipes();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void getRecipeById_whenRecipeFound() {
        //GIVEN
        String id = "1";
        RecipeNormalized expected = new RecipeNormalized("1",
                "Test Recipe",
                "Test Description",
                "Test Instructions",
                "Test Author",
                "Test Origin",
                List.of(RecipeType.VEGETARIAN.getNormalType(), RecipeType.WITH_MEAT.getNormalType()),
                new PreparationTime(0, 30),
                new TotalTime(1, 15),
                List.of(RecipeCategory.DINNER.getNormalCategory(), RecipeCategory.SIDE_DISH.getNormalCategory()),
                RecipeDifficulty.EASY.getNormalDifficulty(),
                List.of(new RecipeIngredients("name test", "quantity 1"), new RecipeIngredients("name test 2", "quantity 2"))
        );
        Recipe expectedRecipe = new Recipe("1",
                "Test Recipe",
                "Test Description",
                "Test Instructions",
                "Test Author",
                "Test Origin",
                List.of(RecipeType.VEGETARIAN, RecipeType.WITH_MEAT),
                new PreparationTime(0, 30),
                new TotalTime(1, 15),
                List.of(RecipeCategory.DINNER, RecipeCategory.SIDE_DISH),
                RecipeDifficulty.EASY,
                List.of(new RecipeIngredients("name test", "quantity 1"), new RecipeIngredients("name test 2", "quantity 2"))
        );
        //WHEN
        when(repo.findById(id)).thenReturn(Optional.of(expectedRecipe));
        RecipeNormalized actual = recipeService.getRecipeById(id);
        //THEN
        verify(repo).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void getRecipeById_whenRecipeNotFound() {
        //GIVEN
        String id = "1";
        //THEN
        assertThrows(RecipeNotFoundException.class, () -> recipeService.getRecipeById(id));
    }
}