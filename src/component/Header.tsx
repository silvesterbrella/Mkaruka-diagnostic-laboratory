import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FlaskConical, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/', roles: ['all'] },
    { label: 'Register', path: '/register', roles: ['admin', 'staff', 'doctor'] },
    { label: 'Orders', path: '/orders', roles: ['admin', 'staff', 'doctor'] },
    { label: 'Results', path: '/results', roles: ['admin', 'staff', 'doctor'] },
    { label: 'My Results', path: '/portal', roles: ['patient'] },
    { label: 'Contact', path: '/contact', roles: ['all'] },
  ].filter(link => 
    link.roles.includes('all') || (user && link.roles.includes(user.role))
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-lab-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-lab-teal flex items-center justify-center group-hover:scale-105 transition-transform">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading text-white text-lg font-bold leading-tight">
            Mkaruka<br /><span className="text-lab-teal text-[10px] tracking-widest uppercase">Diagnostic Lab</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${location.pathname === link.path ? 'text-lab-teal' : 'text-white/80 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                <UserIcon className="w-4 h-4 text-lab-teal" />
                <span className="text-xs font-semibold text-white">{user?.name}</span>
              </div>
              <button onClick={() => { logout(); navigate('/'); }} className="p-2 text-white/60 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2.5 rounded-full bg-lab-teal text-white text-sm font-semibold hover:bg-lab-teal/90 transition-all">
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-lab-navy border-t border-white/10 px-6 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`px-4 py-3 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-lab-teal/20 text-lab-teal' : 'text-white/80'}`}>
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={() => { logout(); navigate('/'); }} className="mt-2 px-4 py-3 rounded-lg text-red-400 text-sm font-medium text-left">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="mt-2 px-5 py-3 rounded-full bg-lab-teal text-white text-sm font-semibold text-center">
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
