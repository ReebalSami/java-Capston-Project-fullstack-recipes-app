export type Recipe = {
    id?: string;
    name: string;
    description: string;
    instructions: string;
    author: string;
    origin: string;
    type: TypeList;
    preparationTime: PreparationTime;
    totalTime: TotalTime;
    category: CategoryList;
    difficulty: string;
    ingredients: RecipeIngredients[];

}
export type RecipeTime = PreparationTime | TotalTime;
export type RecipeFormPrimitiveInputType = "string" | "array" | "number";
export type RecipeFormPrimitiveInputValue = string | CategoryList | TypeList;
export type CategoryList = string[];
export type TypeList = string[];

export type PreparationTime = {
    hours: number;
    minutes: number;
}

export type TotalTime = {
    hours: number;
    minutes: number;
}


export enum RecipeDifficulty {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard"
}
export type RecipeIngredients = {
    name: string;
    quantity: string;
}

export enum RecipeCategory {
    BREAKFAST = "Breakfast",
    LUNCH = "Lunch",
    DINNER = "Dinner",
    DESSERT = "Dessert",
    SNACK = "Snack",
    DRINK = "Drink",
    APPETIZER = "Appetizer",
    SALAD = "Salad",
    SOUP = "Soup",
    SIDE_DISH = "Side Dish",
    MAIN_DISH = "Main Dish",
    BAKING = "Baking",
    OTHER = "Other"
}
export enum RecipeType {
    VEGAN = "Vegan",
    VEGETARIAN = "Vegetarian",
    WITH_MEAT = "With Meat",
    PESCATARIAN = "Pescatarian",
    GLUTEN_FREE = "Gluten Free",
    LACTOSE_FREE = "Lactose Free",
    OTHER = "Other"
}