import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Camera, Save, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-white/50">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Section */}
        <div className="md:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center sticky top-24"
          >
            <div className="relative mb-6 group cursor-pointer">
              <div className="w-32 h-32 rounded-full border-4 border-dark-950 bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center shadow-lg overflow-hidden">
                <span className="font-bold text-4xl">{user?.username?.charAt(0)}</span>
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-brand-cyan rounded-full border-2 border-dark-950 text-dark-950 shadow-lg">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-white/50 text-sm capitalize mb-4">{user?.role}</p>
            <div className="w-full h-px bg-white/5 my-4" />
             <p className="text-xs text-white/40 max-w-[200px]">
               JPG, GIF or PNG. Max size of 2MB
             </p>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-cyan" />
              Personal Details
            </h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.username}
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-white/40" />
                    </div>
                    <input 
                      type="email" 
                      disabled
                      defaultValue={user?.email}
                      className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-white/5 rounded-xl text-white/50 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70 uppercase">Bio</label>
                <textarea 
                  rows="4"
                  defaultValue={user?.bio}
                  className="w-full p-4 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all text-white resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl font-bold bg-white text-dark-950 hover:bg-white/90 transition-all shadow-glow-cyan flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Password Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-pink" />
              Security
            </h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink outline-none transition-all text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-pink outline-none transition-all text-white"
                  />
                </div>
              </div>

               <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl font-bold bg-dark-900 border border-white/10 hover:bg-white/5 transition-all text-white"
                >
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
