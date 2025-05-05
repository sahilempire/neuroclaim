
import React, { useState } from 'react';
import LegalNav from '@/components/LegalNav';
import AIInputBox from '@/components/AIInputBox';
import AIParticles from '@/components/AIParticles';
import LegalServiceCard from '@/components/LegalServiceCard';
import AIResponse from '@/components/AIResponse';
import { FileLock, FileText, Gavel, Info } from 'lucide-react';
import legalAI, { AIAnalysisResult } from '@/services/legalAI';

const Index = () => {
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

  const services = [
    {
      title: "Patent Protection",
      description: "Secure your innovations and intellectual property with comprehensive patent services.",
      icon: FileLock,
      url: "/patents"
    },
    {
      title: "Trademark Registration",
      description: "Protect your brand identity with our streamlined trademark registration process.",
      icon: FileLock,
      url: "/trademarks"
    },
    {
      title: "Legal Document Drafting",
      description: "Professional preparation of contracts, agreements, and legal documents.",
      icon: FileText,
      url: "/legal-drafting"
    },
    {
      title: "Compliance Solutions",
      description: "Stay compliant with industry regulations and legal requirements.",
      icon: Gavel,
      url: "/compliance"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-legal-navy">
      <div className="relative overflow-hidden">
        <AIParticles />
        <LegalNav className="container z-10 relative" />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
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
      
      {/* Services Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-legal-navy to-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our <span className="text-legal-teal">Legal Services</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <LegalServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              url={service.url}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
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

export default Index;
