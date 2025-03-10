package com.example.springai.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springai.service.DocumentService;

/**
 * Document Controller
 * 
 * This controller provides REST endpoints for managing documents in the vector store.
 * It allows clients to add, delete, and search for documents.
 */
@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);
    
    @Autowired
    private DocumentService documentService;
    
    /**
     * Add a document to the vector store
     * 
     * @param request The document request
     * @return The document ID
     */
    @PostMapping
    public ResponseEntity<DocumentResponse> addDocument(@RequestBody DocumentRequest request) {
        logger.info("Received request to add document with {} characters", request.getContent().length());
        
        String id = documentService.addDocument(request.getContent(), request.getMetadata());
        
        logger.info("Document added with ID: {}", id);
        return ResponseEntity.ok(new DocumentResponse(id));
    }
    
    /**
     * Delete a document from the vector store
     * 
     * @param id The document ID
     * @return Success response
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String id) {
        logger.info("Received request to delete document with ID: {}", id);
        
        documentService.deleteDocument(id);
        
        logger.info("Document deleted successfully");
        return ResponseEntity.ok().build();
    }
    
    /**
     * Search for similar documents
     * 
     * @param query The search query
     * @param topK The number of results to return
     * @param threshold The similarity threshold
     * @return A list of similar documents
     */
    @PostMapping("/search")
    public ResponseEntity<SearchResponse> searchDocuments(
            @RequestBody SearchRequest request,
            @RequestParam(defaultValue = "3") int topK,
            @RequestParam(defaultValue = "0.7") double threshold) {
        
        logger.info("Received search request: {}", request.getQuery());
        
        List<Document> documents = documentService.searchSimilarDocuments(
                request.getQuery(), topK, threshold);
        
        logger.info("Found {} similar documents", documents.size());
        
        SearchResponse response = new SearchResponse();
        response.setResults(documents.stream()
                .map(doc -> new DocumentResult(doc.getId(), doc.getText(), doc.getMetadata()))
                .toList());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Document request model
     */
    public static class DocumentRequest {
        private String content;
        private Map<String, Object> metadata;
        
        public DocumentRequest() {}
        
        public String getContent() {
            return content;
        }
        
        public void setContent(String content) {
            this.content = content;
        }
        
        public Map<String, Object> getMetadata() {
            return metadata;
        }
        
        public void setMetadata(Map<String, Object> metadata) {
            this.metadata = metadata;
        }
    }
    
    /**
     * Document response model
     */
    public static class DocumentResponse {
        private String id;
        
        public DocumentResponse() {}
        
        public DocumentResponse(String id) {
            this.id = id;
        }
        
        public String getId() {
            return id;
        }
        
        public void setId(String id) {
            this.id = id;
        }
    }
    
    /**
     * Search request model
     */
    public static class SearchRequest {
        private String query;
        
        public SearchRequest() {}
        
        public String getQuery() {
            return query;
        }
        
        public void setQuery(String query) {
            this.query = query;
        }
    }
    
    /**
     * Search response model
     */
    public static class SearchResponse {
        private List<DocumentResult> results;
        
        public SearchResponse() {}
        
        public List<DocumentResult> getResults() {
            return results;
        }
        
        public void setResults(List<DocumentResult> results) {
            this.results = results;
        }
    }
    
    /**
     * Document result model
     */
    public static class DocumentResult {
        private String id;
        private String content;
        private Map<String, Object> metadata;
        
        public DocumentResult() {}
        
        public DocumentResult(String id, String content, Map<String, Object> metadata) {
            this.id = id;
            this.content = content;
            this.metadata = metadata;
        }
        
        public String getId() {
            return id;
        }
        
        public void setId(String id) {
            this.id = id;
        }
        
        public String getContent() {
            return content;
        }
        
        public void setContent(String content) {
            this.content = content;
        }
        
        public Map<String, Object> getMetadata() {
            return metadata;
        }
        
        public void setMetadata(Map<String, Object> metadata) {
            this.metadata = metadata;
        }
    }
}
