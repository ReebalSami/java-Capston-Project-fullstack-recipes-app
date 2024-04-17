package de.neuefische.backend.model.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

import static de.neuefische.backend.service.AttributeUtils.getStringAttribute;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String imagePath;
    private boolean newUser;

    public User(Map<String, Object> attributes) {
        this.id = getStringAttribute(attributes, "id");
        this.username = "";
        this.firstName = "";
        this.lastName = "";
        this.imagePath = getStringAttribute(attributes, "avatar_url");
        this.newUser = true;
    }
}