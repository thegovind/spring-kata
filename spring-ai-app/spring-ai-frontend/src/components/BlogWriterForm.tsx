import React, { useState } from 'react';
import { generateBlogPost } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';

/**
 * Blog Writer Form Component
 * 
 * This component allows users to generate blog posts on specified topics
 * using the Writer-Evaluator Agent.
 */
export function BlogWriterForm() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await generateBlogPost(topic);
      setContent(result);
    } catch (err) {
      setError('Failed to generate blog post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-[#f8f9fa]">
          <CardTitle className="text-[#003865]">Generate Blog Post</CardTitle>
          <CardDescription>
            Create AI-generated blog posts with self-evaluation and refinement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">
                  Blog Topic
                </label>
                <Input
                  id="topic"
                  placeholder="Enter a topic for your blog post..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button 
                type="submit" 
                disabled={isLoading || !topic.trim()} 
                className="bg-[#00a94f] hover:bg-[#008c41]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Blog Post'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        {content && (
          <CardFooter className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-2 text-[#003865]">Generated Blog Post:</h3>
            <div className="bg-[#f2f2f2] p-4 rounded-md w-full whitespace-pre-wrap text-[#4b5563] border border-gray-200">
              {content}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
