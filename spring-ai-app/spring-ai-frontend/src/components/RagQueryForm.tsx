import React, { useState } from 'react';
import { processRagQuery } from '../services/api';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';

/**
 * RAG Query Form Component
 * 
 * This component allows users to ask questions and get responses enhanced with
 * context from the RAG service.
 */
export function RagQueryForm() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await processRagQuery(query);
      setResponse(result);
    } catch (err) {
      setError('Failed to process your query. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-[#f8f9fa]">
          <CardTitle className="text-[#003865]">Ask a Question</CardTitle>
          <CardDescription>
            Get AI-powered answers enhanced with relevant context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <Textarea
                placeholder="Enter your question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-32"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button 
                type="submit" 
                disabled={isLoading || !query.trim()} 
                className="bg-[#00a94f] hover:bg-[#008c41]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Ask Question'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        {response && (
          <CardFooter className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-2 text-[#003865]">Response:</h3>
            <div className="bg-[#f2f2f2] p-4 rounded-md w-full whitespace-pre-wrap text-[#4b5563] border border-gray-200">
              {response}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
