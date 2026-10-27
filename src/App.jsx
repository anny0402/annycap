import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Templates from './pages/Templates';
import EditorDemo from './pages/EditorDemo';
import Faq from './pages/Faq';
import About from './pages/About';
import PremierePlugin from './pages/PremierePlugin';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#09090b] text-[#e4e4e7] flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor" element={<EditorDemo />} />
            <Route path="/premiere-pro-plugin" element={<PremierePlugin />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
