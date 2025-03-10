package com.example.springai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring AI Application
 * 
 * This application demonstrates how to use Spring AI with Azure OpenAI and PostgreSQL
 * vector storage to build AI-powered applications.
 * 
 * Key features:
 * - RAG (Retrieval Augmented Generation) for enhanced AI responses
 * - Writer-Evaluator Agent for content generation with feedback
 * - Azure OpenAI integration for embeddings and chat completions
 * - PostgreSQL vector storage for efficient similarity search
 */
@SpringBootApplication
public class SpringAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringAiApplication.class, args);
    }
}
