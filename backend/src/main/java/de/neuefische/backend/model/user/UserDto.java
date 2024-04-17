package de.neuefische.backend.model.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String firstName;
    private String lastName;

}