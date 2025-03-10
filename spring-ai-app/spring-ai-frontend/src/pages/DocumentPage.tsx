import { DocumentManager } from '../components/DocumentManager';

/**
 * Document Page Component
 * 
 * This page allows users to interact with the Document service.
 */
export function DocumentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Manager</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add documents to the vector store and search for semantically similar content
          using embeddings.
        </p>
      </div>
      
      <DocumentManager />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">About Vector Storage</h2>
        <p className="text-muted-foreground mb-4">
          This application uses PostgreSQL with the pgvector extension to store document
          embeddings. Embeddings are high-dimensional vector representations of text that
          capture semantic meaning.
        </p>
        <p className="text-muted-foreground">
          When you search for documents, the system converts your query to an embedding and
          finds documents with similar embeddings using vector similarity search.
        </p>
      </div>
    </div>
  );
}
