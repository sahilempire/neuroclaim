import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AIInputBox from '@/components/AIInputBox';
import AIResponse from '@/components/AIResponse';
import AuthModal from '@/components/AuthModal';
import legalAI, { AIAnalysisResult } from '@/services/legalAI';
import { useAuth } from '@/contexts/AuthContext';

const IndexLogo = ({ width = 220, height = 60 }: { width?: number; height?: number }) => (
  <img 
    src="/lawbit-logo.svg" 
    alt="LawBit Logo" 
    width={width} 
    height={height} 
    className="mx-auto mt-12 mb-10"
    style={{ maxWidth: '100%' }}
  />
);

const features = [
  {
    title: 'AI for Drafting',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.',
    link: 'https://lawbit.ai/contracts'
  },
  {
    title: 'AI for Compliance',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.',
    link: 'https://compli-ai-shield.vercel.app/assessment'
  },
  {
    title: 'AI for Trademark',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.',
    link: 'https://radar.neuralarc.ai/dashboard'
  }
];

const AppDashboard = () => {
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const responseRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (message: string) => {
    if (loading || cooldown) return;
    setLoading(true);
    const result = await legalAI.analyzeQuery(message);
    setAiResult(result);
    setShowAIResponse(true);
    setLoading(false);
    if (!result.message.includes('You are making requests too quickly')) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000);
    }
  };

  const handleTryNowClick = (link: string) => {
    // If user is already authenticated, redirect directly
    if (user && session) {
      window.location.href = link;
      return;
    }

    // If not authenticated, store the target link and redirect to signin
    localStorage.setItem('redirectAfterAuth', link);
    navigate('/signin');
  };

  useEffect(() => {
    if (aiResult && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [aiResult]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f7f7f3] fustat">
      <main className="flex-1 flex flex-col items-center justify-start w-full pt-5">
        <div
          className="w-full max-w-[96vw] rounded-3xl shadow-2xl px-2 md:px-4 py-4 md:py-8 mx-auto flex flex-col items-center relative overflow-hidden mb-8"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            <IndexLogo />
            <h1
              className="mb-10 mx-auto text-center w-[902px] h-[84px] text-white fustat font-normal text-[24px] leading-[42px] tracking-[0]"
            >
              Unlock AI-Powered Legal Brilliance for Instantly Navigate Patents, Trademarks, Contracts, and Compliance with NeuralArc.
            </h1>
            {/* AI Input/Response Section (Search Bar) */}
            <div className="w-full max-w-4xl">
              <AIInputBox 
                onSubmit={handleSubmit} 
                loading={loading}
                className="w-full [&>form]:bg-[#252323AD] [&>form]:border-none [&>form]:text-white [&>form]:placeholder-white/90 [&>form]:focus:ring-0 [&>form]:focus:outline-none [&>form]:px-6 [&>form]:h-14 [&>form]:flex [&>form]:items-center [&>form]:text-[22px] [&>form]:font-normal [&>p]:hidden [&>form>*]:text-white [&>form>svg]:text-white [&>form>button]:text-white [&>form]:backdrop-blur-sm [&>form]:shadow-[-5px_-7px_16.6px_0px_#3D3D3D40_inset] [&>form]:rounded-[8px]"
              />
              {aiResult && showAIResponse && (
                <div ref={responseRef} className="w-full mt-1">
                  <AIResponse 
                    message={aiResult.message}
                    suggestedServices={aiResult.suggestedServices}
                    externalLink={aiResult.externalLink}
                    onClose={() => setShowAIResponse(false)}
                    className="fustat"
                  />
                </div>
              )}
            </div>
            
            {/* Features Section */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex flex-col items-start justify-center text-left w-[373px] h-[409px] gap-2 rounded-[16px] p-10">
                  <h3 className="text-white mb-4 fustat font-semibold text-[28px] leading-[28.07px] tracking-[-0.4%] align-middle">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-8 fustat font-normal text-[16px] leading-[24.06px] tracking-[0]">
                    {feature.description}
                  </p>
                  <button
                    onClick={() => handleTryNowClick(feature.link)}
                    disabled={authLoading}
                    className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition inline-block disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {authLoading ? 'Loading...' : 'Try Now'}
                  </button>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </main>
      {/* Footer with proper spacing */}
      <footer className="w-full mt-auto bg-transparent">
        <div className="w-full bg-[#18181b] rounded-t-2xl px-8 py-5 flex flex-row items-center justify-center text-gray-400 text-[17px] fustat gap-2 flex-wrap" style={{ fontWeight: 400 }}>
          <img src="/lawbit-l-logo.png" alt="NeuralArc Logo" className="inline-block align-middle h-[24px] w-auto ml-2" />
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white transition underline">Terms of use</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white transition underline">Privacy Policy</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white transition underline">Disclaimer</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white transition underline">Responsible AI</a>
          <span className="mx-2">•</span>
          <span>Copyright 2025. All rights reserved.</span>
          <span className="mx-2">•</span>
          <span>Lawbit AI, a thing by</span>
          <img src="/neuralarc-logo.png" alt="NeuralArc Logo" className="inline-block align-middle h-[24px] w-auto ml-2" />
        </div>
      </footer>
    </div>
  );
};

export default AppDashboard;
