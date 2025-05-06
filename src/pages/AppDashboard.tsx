import React, { useState, useRef, useEffect } from 'react';
import AIInputBox from '@/components/AIInputBox';
import AIResponse from '@/components/AIResponse';
import legalAI, { AIAnalysisResult } from '@/services/legalAI';

const IndexLogo = ({ width = 220, height = 60 }: { width?: number; height?: number }) => (
  <img 
    src="/lawbit-logo.svg" 
    alt="LawBit Logo" 
    width={width} 
    height={height} 
    className="mx-auto my-8"
    style={{ filter: 'drop-shadow(0 2px 16px #fff8)', maxWidth: '100%' }}
  />
);

const features = [
  {
    title: 'AI for Drafting',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.'
  },
  {
    title: 'AI for Compliance',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.'
  },
  {
    title: 'AI for Trademark',
    description: 'LawBit simplifies contract creation and analysis with AI-powered accuracy. Effortlessly draft, review, and optimize legal documents in seconds.'
  }
];

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
    const result = await legalAI.analyzeQuery(message);
    setAiResult(result);
    setLoading(false);
    if (!result.message.includes('You are making requests too quickly')) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-[#f7f7f3] font-sans">
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div
          className="w-full max-w-[96vw] min-h-[98vh] rounded-3xl shadow-2xl px-2 md:px-4 py-4 md:py-8 mx-auto flex flex-col items-center relative overflow-hidden mt-4 md:mt-8"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            <IndexLogo />
            <h1
              className="mb-10 max-w-3xl mx-auto text-center"
              style={{
                fontFamily: 'Fustat, sans-serif',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '42px',
                letterSpacing: 0,
                color: 'white',
                textAlign: 'center'
              }}
            >
              Unlock AI-Powered Legal Brilliance for Instantly Navigate Patents, Trademarks, Contracts, and Compliance with NeuralArc.
            </h1>
            {/* AI Input/Response Section (Search Bar) */}
            <AIInputBox 
              onSubmit={handleSubmit} 
              loading={loading}
              className="w-full max-w-4xl mb-12 [&>form]:bg-[#252323AD] [&>form]:rounded-2xl [&>form]:shadow-none [&>form]:border-none [&>form]:text-white [&>form]:placeholder-white/90 [&>form]:focus:ring-0 [&>form]:focus:outline-none [&>form]:px-6 [&>form]:h-14 [&>form]:flex [&>form]:items-center [&>form]:text-[22px] [&>form]:font-normal [&>p]:hidden [&>form>*]:text-white [&>form>svg]:text-white [&>form>button]:text-white [&>form]:backdrop-blur-sm [&>form]:shadow-[-5px_-7px_16.6px_0px_#3D3D3D40_inset] [&>form]:rounded-[8px]"
            />
            {/* Features Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x md:pl-24 md:pr-18 divide-white/60 mb-12">
              {/* AI for Trademark (left) */}
              <div className="flex flex-col items-start justify-center text-left px-4 py-10 md:pr-40">
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '28.07px',
                    letterSpacing: '-0.4%',
                    verticalAlign: 'middle'
                  }}
                >
                  {features[2].title}
                </h3>
                <p
                  className="text-gray-300 mb-8"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24.06px',
                    letterSpacing: 0
                  }}
                >
                  {features[2].description}
                </p>
                <button className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif' }}>Try Now</button>
              </div>
              {/* AI for Compliance (center, less vertical padding) */}
              <div className="flex flex-col items-start justify-center text-left px-4 py-[30px] md:px-24">
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '28.07px',
                    letterSpacing: '-0.4%',
                    verticalAlign: 'middle'
                  }}
                >
                  {features[1].title}
                </h3>
                <p
                  className="text-gray-300 mb-8"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24.06px',
                    letterSpacing: 0
                  }}
                >
                  {features[1].description}
                </p>
                <button className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif' }}>Try Now</button>
              </div>
              {/* AI for Legal Intelligence (right) */}
              <div className="flex flex-col items-start justify-center text-left px-4 py-10 md:pl-24 md:pr-20">
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '28.07px',
                    letterSpacing: '-0.4%',
                    verticalAlign: 'middle'
                  }}
                >
                  {features[0].title}
                </h3>
                <p
                  className="text-gray-300 mb-8"
                  style={{
                    fontFamily: 'Fustat, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24.06px',
                    letterSpacing: 0
                  }}
                >
                  {features[0].description}
                </p>
                <button className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif' }}>Try Now</button>
              </div>
            </div>
            {aiResult && (
              <div ref={responseRef} className="w-full mt-8 max-w-2xl">
                <AIResponse 
                  message={aiResult.message}
                  suggestedServices={aiResult.suggestedServices}
                  externalLink={aiResult.externalLink}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full flex justify-center items-center py-0 pb-4">
        <div className="w-full max-w-[96vw] bg-[#18181b] rounded-3xl shadow-2xl px-8 md:px-16 py-6 mx-auto flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm mt-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <IndexLogo width={100} height={100} />
            <span className="hidden md:inline-block">•</span>
            <a href="#" className="hover:text-white transition">Terms of use</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Disclaimer</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Responsible AI</a>
          </div>
          <div className="flex items-center gap-2">
            <span>Copyright 2025. All rights reserved.</span>
            <span className="hidden md:inline-block">Lawbit AI, a thing by</span>
            <span className="font-bold text-white">NeuralArc</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppDashboard;
