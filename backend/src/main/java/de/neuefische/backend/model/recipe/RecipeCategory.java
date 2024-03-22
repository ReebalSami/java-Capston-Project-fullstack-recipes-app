package de.neuefische.backend.model.recipe;

public enum RecipeCategory {
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    DINNER("Dinner"),
    DESSERT("Dessert"),
    SNACK("Snack"),
    DRINK("Drink"),
    APPETIZER("Appetizer"),
    SALAD("Salad"),
    SOUP("Soup"),
    SIDE_DISH("Side Dish"),
    MAIN_DISH("Main Dish"),
    BAKING("Baking"),
    OTHER("Other");
    private final String category;
    RecipeCategory(String category) {
        this.category = category;
    }
    public String getNormalCategory() {
        return category;
    }
}
