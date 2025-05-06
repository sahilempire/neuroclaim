
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-serif font-bold">
            <span className="text-legal-teal">Mindful</span>
            <span className="text-white">Legal</span>
          </h1>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-legal-teal transition-colors">Features</a>
            <a href="#services" className="hover:text-legal-teal transition-colors">Services</a>
            <a href="#about" className="hover:text-legal-teal transition-colors">About</a>
          </div>
          <div>
            <Link to="/app" className="bg-legal-teal text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Enter App
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 mt-8 md:mt-16">
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Intelligent Legal <span className="text-legal-teal">AI Assistant</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Streamline your legal processes with our powerful AI technology. Get intelligent recommendations for patents, trademarks, legal drafting, and compliance.
          </p>
          <div className="flex gap-4">
            <Link to="/app" className="bg-legal-teal hover:bg-opacity-90 text-white px-8 py-3 rounded-md flex items-center gap-2 transition-all transform hover:translate-y-[-2px]">
              Try Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#services" className="border border-gray-600 px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
              Learn More
            </a>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative z-10 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <h3 className="text-legal-teal font-medium mb-2">AI Legal Assistant</h3>
            <p className="text-sm text-gray-300 mb-4">Ask me anything about legal matters</p>
            <div className="bg-gray-700/70 border border-gray-600 p-2 rounded-lg flex">
              <input 
                type="text" 
                className="bg-transparent flex-1 outline-none text-sm px-2"
                placeholder="How do I register a trademark?"
                disabled
              />
              <span className="px-3 py-1.5 bg-legal-teal rounded text-white text-sm">Ask</span>
            </div>
          </div>
          {/* Abstract shapes */}
          <div className="absolute top-[-30px] right-[-20px] w-64 h-64 bg-legal-teal/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20px] left-[-10px] w-40 h-40 bg-legal-gold/10 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Advanced <span className="text-legal-teal">Features</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our AI-powered legal assistant provides intelligent solutions for all your legal needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
            <div className="w-12 h-12 bg-legal-teal/20 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-legal-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Document Analysis</h3>
            <p className="text-gray-300">
              Our AI can analyze legal documents, contracts, and identify potential issues or opportunities.
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
            <div className="w-12 h-12 bg-legal-teal/20 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-legal-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Deadline Reminders</h3>
            <p className="text-gray-300">
              Never miss an important legal deadline with our smart notification system.
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
            <div className="w-12 h-12 bg-legal-teal/20 rounded-md flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-legal-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Template Library</h3>
            <p className="text-gray-300">
              Access our extensive library of legal templates and customize them to your needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="container mx-auto px-6 py-24 bg-gray-800/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our <span className="text-legal-teal">Services</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive legal solutions powered by advanced AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/app" className="group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
                <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-legal-gold transition-colors">Patent Protection</h3>
              <p className="text-gray-400 text-sm mb-4">Secure your innovations with our comprehensive patent services.</p>
              <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/app" className="group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
                <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-legal-gold transition-colors">Trademark Registration</h3>
              <p className="text-gray-400 text-sm mb-4">Protect your brand identity with our streamlined trademark process.</p>
              <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/app" className="group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
                <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-legal-gold transition-colors">Document Drafting</h3>
              <p className="text-gray-400 text-sm mb-4">Professional preparation of contracts and legal documents.</p>
              <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/app" className="group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
                <svg className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-legal-gold transition-colors">Compliance Solutions</h3>
              <p className="text-gray-400 text-sm mb-4">Stay compliant with industry regulations and legal requirements.</p>
              <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            About <span className="text-legal-teal">MindfulLegal</span>
          </h2>
          <p className="text-gray-300 mb-6">
            NeuralClaim was founded by a team of legal experts and AI specialists with the mission to make legal services more accessible, efficient, and affordable. Our AI-powered platform helps businesses and individuals navigate complex legal landscapes with ease.
          </p>
          <Link to="/app" className="inline-flex items-center gap-2 bg-legal-teal hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all transform hover:translate-y-[-2px]">
            Try Our AI Assistant <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-xl font-serif font-bold">
                <span className="text-legal-teal">Mindful</span>
                <span className="text-white">Legal</span>
              </h1>
              <p className="text-gray-400 mt-2">Intelligent legal solutions</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="text-white font-medium mb-3">Product</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#features" className="hover:text-legal-teal transition-colors">Features</a></li>
                  <li><a href="#services" className="hover:text-legal-teal transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-legal-teal transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Company</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#about" className="hover:text-legal-teal transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-legal-teal transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-legal-teal transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
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

export default LandingPage;
