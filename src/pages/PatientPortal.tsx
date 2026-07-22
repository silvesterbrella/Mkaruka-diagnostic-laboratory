import React from 'react';
import { useAuth } from '../context/AuthContext';

const PatientPortal: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-navy to-lab-navy-light p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Patient Portal</h1>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {user && (
            <div className="mb-6">
              <p className="text-gray-600">
                <strong>Welcome,</strong> {user.email}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-lab-teal pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">My Results</h3>
              <p className="text-gray-600">View your test results and reports</p>
            </div>

            <div className="border-l-4 border-lab-teal pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">My Orders</h3>
              <p className="text-gray-600">Track your lab test orders</p>
            </div>

            <div className="border-l-4 border-lab-teal pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointments</h3>
              <p className="text-gray-600">Schedule or view appointments</p>
            </div>

            <div className="border-l-4 border-lab-teal pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile</h3>
              <p className="text-gray-600">Update your personal information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;