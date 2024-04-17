package de.neuefische.backend.service;


import de.neuefische.backend.model.user.User;
import de.neuefische.backend.model.user.UserDto;
import de.neuefische.backend.repository.UsersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepo usersRepo;

    public Optional<User> getUserById(String id){
        return usersRepo.findById(id);
    }

    public List<User> getAllUsers(){
        return usersRepo.findAll();
    }

    public User createUser(OAuth2User user, UserDto newUserDto){
        User createdUser = new User(
                user.getAttributes().get("id").toString(),
                newUserDto.getUsername(),
                newUserDto.getFirstName(),
                newUserDto.getLastName(),
                user.getAttributes().get("avatar_url").toString(),
                false);
        return usersRepo.save(createdUser);
    }
    public User editUser(OAuth2User user, UserDto userDto) {
        User currentUser = getUserById(user.getAttributes().get("id").toString()).orElseThrow();
        currentUser.setUsername(userDto.getUsername());
        currentUser.setFirstName(userDto.getFirstName());
        currentUser.setLastName(userDto.getLastName());
        return usersRepo.save(currentUser);
    }

}

