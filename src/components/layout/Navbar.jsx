import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Code2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Verify', href: '/verify' },
  { label: 'Admin', href: '/admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Blur background */}
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-xl border-b border-white/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-cyan rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
              <Code2 className="relative z-10 w-8 h-8 p-1.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Code<span className="gradient-text-purple">Up</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden sm:block">
                  Dashboard
                </Link>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center font-bold">
                    {user?.username?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium hidden sm:block">{user?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-sm text-white/50 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-1.5 text-sm text-white/70 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-violet to-brand-indigo hover:from-brand-purple hover:to-brand-violet transition-all duration-300 shadow-glow-sm hover:shadow-glow-purple"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-b border-white/5 p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/5 flex gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 text-center text-sm border border-white/10 rounded-xl text-white/70">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 text-center text-sm bg-gradient-to-r from-brand-violet to-brand-indigo rounded-xl font-semibold">Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
