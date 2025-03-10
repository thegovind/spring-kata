import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BrainCircuit, BookOpen, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from '../components/ui/link';

/**
 * Home Page Component
 * 
 * This component serves as the landing page for the Spring AI application.
 */
export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img 
            src="https://logos-download.com/wp-content/uploads/2016/09/BNY_Mellon_logo_Bank_of_New_York.png" 
            alt="BNY Mellon Logo" 
            className="h-12" 
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-[#003865]">Spring AI Demo</h1>
        <p className="text-xl text-[#71717a] max-w-3xl mx-auto">
          Explore AI capabilities with Spring AI, Azure OpenAI, and PostgreSQL vector storage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-center border-b border-gray-100 bg-[#f8f9fa]">
            <BrainCircuit className="w-12 h-12 mx-auto mb-2 text-[#0075c9]" />
            <CardTitle className="text-[#003865]">RAG Demo</CardTitle>
            <CardDescription>
              Retrieval Augmented Generation for enhanced AI responses
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-6">
            <p className="mb-6 text-[#4b5563]">
              Experience how RAG combines the power of retrieval-based and
              generative AI systems to provide more accurate and contextually
              relevant responses.
            </p>
            <Button asChild className="bg-[#00a94f] hover:bg-[#008c41]">
              <Link href="/rag">Try RAG Demo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-center border-b border-gray-100 bg-[#f8f9fa]">
            <BookOpen className="w-12 h-12 mx-auto mb-2 text-[#0075c9]" />
            <CardTitle className="text-[#003865]">Blog Writer</CardTitle>
            <CardDescription>
              AI-powered content generation with self-evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-6">
            <p className="mb-6 text-[#4b5563]">
              Generate blog posts on any topic using an AI agent that evaluates and refines
              its own content for quality through iterative improvement.
            </p>
            <Button asChild className="bg-[#00a94f] hover:bg-[#008c41]">
              <Link href="/blog-writer">Try Blog Writer</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-center border-b border-gray-100 bg-[#f8f9fa]">
            <Database className="w-12 h-12 mx-auto mb-2 text-[#0075c9]" />
            <CardTitle className="text-[#003865]">Document Manager</CardTitle>
            <CardDescription>
              Vector database for semantic search
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-6">
            <p className="mb-6 text-[#4b5563]">
              Add documents to the vector store and search for semantically similar content
              using embeddings for advanced information retrieval.
            </p>
            <Button asChild className="bg-[#00a94f] hover:bg-[#008c41]">
              <Link href="/documents">Try Document Manager</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          This application demonstrates the integration of Spring AI with Azure OpenAI and
          PostgreSQL vector storage. It showcases RAG (Retrieval Augmented Generation) and
          the Writer-Evaluator Agent pattern for enhanced AI capabilities.
        </p>
      </div>
    </div>
  );
}
