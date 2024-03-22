package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.exception.ErrorMessage;
import de.neuefische.backend.model.recipe.*;
import de.neuefische.backend.repository.RecipesRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class RecipeControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private RecipesRepo repo;
    String message = "Recipe with ID: ${id} not found.";
    @Autowired
    private ObjectMapper objectmapper;

    @Test
    void getAllRecipes_returnEmptyList_WhenCalledInitially() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"))
                .andReturn();
    }

    @Test
    void getAllRecipe_returnsRecipe_whenCalledWithRecipeInRepo() throws Exception {
        //GIVEN
        PreparationTime preparationTime = new PreparationTime(0, 30);
        TotalTime totalTime = new TotalTime(1, 15);
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        recipeIngredients.add(new RecipeIngredients("name test", "quantity 1"));
        recipeIngredients.add(new RecipeIngredients("name test 2", "quantity 2"));
        Recipe recipe = new Recipe("1",
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
        );
        repo.save(recipe);
        //WHEN & THEN
        mvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "1",
                                "name": "Test Recipe",
                                "description": "Test Description",
                                "instructions": "Test Instructions",
                                "author": "Test Author",
                                "origin": "Test Origin",
                                "type": ["Vegetarian", "With Meat"],
                                "preparationTime": {"hours": 0, "minutes": 30},
                                "totalTime": {"hours": 1, "minutes": 15},
                                "category": ["Dinner", "Side Dish"],
                                "difficulty": "Easy",
                                "ingredients": [
                                                    {
                                                        "name": "name test",
                                                        "quantity": "quantity 1"
                                                    },
                                                    {
                                                        "name": "name test 2",
                                                        "quantity": "quantity 2"
                                                    }
                                                ]
                            }
                        ]

                        """))
                .andReturn();
    }

    @Test
    void getAllRecipe_returnsRecipeWithAllChoicesAvailable_whenCalledWithRecipeInRepo() throws Exception {
        //GIVEN
        PreparationTime preparationTime = new PreparationTime(0, 30);
        TotalTime totalTime = new TotalTime(1, 15);
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        recipeIngredients.add(new RecipeIngredients("name test", "quantity 1"));
        recipeIngredients.add(new RecipeIngredients("name test 2", "quantity 2"));
        Recipe recipe = new Recipe("1",
                "Test Recipe",
                "Test Description",
                "Test Instructions",
                "Test Author",
                "Test Origin",
                List.of(RecipeType.VEGAN ,RecipeType.VEGETARIAN, RecipeType.WITH_MEAT, RecipeType.PESCATARIAN, RecipeType.GLUTEN_FREE, RecipeType.LACTOSE_FREE, RecipeType.OTHER),
                preparationTime,
                totalTime,
                List.of(RecipeCategory.BREAKFAST, RecipeCategory.LUNCH ,RecipeCategory.DINNER, RecipeCategory.SIDE_DISH, RecipeCategory.DESSERT, RecipeCategory.SNACK, RecipeCategory.DRINK, RecipeCategory.APPETIZER, RecipeCategory.SALAD, RecipeCategory.SOUP, RecipeCategory.MAIN_DISH, RecipeCategory.BAKING, RecipeCategory.OTHER),
                RecipeDifficulty.HARD,
                recipeIngredients
        );
        repo.save(recipe);
        //WHEN & THEN
        mvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "1",
                                "name": "Test Recipe",
                                "description": "Test Description",
                                "instructions": "Test Instructions",
                                "author": "Test Author",
                                "origin": "Test Origin",
                                "type": ["Vegan", "Vegetarian", "With Meat", "Pescatarian", "Gluten Free", "Lactose Free", "Other"],
                                "preparationTime": {"hours": 0, "minutes": 30},
                                "totalTime": {"hours": 1, "minutes": 15},
                                "category": ["Breakfast", "Lunch", "Dinner", "Side Dish", "Dessert", "Snack", "Drink", "Appetizer", "Salad", "Soup", "Main Dish", "Baking", "Other"],
                                "difficulty": "Hard",
                                "ingredients": [
                                                    {
                                                        "name": "name test",
                                                        "quantity": "quantity 1"
                                                    },
                                                    {
                                                        "name": "name test 2",
                                                        "quantity": "quantity 2"
                                                    }
                                                ]
                            }
                        ]

                        """))
                .andReturn();
    }

    @Test
    void getRecipeById_returnsRecipeWithId1_whenCalledWithId1() throws Exception {
        //GIVEN
        PreparationTime preparationTime = new PreparationTime(0, 30);
        TotalTime totalTime = new TotalTime(1, 15);
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        recipeIngredients.add(new RecipeIngredients("name test", "quantity 1"));
        recipeIngredients.add(new RecipeIngredients("name test 2", "quantity 2"));
        Recipe recipe = new Recipe("1",
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
        );
        repo.save(recipe);
        //WHEN & THEN
        mvc.perform(get("/api/recipes/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "name": "Test Recipe",
                            "description": "Test Description",
                            "instructions": "Test Instructions",
                            "author": "Test Author",
                            "origin": "Test Origin",
                            "type": ["Vegetarian", "With Meat"],
                            "preparationTime": {"hours": 0, "minutes": 30},
                            "totalTime": {"hours": 1, "minutes": 15},
                            "category": ["Dinner", "Side Dish"],
                            "difficulty": "Easy",
                            "ingredients": [
                                                {
                                                    "name": "name test",
                                                    "quantity": "quantity 1"
                                                },
                                                {
                                                    "name": "name test 2",
                                                    "quantity": "quantity 2"
                                                }
                                            ]
                        }
                        """))
                .andReturn();
    }

    @Test
    void getRecipeById_whenRecipeNotFound() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN & THEN
        mvc.perform(get("/api/recipes/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().json(objectmapper.writeValueAsString(new ErrorMessage(message.replace("${id}", id)))));
    }

    @Test
    void saveNewRecipe_returnsRecipeWithIdNotEmpty_whenWithRequestBodyCalled() throws Exception {
        //GIVEN
        String requestBody = """
                {
                    "name": "Test Recipe",
                    "description": "Test Description",
                    "instructions": "Test Instructions",
                    "author": "Test Author",
                    "origin": "Test Origin",
                    "type": ["VEGETARIAN", "WITH_MEAT"],
                    "preparationTime": {"hours": 0, "minutes": 30},
                    "totalTime": {"hours": 1, "minutes": 15},
                    "category": ["DINNER", "SIDE_DISH"],
                    "difficulty": "EASY",
                    "ingredients": [
                                        {
                                            "name": "name test",
                                            "quantity": "quantity 1"
                                        },
                                        {
                                            "name": "name test 2",
                                            "quantity": "quantity 2"
                                        }
                                    ]
                }
                """;
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(content().json("""
                        {
                            "name": "Test Recipe",
                            "description": "Test Description",
                            "instructions": "Test Instructions",
                            "author": "Test Author",
                            "origin": "Test Origin",
                            "type": ["Vegetarian", "With Meat"],
                            "preparationTime": {"hours": 0, "minutes": 30},
                            "totalTime": {"hours": 1, "minutes": 15},
                            "category": ["Dinner", "Side Dish"],
                            "difficulty": "Easy",
                            "ingredients": [
                                                {
                                                    "name": "name test",
                                                    "quantity": "quantity 1"
                                                },
                                                {
                                                    "name": "name test 2",
                                                    "quantity": "quantity 2"
                                                }
                                            ]
                        }
                        """))
                .andReturn();
    }
}