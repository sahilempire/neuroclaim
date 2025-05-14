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
    className="mx-auto mt-12 mb-10"
    style={{ maxWidth: '100%' }}
  />
);

const features = [
  {
    title: 'Lawbit',
    subtitle: 'AI for Legal Intelligence',
    description: 'Create, review and optimize contracts with ease. Lawbit streamlines every step of legal drafting from patent generation to compliance management.',
    icon: '/lawbit-l-logo.png',
    link: 'https://lawbit.ai/'
  },
  {
    title: 'Becan',
    subtitle: 'AI for Compliance',
    description: 'Automate compliance checks and risk assessments. CompliAI helps you stay ahead of regulations and manage compliance effortlessly.',
    icon: '/compli-logo.png',
    link: 'https://compli-ai-shield.vercel.app/assessment'
  },
  {
    title: 'Radar',
    subtitle: 'AI for Trademark & Patent',
    description: 'Protect your intellectual property with Radar. Instantly search, analyze, and monitor trademarks with AI-powered precision.',
    icon: '/radar-logo.png',
    link: 'https://radar.neuralarc.ai/'
  }
];

const AppDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [showAIResponse, setShowAIResponse] = useState(false);
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
    setShowAIResponse(true);
    setLoading(false);
    if (!result.message.includes('You are making requests too quickly')) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000);
    }
  };

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
            
            {/* Commented out search bar functionality
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
            */}
            
            {/* Enhanced Features Section - now styled as per reference image */}
            <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1800px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 px-4 mb-12 items-stretch">
                {features.map((feature, index) => (
                  <a
                    key={index}
                    href={feature.link}
                    className="relative flex flex-col w-full max-w-[370px] h-full bg-[#232323] rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl border border-[#353535] overflow-hidden mx-auto card-inner-shadow xl:max-w-[420px] 2xl:max-w-[500px]"
                    style={{ minWidth: 0 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Card-specific background image, more visible and prominent */}
                    <img
                      src={
                        index === 0 ? '/card-l.png' :
                        index === 1 ? '/card-b.png' :
                        '/card-r.png'
                      }
                      alt="card background"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 brightness-150 contrast-200"
                    />
                    {/* Arrow top right */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent group-hover:bg-[#333] transition-colors duration-200">
                        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Larger, lighter circle */}
                          <circle cx="24" cy="24" r="16" stroke="#bbb" strokeWidth="0.9" />
                          {/* Larger arrow */}
                          <path d="M18 30 L30 18" stroke="#bbb" strokeWidth="0.9" strokeLinecap="round"/>
                          <path d="M21.5 18H30V26.5" stroke="#bbb" strokeWidth="0.9" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                    {/* Heading and Subheading top left (replacing logo) */}
                    <div className="mb-4 z-10">
                      <h3 className="text-white text-[1.7rem] font-extrabold mb-1 fustat leading-tight">{feature.title}</h3>
                      <div className="text-[#e0e0e0] text-lg font-semibold fustat leading-snug">{feature.subtitle}</div>
                    </div>
                    {/* Content */}
                    <div className="z-10 mt-auto flex flex-col justify-end h-full">
                      <p className="text-[#bdbdbd] text-base leading-relaxed fustat mt-4">{feature.description}</p>
                    </div>
                  </a>
                ))}
              </div>
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
