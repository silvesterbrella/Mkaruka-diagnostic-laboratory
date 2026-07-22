import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-navy to-lab-navy-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-lab-teal mb-4">404</h1>
        <p className="text-2xl text-white mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-2 bg-lab-teal text-white rounded-lg hover:bg-lab-teal-dark transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;