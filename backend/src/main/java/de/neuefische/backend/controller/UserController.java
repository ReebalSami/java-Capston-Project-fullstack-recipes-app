package de.neuefische.backend.controller;


import de.neuefische.backend.model.user.User;
import de.neuefische.backend.model.user.UserDto;
import de.neuefische.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public User getMe(@AuthenticationPrincipal OAuth2User user){
        if (user == null) {
            return null;
        }
        return userService.getUserById(user.getAttributes().get("id").toString()).orElse(new User(user.getAttributes()));
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }

    @PostMapping("/edit")
    public User editUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto userDto){
        return userService.editUser(user, userDto);
    }

    @PostMapping("/create")
    public User createUser(@AuthenticationPrincipal OAuth2User user, @RequestBody UserDto newUserDto){
        return userService.createUser(user, newUserDto);
    }


}