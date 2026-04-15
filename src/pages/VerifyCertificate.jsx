import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, ShieldCheck, Award, Calendar, XCircle } from 'lucide-react';
import { CERTIFICATES } from '../data/mockData';

export default function VerifyCertificate() {
  const [searchCode, setSearchCode] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    
    setHasSearched(true);
    // Mock check
    const found = CERTIFICATES.find(c => c.certificate_code.toLowerCase() === searchCode.toLowerCase());
    setResult(found || null);
  };

  return (
    <div className="flex-grow pt-24 pb-20 px-4 min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-outfit">
            Verify <span className="gradient-text-purple">Certificate</span>
          </h1>
          <p className="text-white/50 text-lg">
            Enter the unique certificate code to verify its authenticity.
          </p>
        </div>

        <form onSubmit={handleVerify} className="relative mb-12">
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="e.g. CUP-2024-PY-00142"
            className="w-full pl-6 pr-32 py-5 bg-dark-900/80 border border-white/20 rounded-2xl focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all text-white placeholder-white/30 text-lg font-code tracking-wider shadow-card backdrop-blur-md uppercase"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold bg-gradient-to-r from-brand-violet to-brand-cyan hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Verify</span>
          </button>
        </form>

        {hasSearched && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {result ? (
              <div className="glass p-8 rounded-[2rem] border border-brand-emerald/30 shadow-glow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <ShieldCheck className="w-40 h-40 text-brand-emerald" />
                </div>
                
                <div className="flex items-center gap-3 text-brand-emerald mb-6 font-bold text-lg">
                  <CheckCircle className="w-6 h-6" />
                  Verified & Authentic
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <div className="text-sm text-white/50 mb-1">Student</div>
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Ahmed Hassan</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-white/50 mb-1">Course Completed</div>
                    <div className="text-xl font-bold">{result.course.title.en}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <div className="text-sm text-white/50 mb-1 flex items-center gap-2"><Award className="w-4 h-4" /> Final Score</div>
                      <div className="text-xl font-bold text-brand-cyan">{result.final_score}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1 flex items-center gap-2"><Calendar className="w-4 h-4" /> Issued On</div>
                      <div className="text-xl font-bold">{new Date(result.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass p-8 rounded-[2rem] border border-brand-pink/30 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-pink/10 flex items-center justify-center mx-auto mb-4 text-brand-pink">
                  <XCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Certificate Not Found</h3>
                <p className="text-white/60">We couldn't find a certificate matching that code. Please check the code and try again.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
