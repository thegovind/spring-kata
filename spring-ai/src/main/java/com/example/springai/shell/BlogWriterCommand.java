package com.example.springai.shell;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import com.example.springai.service.BlogWriterService;

/**
 * Blog Writer Commands
 * 
 * This class provides shell commands for interacting with the Blog Writer service.
 * It allows users to generate blog posts on specified topics using the
 * Writer-Evaluator Agent pattern.
 */
@ShellComponent
public class BlogWriterCommand {
    private static final Logger logger = LoggerFactory.getLogger(BlogWriterCommand.class);
    
    @Autowired
    private BlogWriterService blogWriterService;
    
    /**
     * Generate a blog post on a specified topic
     * 
     * @param topic The blog topic
     * @return The generated blog post
     */
    @ShellMethod(key = "write", value = "Generate a blog post using Writer-Evaluator Agent")
    public String writeBlogPost(@ShellOption(help = "Blog topic") String topic) {
        logger.info("Generating blog post on topic: {}", topic);
        String blogPost = blogWriterService.generateBlogPost(topic);
        logger.info("Blog post generated with {} characters", blogPost.length());
        return blogPost;
    }
    
    /**
     * Show information about the Writer-Evaluator Agent
     * 
     * @return Information about the Writer-Evaluator Agent
     */
    @ShellMethod(key = "writer-info", value = "Show information about the Writer-Evaluator Agent")
    public String writerInfo() {
        return """
            The Writer-Evaluator Agent demonstrates:
            
            1. Content Generation: AI creates initial content
            2. Self-Evaluation: AI evaluates content quality
            3. Feedback-Driven Refinement: AI improves content based on feedback
            4. Iterative Improvement: Process repeats until quality criteria are met
            
            This pattern is useful for:
            - Creating high-quality content
            - Implementing self-improving AI systems
            - Building autonomous content creation workflows
            
            Try it out with the 'write' command!
            """;
    }
}
