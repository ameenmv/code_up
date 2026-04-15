import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Code2, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 sm:p-10 rounded-[2rem] relative z-10 border border-white/10 shadow-card">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6 group hover:border-brand-pink/50 transition-colors">
              <Code2 className="w-6 h-6 text-brand-pink group-hover:text-brand-purple transition-colors" />
            </Link>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-white/50 text-sm">Join the next generation of programmers</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/40 group-focus-within:text-brand-pink transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Omar Ahmed"
                  className="w-full pl-11 pr-4 py-3.5 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all text-white placeholder-white/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40 group-focus-within:text-brand-pink transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="student@codeup.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all text-white placeholder-white/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40 group-focus-within:text-brand-pink transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all text-white placeholder-white/20"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-4 rounded-xl font-bold bg-gradient-to-r from-brand-pink to-brand-purple hover:from-white hover:to-white hover:text-dark-950 transition-all duration-300 shadow-glow-sm hover:shadow-glow-purple flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-white/50">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-pink hover:text-white font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
