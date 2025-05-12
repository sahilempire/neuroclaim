import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
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

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
            <h1 className="mb-10 mx-auto text-center w-[902px] h-[84px] text-white fustat font-normal text-[24px] leading-[42px] tracking-[0]">
              Create your account to unlock AI-Powered Legal Brilliance
            </h1>
            
            <AuthForm 
              mode="signup" 
              onSuccess={() => navigate('/dashboard')} 
            />

            <p className="mt-6 text-white text-center">
              Already have an account?{' '}
              <Link to="/signin" className="text-white underline hover:text-gray-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
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

export default SignUp; 