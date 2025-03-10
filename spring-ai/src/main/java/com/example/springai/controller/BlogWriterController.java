package com.example.springai.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springai.service.BlogWriterService;

/**
 * Blog Writer Controller
 * 
 * This controller provides REST endpoints for interacting with the Blog Writer service.
 * It allows clients to generate blog posts on specified topics using the
 * Writer-Evaluator Agent pattern.
 */
@RestController
@RequestMapping("/api/blog")
public class BlogWriterController {
    private static final Logger logger = LoggerFactory.getLogger(BlogWriterController.class);
    
    @Autowired
    private BlogWriterService blogWriterService;
    
    /**
     * Generate a blog post on a specified topic
     * 
     * @param request The blog generation request
     * @return The generated blog post
     */
    @PostMapping("/generate")
    public ResponseEntity<BlogResponse> generateBlog(@RequestBody BlogRequest request) {
        logger.info("Received blog generation request for topic: {}", request.getTopic());
        
        String blogContent = blogWriterService.generateBlogPost(request.getTopic());
        
        logger.info("Blog post generated with {} characters", blogContent.length());
        return ResponseEntity.ok(new BlogResponse(blogContent));
    }
    
    /**
     * Blog generation request model
     */
    public static class BlogRequest {
        private String topic;
        
        public BlogRequest() {}
        
        public BlogRequest(String topic) {
            this.topic = topic;
        }
        
        public String getTopic() {
            return topic;
        }
        
        public void setTopic(String topic) {
            this.topic = topic;
        }
    }
    
    /**
     * Blog generation response model
     */
    public static class BlogResponse {
        private String content;
        
        public BlogResponse() {}
        
        public BlogResponse(String content) {
            this.content = content;
        }
        
        public String getContent() {
            return content;
        }
        
        public void setContent(String content) {
            this.content = content;
        }
    }
}
