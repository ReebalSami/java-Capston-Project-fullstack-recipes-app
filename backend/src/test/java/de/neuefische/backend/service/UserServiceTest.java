package de.neuefische.backend.service;

import de.neuefische.backend.model.user.User;
import de.neuefische.backend.model.user.UserDto;
import de.neuefische.backend.repository.UsersRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class UserServiceTest {
    private final UsersRepo repo = mock(UsersRepo.class);
    private final UserService service = new UserService(repo);

    @Test
    void getAllUsers_shouldReturnEmptyList_WhenCalledInitially() {
        //GIVEN
        List<User> expected = List.of();
        List<User> expectedUsers = List.of();
        when(repo.findAll()).thenReturn(expectedUsers);
        //WHEN
        List<User> actual = service.getAllUsers();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void getUserById_returnUserWithId1_whenCalledWithId1(){
        //GIVEN
        User expected =new User(
                "1",
                "reebo",
                "reebal",
                "sami",
                "image",
                false);
        when(repo.findById("1")).thenReturn(Optional.of(expected));
        //WHEN
        Optional<User> actual = service.getUserById("1");
        //THEN
        assertEquals(Optional.of(expected), actual);
        verify(repo).findById("1");
    }

    @Test
    void getAllUsers() {
        //GIVEN
        when(repo.findAll()).thenReturn(List.of(
                new User(
                        "1",
                        "reebo",
                        "reebal",
                        "sami",
                        "image",
                        false),
                new User(
                        "2",
                        "reebo",
                        "reebal",
                        "sami",
                        "image",
                        false)
        ));
        //WHEN
        List<User> actual = service.getAllUsers();
        //THEN
        assertEquals(List.of(
                new User(
                        "1",
                        "reebo",
                        "reebal",
                        "sami",
                        "image",
                        false),
                new User(
                        "2",
                        "reebo",
                        "reebal",
                        "sami",
                        "image",
                        false)
        ), actual);
    }

    @Test
    void createUser() {
        OAuth2User oAuth2User = mock(OAuth2User.class);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "123");
        attributes.put("avatar_url", "link222");
        when(oAuth2User.getAttributes()).thenReturn(attributes);
        //GIVEN
        UserDto user = new UserDto(
                "reebo",
                "reebal",
                "sami");
        when(repo.save(any(User.class)))
                .thenReturn(new User(
                        "123",
                        user.getUsername(),
                        user.getFirstName(),
                        user.getLastName(),
                        "link222",
                        false));
        //WHEN
        User actual = service.createUser(oAuth2User, user);
        //THEN
        assertEquals(new User(
                "123",
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                "link222",
                false), actual);

    }

    @Test
    void editUser() {
        OAuth2User oAuth2User = mock(OAuth2User.class);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "123");
        attributes.put("avatar_url", "link222");
        when(oAuth2User.getAttributes()).thenReturn(attributes);
        //GIVEN
        UserDto user = new UserDto(
                "reebo",
                "reebal",
                "sami");
        when(repo.findById("123"))
                .thenReturn(Optional.of(new User(
                        "123",
                        "reebo",
                        "reebal",
                        "sami",
                        "link222",
                        false)));
        when(repo.save(any(User.class)))
                .thenReturn(new User(
                        "123",
                        user.getUsername(),
                        user.getFirstName(),
                        user.getLastName(),
                        "link222",
                        false));
        //WHEN
        User actual = service.editUser(oAuth2User, user);
        //THEN
        assertEquals(new User(
                "123",
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                "link222",
                false), actual);
    }
}