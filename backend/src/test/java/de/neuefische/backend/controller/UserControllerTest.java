package de.neuefische.backend.controller;

import de.neuefische.backend.model.user.User;
import de.neuefische.backend.repository.RecipesRepo;
import de.neuefische.backend.repository.UsersRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private RecipesRepo recipesRepo;
    @Test
    void getMe() throws Exception {
        //GIVEN
        User user= new User(
                "1",
                "reebo",
                "Reebal",
                "Sami",
                "image",
                false);
        usersRepo.save(user);
        //WHEN & THEN
        mvc.perform(get("/api/user")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("username", "reebo")
                                .claim("firstName", "Reebal")
                                .claim("lastName", "Sami")
                                .claim("avatar_url", "image"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image",
                            "newUser": false
                        }
                """));
    }

    @Test
    void getAllUsers() throws Exception{
        //GIVEN
        User user1= new User(
                "1",
                "reebo",
                "Reebal",
                "Sami",
                "image",
                false);
        User user2= new User(
                "2",
                "reebo",
                "Reebal",
                "Sami",
                "image",
                false);
        usersRepo.save(user1);
        usersRepo.save(user2);
        //WHEN & THEN
        mvc.perform(get("/api/user/all")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("username", "reebo")
                                .claim("firstName", "Reebal")
                                .claim("lastName", "Sami")
                                .claim("avatar_url", "image"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "1",
                                "username": "reebo",
                                "firstName": "Reebal",
                                "lastName": "Sami",
                                "imagePath": "image",
                                "newUser": false
                            },
                            {
                                "id": "2",
                                "username": "reebo",
                                "firstName": "Reebal",
                                "lastName": "Sami",
                                "imagePath": "image",
                                "newUser": false
                            }
                        ]
                """));
    }

    @Test
    void getUserById() throws Exception {
        // GIVEN
        User user= new User(
                "1",
                "reebo",
                "Reebal",
                "Sami",
                "image",
                false);
        usersRepo.save(user);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/user/1")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("username", "reebo")
                                .claim("firstName", "Reebal")
                                .claim("lastName", "Sami")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image",
                            "newUser": false
                        }
                """));
    }


    @Test
    void editUser() throws Exception {
        // GIVEN
        User user= new User(
                "1",
                "reebo",
                "Reebal",
                "Sami",
                "image",
                false);
        usersRepo.save(user);
        String requestBody = """
                        {
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image"
                        }
                """;

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/user/edit")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("username", "reebo")
                                .claim("firstName", "Reebal")
                                .claim("lastName", "Sami")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image",
                            "newUser": false
                        }
                """));
    }

    @Test
    void createUser() throws Exception {
        // GIVEN
        String requestBody = """
                        {
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image"
                        }
                """;

        // WHEN & THEN
        mvc.perform(post("/api/user/create")
                        .with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("username", "reebo")
                                .claim("firstName", "Reebal")
                                .claim("lastName", "Sami")
                                .claim("avatar_url", "image")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "reebo",
                            "firstName": "Reebal",
                            "lastName": "Sami",
                            "imagePath": "image",
                            "newUser": false
                        }
                """));
    }
}