package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.openai.ChatGptChoice;
import de.neuefische.backend.model.openai.ChatGptMessage;
import de.neuefische.backend.model.openai.ChatGptResponse;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class OpenAiControllerTest {
    private static MockWebServer mockWebServer;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper objectMapper;
    @BeforeAll
    static void setupMockWebServer() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }
    @AfterAll
    static void shutDownMockWebServer() throws IOException {
        mockWebServer.shutdown();
    }
    @DynamicPropertySource
    static void backendProps(DynamicPropertyRegistry registry) {
        registry.add("open.ai.url", () -> mockWebServer.url("/").toString());
    }

    @Test
    void askQuestion() throws Exception {
        //GIVEN
        ChatGptResponse response = new ChatGptResponse(List.of(new ChatGptChoice(new ChatGptMessage("This is a test!"))));
        String responseJson = objectMapper.writeValueAsString(response);
        System.out.println(responseJson);
        System.out.println(response);
        mockWebServer.enqueue(new MockResponse()
                .addHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .setBody(responseJson));

        mvc.perform(get("/api/chat?ingredients=potato+onion+garlic"))
                .andExpect(status().isOk())
                .andExpect(content().string("This is a test!"));
    }

}
