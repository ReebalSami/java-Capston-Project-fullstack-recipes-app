package de.neuefische.backend.model.openai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ChatGptRequest {
    private String model;
    private ResponseFormat response_format;
    private List<ChatGptMessage> messages;

    public ChatGptRequest(String q){
        this.model = "gpt-3.5-turbo";
        this.response_format = new ResponseFormat("json_object");
        this.messages = List.of(new ChatGptMessage(q));
    }
}
