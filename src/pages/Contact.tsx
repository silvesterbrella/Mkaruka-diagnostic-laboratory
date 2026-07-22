import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-navy to-lab-navy-light p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Email:</strong> info@mkaruka-lab.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Medical Plaza, Healthcare City, HC 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;