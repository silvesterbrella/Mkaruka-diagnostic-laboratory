import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lab-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-lab-teal flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-white text-lg font-bold">Mkaruka Lab</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Precision diagnostics. Trusted results. Serving patients with accuracy and care since 2010.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-lab-teal transition-colors duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-lab-teal transition-colors duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-lab-teal transition-colors duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Services</h3>
            <ul className="space-y-3">
              {['Patient Registration', 'Test Orders', 'Results Portal', 'Home Collection'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 text-sm hover:text-lab-teal transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/' },
                { label: 'Contact', path: '/contact' },
                { label: 'Privacy Policy', path: '/' },
                { label: 'Terms of Service', path: '/' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/60 text-sm hover:text-lab-teal transition-colors duration-200">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-lab-teal mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">123 Health Avenue, Arusha, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-lab-teal shrink-0" />
                <a href="tel:+255700000000" className="text-white/60 text-sm hover:text-lab-teal transition-colors duration-200">+255 700 000 000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-lab-teal shrink-0" />
                <a href="mailto:info@mkarukalab.co.tz" className="text-white/60 text-sm hover:text-lab-teal transition-colors duration-200">info@mkarukalab.co.tz</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2026 Mkaruka Diagnostic Laboratory. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200">Privacy</a>
            <a href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;