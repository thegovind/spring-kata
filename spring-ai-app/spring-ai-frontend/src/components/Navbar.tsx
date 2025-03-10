import { Home, BookOpen, Database, BrainCircuit } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from './ui/link';

/**
 * Navbar Component
 * 
 * This component provides navigation for the Spring AI application with BNY Mellon theme.
 */
export function Navbar() {
  return (
    <header className="bg-[#003865] text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="https://logos-download.com/wp-content/uploads/2016/09/BNY_Mellon_logo_Bank_of_New_York.png" 
              alt="BNY Mellon Logo" 
              className="h-8" 
            />
            <span className="text-xl font-bold ml-2">Spring AI</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="link" asChild className="text-white hover:text-[#00a94f]">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-white hover:text-[#00a94f]">
                  <Link href="/rag">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    RAG
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-white hover:text-[#00a94f]">
                  <Link href="/blog-writer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Blog Writer
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-white hover:text-[#00a94f]">
                  <Link href="/documents">
                    <Database className="mr-2 h-4 w-4" />
                    Documents
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
