
import React, { useState } from 'react';
import AIInputBox from '@/components/AIInputBox';
import AIParticles from '@/components/AIParticles';
import AIResponse from '@/components/AIResponse';
import legalAI, { AIAnalysisResult } from '@/services/legalAI';

const AppDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  const handleSubmit = (message: string) => {
    setLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const result = legalAI.analyzeQuery(message);
      setAiResult(result);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-legal-navy">
      <div className="relative overflow-hidden min-h-screen">
        <AIParticles />
        
        {/* App Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between z-10 relative">
          <h1 className="text-xl font-serif font-bold">
            <span className="text-legal-teal">Mindful</span>
            <span className="text-white">Legal</span>
          </h1>
          
          <button className="px-4 py-2 bg-legal-teal text-white rounded-md hover:bg-opacity-90 transition duration-200">
            Login
          </button>
        </header>
        
        {/* Hero Section with AI Input */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex-grow flex flex-col justify-center">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">AI-Powered</span> Legal Assistance
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
              Streamline your legal processes with intelligent guidance for patents, trademarks, legal documents, and compliance.
            </p>
            
            <AIInputBox 
              onSubmit={handleSubmit} 
              loading={loading}
              className="w-full max-w-2xl"
            />
            
            {/* AI Response Section */}
            {aiResult && (
              <div className="w-full mt-8 max-w-2xl animate-slide-up">
                <AIResponse 
                  message={aiResult.message}
                  suggestedServices={aiResult.suggestedServices}
                />
              </div>
            )}
          </div>
        </section>
      </div>
      
      {/* Services Quick Access Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-legal-navy to-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our <span className="text-legal-teal">Legal Services</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Patent Protection */}
          <div className="legal-card group flex flex-col items-center text-center opacity-0 animate-fade-in" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
              <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-white group-hover:text-legal-gold transition-colors">
              Patent Protection
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Secure your innovations and intellectual property with comprehensive patent services.
            </p>
            <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
              Learn More
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>

          {/* Trademark Registration */}
          <div className="legal-card group flex flex-col items-center text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
              <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-white group-hover:text-legal-gold transition-colors">
              Trademark Registration
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Protect your brand identity with our streamlined trademark registration process.
            </p>
            <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
              Learn More
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>

          {/* Legal Document Drafting */}
          <div className="legal-card group flex flex-col items-center text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
              <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-white group-hover:text-legal-gold transition-colors">
              Legal Document Drafting
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Professional preparation of contracts, agreements, and legal documents.
            </p>
            <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
              Learn More
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>

          {/* Compliance Solutions */}
          <div className="legal-card group flex flex-col items-center text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
              <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-white group-hover:text-legal-gold transition-colors">
              Compliance Solutions
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Stay compliant with industry regulations and legal requirements.
            </p>
            <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
              Learn More
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MindfulLegal AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-legal-teal">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-legal-teal">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-legal-teal">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppDashboard;
