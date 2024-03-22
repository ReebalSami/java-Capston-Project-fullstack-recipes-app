package de.neuefische.backend.model.recipe;

public enum RecipeDifficulty {
    EASY("Easy"),
    MEDIUM("Medium"),
    HARD("Hard");
    private final String difficulty;
    RecipeDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    public String getNormalDifficulty() {
        return difficulty;
    }
}
