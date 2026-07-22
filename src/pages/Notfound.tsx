import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-lab-navy flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-lab-teal/20 flex items-center justify-center mx-auto mb-6">
          <FlaskConical className="w-10 h-10 text-lab-teal" />
        </div>
        <h1 className="font-heading text-6xl font-bold text-white mb-3">404</h1>
        <p className="text-white/60 text-lg mb-8">This page doesn't exist in our system.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
