import React, { useState } from 'react';
import { addDocument, searchDocuments } from '../services/api';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Loader2, Search, Plus } from 'lucide-react';

/**
 * Document Manager Component
 * 
 * This component allows users to add documents to the vector store and
 * search for similar documents.
 */
export function DocumentManager() {
  // Add Document State
  const [documentContent, setDocumentContent] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [addError, setAddError] = useState('');

  // Search Documents State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [topK, setTopK] = useState(3);

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentContent.trim()) return;
    
    setIsAddingDocument(true);
    setAddError('');
    
    try {
      const id = await addDocument(documentContent);
      setDocumentId(id);
      setDocumentContent('');
    } catch (err) {
      setAddError('Failed to add document. Please try again.');
      console.error(err);
    } finally {
      setIsAddingDocument(false);
    }
  };

  const handleSearchDocuments = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      const results = await searchDocuments(searchQuery, topK);
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to search documents. Please try again.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-[#f8f9fa]">
          <CardTitle className="text-[#003865]">Document Manager</CardTitle>
          <CardDescription>
            Add documents to the vector store and search for similar content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Add Document</TabsTrigger>
              <TabsTrigger value="search">Search Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add">
              <form onSubmit={handleAddDocument} className="space-y-4 pt-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="document-content" className="text-sm font-medium">
                    Document Content
                  </label>
                  <Textarea
                    id="document-content"
                    placeholder="Enter document content..."
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                {addError && <p className="text-red-500 text-sm">{addError}</p>}
                <Button 
                  type="submit" 
                  disabled={isAddingDocument || !documentContent.trim()}
                  className="bg-[#00a94f] hover:bg-[#008c41]"
                >
                  {isAddingDocument ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Document
                    </>
                  )}
                </Button>
                {documentId && (
                  <div className="mt-4 p-2 bg-green-50 text-green-700 rounded-md">
                    Document added successfully! ID: {documentId}
                  </div>
                )}
              </form>
            </TabsContent>
            
            <TabsContent value="search">
              <form onSubmit={handleSearchDocuments} className="space-y-4 pt-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="search-query" className="text-sm font-medium">
                    Search Query
                  </label>
                  <Input
                    id="search-query"
                    placeholder="Enter search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="top-k" className="text-sm font-medium">
                    Number of Results (Top K)
                  </label>
                  <Input
                    id="top-k"
                    type="number"
                    min="1"
                    max="10"
                    value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                  />
                </div>
                {searchError && <p className="text-red-500 text-sm">{searchError}</p>}
                <Button 
                  type="submit" 
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-[#00a94f] hover:bg-[#008c41]"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search Documents
                    </>
                  )}
                </Button>
              </form>
              
              {searchResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-[#003865]">Search Results:</h3>
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <div key={index} className="bg-[#f2f2f2] p-4 rounded-md border border-gray-200">
                        <p className="text-sm text-[#71717a] mb-1">
                          ID: {result.id}
                        </p>
                        <p className="whitespace-pre-wrap text-[#4b5563]">{result.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
