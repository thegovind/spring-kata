/**
 * API service for interacting with the Spring AI backend
 */

// Use environment variable or default to localhost
const API_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8080';

/**
 * Process a query using RAG
 * @param query The user's query
 * @returns The AI response
 */
export const processRagQuery = async (query: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/rag/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error processing RAG query:', error);
    throw error;
  }
};

/**
 * Generate a blog post
 * @param topic The blog topic
 * @returns The generated blog content
 */
export const generateBlogPost = async (topic: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/blog/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
};

/**
 * Add a document to the vector store
 * @param content The document content
 * @param metadata Optional metadata
 * @returns The document ID
 */
export const addDocument = async (
  content: string,
  metadata?: Record<string, any>
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, metadata }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

/**
 * Search for similar documents
 * @param query The search query
 * @param topK Number of results to return
 * @param threshold Similarity threshold
 * @returns Array of document results
 */
export const searchDocuments = async (
  query: string,
  topK: number = 3,
  threshold: number = 0.7
): Promise<any[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/documents/search?topK=${topK}&threshold=${threshold}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};
