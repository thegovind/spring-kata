package com.example.springai.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springai.service.RagService;

/**
 * RAG Controller
 * 
 * This controller provides REST endpoints for interacting with the RAG service.
 * It allows clients to ask questions and get responses enhanced with context
 * from previous interactions.
 */
@RestController
@RequestMapping("/api/rag")
public class RagController {
    private static final Logger logger = LoggerFactory.getLogger(RagController.class);
    
    @Autowired
    private RagService ragService;
    
    /**
     * Process a query using RAG
     * 
     * @param request The query request
     * @return The AI response enhanced with context
     */
    @PostMapping("/query")
    public ResponseEntity<QueryResponse> processQuery(@RequestBody QueryRequest request) {
        logger.info("Received query request: {}", request.getQuery());
        
        String response = ragService.processQuery(request.getQuery());
        
        logger.info("Returning response of {} characters", response.length());
        return ResponseEntity.ok(new QueryResponse(response));
    }
    
    /**
     * Query request model
     */
    public static class QueryRequest {
        private String query;
        
        public QueryRequest() {}
        
        public QueryRequest(String query) {
            this.query = query;
        }
        
        public String getQuery() {
            return query;
        }
        
        public void setQuery(String query) {
            this.query = query;
        }
    }
    
    /**
     * Query response model
     */
    public static class QueryResponse {
        private String response;
        
        public QueryResponse() {}
        
        public QueryResponse(String response) {
            this.response = response;
        }
        
        public String getResponse() {
            return response;
        }
        
        public void setResponse(String response) {
            this.response = response;
        }
    }
}
