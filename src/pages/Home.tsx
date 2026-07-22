import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-navy to-lab-navy-light">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Mkaruka Diagnostic Laboratory
          </h1>
          <p className="text-xl text-lab-teal mb-8">
            Advanced Medical Testing & Diagnostics
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-8 py-3 bg-lab-teal text-white rounded-lg font-semibold hover:bg-lab-teal-dark transition"
            >
              Login
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-lab-teal text-lab-teal rounded-lg font-semibold hover:bg-lab-teal/10 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;