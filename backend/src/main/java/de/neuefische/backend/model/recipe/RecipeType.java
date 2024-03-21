package de.neuefische.backend.model.recipe;

public enum RecipeType {
    VEGAN("Vegan"),
    VEGETARIAN("Vegetarian"),
    WITH_MEAT("With Meat"),
    PESCATARIAN("Pescatarian"),
    GLUTEN_FREE("Gluten Free"),
    LACTOSE_FREE("Lactose Free"),
    OTHER("Other");
    private final String type;
    RecipeType(String type) {
        this.type = type;
    }
    public String getNormalType() {
        return type;
    }
}
