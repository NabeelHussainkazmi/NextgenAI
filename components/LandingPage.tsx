import React from 'react';
import { ChevronRight, Check, Zap, Shield, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            NexTask
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <button 
              onClick={onGetStarted}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-all transform hover:scale-105"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            New: AI Task Generation 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-slide-up">
            Manage Projects at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse-slow">
              Light Speed
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            Stop planning, start doing. NexTask uses advanced AI to break down your goals into actionable steps instantly.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <button 
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-white text-dark font-bold rounded-full text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1"
            >
              Get Started for Free
              <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full text-slate-300 font-medium hover:text-white hover:bg-white/5 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <div className="border-y border-slate-800 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Users', value: '10k+' },
            { label: 'Tasks Completed', value: '1.2M' },
            { label: 'Time Saved', value: '500k hrs' },
            { label: 'Satisfaction', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why NexTask?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">We've reimagined the project management stack from the ground up to be faster, smarter, and more beautiful.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-amber-400" />}
              title="Lightning Fast"
              description="Built on the edge with zero-latency updates. Your tasks sync instantly across all devices."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-emerald-400" />}
              title="Enterprise Secure"
              description="Bank-grade encryption for all your data. SOC2 compliant and ready for scale."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8 text-pink-400" />}
              title="Deep Analytics"
              description="Visualize your productivity trends with beautiful, automatically generated charts."
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to transform your workflow?</h2>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto relative z-10">Join thousands of high-performing teams using NexTask to ship faster.</p>
          <button 
            onClick={onGetStarted}
            className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-lg shadow-lg hover:bg-indigo-50 transition-colors relative z-10"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-12 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} NexTask Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 rounded-2xl bg-surface border border-slate-700 hover:border-indigo-500/50 transition-colors group cursor-default">
    <div className="mb-6 p-4 bg-dark rounded-xl inline-block group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;