package com.example.springai.shell;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import com.example.springai.service.RagService;

/**
 * RAG Demo Commands
 * 
 * This class provides shell commands for interacting with the RAG service.
 * It allows users to ask questions and get responses enhanced with context
 * from previous interactions.
 */
@ShellComponent
public class RagDemoCommands {
    private static final Logger logger = LoggerFactory.getLogger(RagDemoCommands.class);
    
    @Autowired
    private RagService ragService;
    
    /**
     * Ask a question using RAG
     * 
     * @param question The question to ask
     * @return The AI response enhanced with context
     */
    @ShellMethod(key = "ask", value = "Ask a question using RAG (Retrieval Augmented Generation)")
    public String askQuestion(@ShellOption(help = "Your question") String question) {
        logger.info("Received question: {}", question);
        String response = ragService.processQuery(question);
        logger.info("Returning response of {} characters", response.length());
        return response;
    }
    
    /**
     * Show information about RAG
     * 
     * @return Information about RAG
     */
    @ShellMethod(key = "rag-info", value = "Show information about RAG (Retrieval Augmented Generation)")
    public String ragInfo() {
        return """
            RAG (Retrieval Augmented Generation) enhances AI responses by:
            
            1. Converting your question to a vector embedding
            2. Finding similar previous Q&As using vector similarity
            3. Using found Q&As as context for generating a response
            4. Saving the interaction for future reference
            
            This approach helps the AI:
            - Give more relevant answers
            - Learn from previous interactions
            - Maintain consistency across responses
            
            Try it out with the 'ask' command!
            """;
    }
}
