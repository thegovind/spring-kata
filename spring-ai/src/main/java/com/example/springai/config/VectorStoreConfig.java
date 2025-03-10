package com.example.springai.config;

import javax.sql.DataSource;

import org.springframework.ai.vectorstore.PgVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Vector Store Configuration
 * 
 * This class configures the PostgreSQL vector store for storing and retrieving
 * document embeddings. It uses the pgvector extension for efficient vector similarity search.
 */
@Configuration
public class VectorStoreConfig {
    
    /**
     * Configure the PostgreSQL vector store
     * 
     * @param dataSource The database data source
     * @return The configured vector store
     */
    @Bean
    public VectorStore vectorStore(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        
        return new PgVectorStore(jdbcTemplate, 
                PgVectorStore.PgVectorStoreConfig.builder()
                    .withTableName("documents")
                    .withContentField("content")
                    .withEmbeddingField("embedding")
                    .withIdField("id")
                    .withMetadataField("metadata")
                    .build());
    }
}
