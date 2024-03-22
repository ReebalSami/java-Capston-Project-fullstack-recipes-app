package de.neuefische.backend.model.recipe;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TotalTime {
    private int hours;
    private int minutes;
}
