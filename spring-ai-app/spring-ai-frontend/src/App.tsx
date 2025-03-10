import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { RagPage } from './pages/RagPage'
import { BlogWriterPage } from './pages/BlogWriterPage'
import { DocumentPage } from './pages/DocumentPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rag" element={<RagPage />} />
            <Route path="/blog-writer" element={<BlogWriterPage />} />
            <Route path="/documents" element={<DocumentPage />} />
          </Routes>
        </main>
        <footer className="bg-[#003865] py-4 text-center text-sm text-white">
          <div className="container mx-auto">
            <div className="flex justify-center items-center mb-2">
              <img 
                src="https://www.bnymellon.com/content/dam/bny-mellon/images/logos/bny-mellon-logo.svg" 
                alt="BNY Mellon Logo" 
                className="h-6 mr-2" 
              />
              <span>Spring AI Demo</span>
            </div>
            <p>&copy; {new Date().getFullYear()} BNY Mellon</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
