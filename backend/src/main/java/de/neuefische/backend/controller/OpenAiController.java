package de.neuefische.backend.controller;

import de.neuefische.backend.model.recipe.RecipeCategory;
import de.neuefische.backend.model.recipe.RecipeDifficulty;
import de.neuefische.backend.model.recipe.RecipeType;
import de.neuefische.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class OpenAiController {
    private final OpenAiService service;


    @GetMapping
    public String askQuestion(@RequestParam String ingredients) {
        String types = Arrays.stream(RecipeType.values())
                .map(Enum::name)
                .collect(Collectors.joining(", ", "'", "'"));
        String categories = Arrays.stream(RecipeCategory.values())
                .map(Enum::name)
                .collect(Collectors.joining(", ", "'", "'"));
        String difficulty = Arrays.stream(RecipeDifficulty.values())
                .map(Enum::name)
                .collect(Collectors.joining(", ", "'", "'"));

        String q = "give me a list of 2 recipes as json format only with these ingredients: " + ingredients + "The json should include the following attribute: name, description, instructions, author, origin, type, preparationTime, totalTime, category, difficulty and ingredients. " +
                "categories should include one or more of the following for each Recipe: " + categories + ". " +
                "types should include one or more of the following for each Recipe: " + types + ". " +
                "difficulty should include one of the following for each Recipe: " + difficulty + ". " +
                "PreparationTime and TotalTime should be in the format of {hours: 0, minutes: 0}. " +
                "Ingredients should include the following attributes: name: Fettuccine, quantity: 300g." +
                "Description should not be longer than 30 words." +
                "Instructions should not be longer than 50 words.";
        return service.askQuestion(q);
    }

}
