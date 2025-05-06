import React, { useState, useRef, useEffect } from 'react';
import AIInputBox from '@/components/AIInputBox';
import AIParticles from '@/components/AIParticles';
import AIResponse from '@/components/AIResponse';
import LegalBackgroundIcons from '@/components/LegalBackgroundIcons';
import legalAI, { AIAnalysisResult } from '@/services/legalAI';
import Aurora from '@/components/Aurora';
import GradientText from '@/components/GradientText';

const AppDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const responseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (aiResult && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [aiResult]);

  const handleSubmit = async (message: string) => {
    if (loading || cooldown) return;
    setLoading(true);
    console.log('Sending request to OpenAI...');
    const result = await legalAI.analyzeQuery(message);
    setAiResult(result);
    setLoading(false);
    // Only set cooldown if not a rate limit error
    if (!result.message.includes('You are making requests too quickly')) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000); // 5 seconds cooldown
    } else {
      console.warn('Received 429 rate limit error from OpenAI');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="relative overflow-hidden min-h-screen">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <AIParticles />
        <LegalBackgroundIcons />
        {/* Hero Section with AI Input */}
        <section className="container mx-auto px-4 pt-16 pb-10 md:pt-24 md:pb-16 relative z-10 flex flex-col items-center justify-center text-center flex-grow animate-fade-in">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            {/* Neural network icon centered above heading */}
            <div className="flex flex-col items-center justify-center mb-2">
              <svg className="w-14 h-14 text-legal-teal drop-shadow-lg animate-pulse mb-4" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5">
                <circle cx="16" cy="16" r="15" strokeOpacity="0.3" />
                <circle cx="16" cy="16" r="7" strokeOpacity="0.5" />
                <circle cx="16" cy="16" r="2.5" fill="#1de9b6" stroke="none" />
                <path d="M16 2v4M16 26v4M2 16h4M26 16h4M7.5 7.5l2.5 2.5M22 22l2.5 2.5M7.5 24.5l2.5-2.5M22 10l2.5-2.5" strokeOpacity="0.5" />
              </svg>
              <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-[0_4px_32px_rgba(64,178,168,0.5)] animate-gradient-wave flex flex-wrap justify-center items-center whitespace-nowrap">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                >
                  Neural
                </GradientText>
                <span className="text-white">Claim</span>
              </h1>
            </div>
            <div className="w-28 h-1 rounded-full bg-gradient-to-r from-[#315C59] via-[#40B2A8] to-[#315C59] mb-8 animate-pulse shadow-lg" />
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl animate-fade-in text-center">
              Unlock AI-Powered Legal Brilliance for Instantly Navigate <span className="text-[#40B2A8] font-semibold">Patents</span>, <span className="text-[#40B2A8] font-semibold">Trademarks</span>, <span className="text-[#40B2A8] font-semibold">Contracts</span>, and <span className="text-[#40B2A8] font-semibold">Compliance</span> with NeuralARC.
            </p>
            <AIInputBox 
              onSubmit={handleSubmit} 
              loading={loading}
              className="w-full max-w-2xl"
            />
            {/* AI Response Section */}
            {aiResult && (
              <div ref={responseRef} className="w-full mt-8 max-w-2xl animate-slide-up">
                <AIResponse 
                  message={aiResult.message}
                  suggestedServices={aiResult.suggestedServices}
                  externalLink={aiResult.externalLink}
                />
              </div>
            )}
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="mt-auto bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 NeuralClaim. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#40B2A8]">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#40B2A8]">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-[#40B2A8]">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppDashboard;
