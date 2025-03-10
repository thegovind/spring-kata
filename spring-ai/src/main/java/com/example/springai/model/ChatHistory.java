package com.example.springai.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a chat interaction history entry.
 * 
 * This model stores user prompts and AI responses for future reference
 * and to provide context for RAG (Retrieval Augmented Generation).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistory {
    private Long id;
    private String sessionId;
    private String prompt;
    private String response;
    private LocalDateTime createdAt;
}
