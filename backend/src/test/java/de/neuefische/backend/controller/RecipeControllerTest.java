package de.neuefische.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.exception.ErrorMessage;
import de.neuefische.backend.model.recipe.*;
import de.neuefische.backend.repository.RecipesRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class RecipeControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private RecipesRepo repo;
    String message = "Recipe with ID: ${id} not found.";
    @Autowired
    private ObjectMapper objectmapper;
    @MockBean
    Cloudinary cloudinary;
    Uploader uploader = mock(Uploader.class);

    private final static String RECIPEBODY = """
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
                                                    ],
                                    "imageUrl": "imageUrl"
                                }
                                """;

    private final static String EMPTY_IMAGE_URL_RECIPEBODY = """
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
                                                    ],
                                    "imageUrl": ""
                                }
                                """;
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
                recipeIngredients,
                "imageUrl"
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
                                                ],
                                "imageUrl": "imageUrl"
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
                recipeIngredients,
                "imageUrl"
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
                                                ],
                                "imageUrl": "imageUrl"
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
                recipeIngredients,
                "imageUrl"
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
                                            ],
                            "imageUrl": "imageUrl"
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
    void saveNewRecipe_returnsRecipeWithIdNotEmptyAndWithImageUrl_whenWithMultipartRequestCalledAndImageUpload() throws Exception {
        //GIVEN
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), anyMap())).thenReturn(Map.of("secure_url", "testUrl"));

        MockMultipartFile mockFile = new MockMultipartFile("file", "content".getBytes(StandardCharsets.UTF_8));
        MockMultipartFile mockRecipe = new MockMultipartFile("recipe", "testRecipe", "application/json", RECIPEBODY.getBytes(StandardCharsets.UTF_8));
        mvc.perform(multipart("/api/recipes")
                        .file(mockFile)
                        .file(mockRecipe))
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
                                            ],
                            "imageUrl": "testUrl"
                        }
                        """));
}

    @Test
    void saveNewRecipe_returnsRecipeWithIdNotEmptyAndDefaultImageUrl_whenWithMultipartRequestCalledWithoutImage() throws Exception {
        //GIVEN
        MockMultipartFile mockRecipe = new MockMultipartFile("recipe", "testRecipe", "application/json", RECIPEBODY.getBytes(StandardCharsets.UTF_8));
        mvc.perform(multipart("/api/recipes")
                        .file(mockRecipe))
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
                                            ],
                            "imageUrl": "imageUrl"
                        }
                        """));
    }

    @Test
    void saveNewRecipe_returnsRecipeWithIdNotEmptyAndDefaultImageUrl_whenWithMultipartRequestCalledWithoutImageAndWithEmptyImageUrlString() throws Exception {
        //GIVEN
        MockMultipartFile mockRecipe = new MockMultipartFile("recipe", "testRecipe", "application/json", EMPTY_IMAGE_URL_RECIPEBODY.getBytes(StandardCharsets.UTF_8));
        mvc.perform(multipart("/api/recipes")
                        .file(mockRecipe))
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
                                            ],
                            "imageUrl": "/images/mazza.jpeg"
                        }
                        """));
    }


    @Test
    void updateRecipeById_returnsUpdatedRecipe_whenCalledWithChanges() throws Exception {
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
                recipeIngredients,
                "imageUrl"
        );
        repo.save(recipe);
        String requestBody = """
                {
                    "name": "Test Recipe Updated",
                    "description": "Test Description Updated",
                    "instructions": "Test Instructions Updated",
                    "author": "Test Author Updated",
                    "origin": "Test Origin Updated",
                    "type": ["VEGAN", "GLUTEN_FREE"],
                    "preparationTime": {"hours": 0, "minutes": 35},
                    "totalTime": {"hours": 2, "minutes": 40},
                    "category": ["BREAKFAST", "SIDE_DISH"],
                    "difficulty": "HARD",
                    "ingredients": [
                                        {
                                            "name": "name test 5",
                                            "quantity": "quantity 20"
                                        },
                                        {
                                            "name": "name test 6",
                                            "quantity": "quantity 30"
                                        }
                                    ],
                    "imageUrl": "imageUrl"
                }
                """;
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.put("/api/recipes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                "id": "1",
                                "name": "Test Recipe Updated",
                                "description": "Test Description Updated",
                                "instructions": "Test Instructions Updated",
                                "author": "Test Author Updated",
                                "origin": "Test Origin Updated",
                                "type": ["Vegan", "Gluten Free"],
                                "preparationTime": {"hours": 0, "minutes": 35},
                                "totalTime": {"hours": 2, "minutes": 40},
                                "category": ["Breakfast", "Side Dish"],
                                "difficulty": "Hard",
                                "ingredients": [
                                                    {
                                                        "name": "name test 5",
                                                        "quantity": "quantity 20"
                                                    },
                                                    {
                                                        "name": "name test 6",
                                                        "quantity": "quantity 30"
                                                    }
                                                        
                                                ],
                                "imageUrl": "imageUrl"
                        }
                                                
                                             """))
                .andReturn();

    }

    @Test
    void deleteById_returnsString_whenRecipeSuccessfullyDeleted() throws Exception {
        //GIVEN
        String id = "1";
        PreparationTime preparationTime = new PreparationTime(0, 30);
        TotalTime totalTime = new TotalTime(1, 15);
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        recipeIngredients.add(new RecipeIngredients("name test", "quantity 1"));
        recipeIngredients.add(new RecipeIngredients("name test 2", "quantity 2"));
        Recipe recipe = new Recipe(id,
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
                recipeIngredients,
                "imageUrl"
        );
        repo.save(recipe);
        String message = "Recipe with ID: 1 has been deleted successfully.";
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/recipes/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(message));
    }
}