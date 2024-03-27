package de.neuefische.backend.service;

import de.neuefische.backend.model.openai.ChatGptRequest;
import de.neuefische.backend.model.openai.ChatGptResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenAiService {
    private final RestClient restClient;

    public OpenAiService(
            @Value("${open.ai.url}") String apiUrl,
            @Value("${open.ai.api.key}") String apiKey) {

        restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", apiKey)
                .build();
    }

    public String askQuestion(String q) {
        ChatGptRequest request = new ChatGptRequest(q);
        ChatGptResponse response = restClient.post()
                .body(request)
                .retrieve()
                .body(ChatGptResponse.class);
        assert response != null;
        return response.getAnswer();
    }

}
