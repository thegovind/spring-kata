import { BlogWriterForm } from '../components/BlogWriterForm';

/**
 * Blog Writer Page Component
 * 
 * This page allows users to interact with the Blog Writer service.
 */
export function BlogWriterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Writer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate blog posts on any topic using an AI agent that evaluates and refines
          its own content for quality.
        </p>
      </div>
      
      <BlogWriterForm />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">About Blog Writer</h2>
        <p className="text-muted-foreground mb-4">
          The Blog Writer service uses a Writer-Evaluator Agent pattern to generate high-quality
          content. The agent first generates content, then evaluates it for quality, and finally
          refines it based on the evaluation.
        </p>
        <p className="text-muted-foreground">
          This approach demonstrates how AI agents can work together to produce better results
          through iterative improvement.
        </p>
      </div>
    </div>
  );
}
