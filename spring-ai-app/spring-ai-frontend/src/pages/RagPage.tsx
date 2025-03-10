import { RagQueryForm } from '../components/RagQueryForm';

/**
 * RAG Page Component
 * 
 * This page allows users to interact with the RAG service.
 */
export function RagPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">RAG Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ask questions and get AI responses enhanced with context from previous interactions
          and relevant documents.
        </p>
      </div>
      
      <RagQueryForm />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">About RAG</h2>
        <p className="text-muted-foreground mb-4">
          RAG (Retrieval Augmented Generation) enhances AI responses by retrieving relevant
          information from a knowledge base before generating an answer. This approach combines
          the benefits of retrieval-based and generative AI systems.
        </p>
        <p className="text-muted-foreground">
          The RAG service in this demo uses PostgreSQL with pgvector extension to store and
          retrieve document embeddings for efficient similarity search.
        </p>
      </div>
    </div>
  );
}
