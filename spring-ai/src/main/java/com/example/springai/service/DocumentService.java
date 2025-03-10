package com.example.springai.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Document Service
 * 
 * This service manages documents in the vector store:
 * 1. Add documents with metadata
 * 2. Delete documents
 * 3. Search for similar documents
 * 
 * This service is used by the RAG service to store and retrieve
 * documents for context enhancement.
 */
@Service
public class DocumentService {
    private static final Logger logger = LoggerFactory.getLogger(DocumentService.class);
    
    @Autowired
    private VectorStore vectorStore;
    
    /**
     * Add a document to the vector store
     * 
     * @param content The document content
     * @param metadata Additional metadata for the document
     * @return The document ID
     */
    public String addDocument(String content, Map<String, Object> metadata) {
        try {
            logger.debug("Adding document with {} characters and metadata: {}", content.length(), metadata);
            Document document = new Document(content, metadata);
            List<String> ids = vectorStore.add(List.of(document));
            logger.debug("Document added with ID: {}", ids.get(0));
            return ids.get(0);
        } catch (Exception e) {
            logger.error("Error adding document", e);
            throw new RuntimeException("Failed to add document to vector store", e);
        }
    }
    
    /**
     * Delete a document from the vector store
     * 
     * @param id The document ID
     */
    public void deleteDocument(String id) {
        try {
            logger.debug("Deleting document with ID: {}", id);
            vectorStore.delete(List.of(id));
            logger.debug("Document deleted successfully");
        } catch (Exception e) {
            logger.error("Error deleting document with ID: {}", id, e);
            throw new RuntimeException("Failed to delete document from vector store", e);
        }
    }
    
    /**
     * Search for similar documents
     * 
     * @param query The search query
     * @param topK The number of results to return
     * @param threshold The similarity threshold
     * @return A list of similar documents
     */
    public List<Document> searchSimilarDocuments(String query, int topK, double threshold) {
        try {
            logger.debug("Searching for documents similar to: {}", query);
            List<Document> results = vectorStore.similaritySearch(
                org.springframework.ai.vectorstore.SearchRequest.builder()
                    .query(query)
                    .topK(topK)
                    .similarityThreshold(threshold)
                    .build()
            );
            logger.debug("Found {} similar documents", results.size());
            return results;
        } catch (Exception e) {
            logger.error("Error searching for similar documents", e);
            throw new RuntimeException("Failed to search for similar documents", e);
        }
    }
}
