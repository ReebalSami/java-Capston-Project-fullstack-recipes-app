package de.neuefische.backend.model.recipe;

import de.neuefische.backend.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    private double ratingPoints;

    @DBRef
    private User user;
}
