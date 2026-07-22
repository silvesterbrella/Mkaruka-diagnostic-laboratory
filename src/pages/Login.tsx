import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Stethoscope, FlaskConical, ArrowRight, Phone, Hash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const [view, setView] = useState<'select' | 'patient' | 'staff'>('select');
  const [patientId, setPatientId] = useState('');
  const [phone, setPhone] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStaffLogin = (role: 'admin' | 'staff' | 'doctor') => {
    login(role);
    navigate(role === 'admin' ? '/results' : '/register');
  };

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId && phone) {
      login('patient', { patientId, phone });
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold text-lab-navy mb-3">Welcome Back</h1>
            <p className="text-gray-500">Access the Mkaruka Diagnostic Laboratory portal</p>
          </motion.div>

          {view === 'select' && (
            <div className="space-y-4">
              <button onClick={() => setView('patient')} className="w-full p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lab-teal transition-all text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lab-teal/10 flex items-center justify-center group-hover:bg-lab-teal group-hover:text-white transition-colors">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lab-navy">Patient Portal</h3>
                    <p className="text-xs text-gray-400">View and download your test results</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-lab-teal" />
                </div>
              </button>

              <button onClick={() => setView('staff')} className="w-full p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lab-navy transition-all text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lab-navy/10 flex items-center justify-center group-hover:bg-lab-navy group-hover:text-white transition-colors">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lab-navy">Staff & Doctors</h3>
                    <p className="text-xs text-gray-400">Manage patients, orders, and results</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-lab-navy" />
                </div>
              </button>
            </div>
          )}

          {view === 'patient' && (
            <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handlePatientLogin} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              <button onClick={() => setView('select')} className="text-xs font-bold text-lab-teal uppercase tracking-widest mb-2">← Back</button>
              <h2 className="font-heading text-xl font-bold text-lab-navy">Patient Login</h2>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Patient ID</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="MKL-XXXXXX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-lab-teal/50 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+255 7XX XXX XXX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-lab-teal/50 outline-none" required />
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-lab-teal text-white font-bold rounded-xl hover:bg-lab-teal/90 transition-all">Access Results</button>
            </motion.form>
          )}

          {view === 'staff' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <button onClick={() => setView('select')} className="text-xs font-bold text-lab-teal uppercase tracking-widest mb-2">← Back</button>
              <h2 className="font-heading text-xl font-bold text-lab-navy mb-4">Staff Access</h2>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => handleStaffLogin('admin')} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                  <Shield className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-gray-700">Administrator</span>
                </button>
                <button onClick={() => handleStaffLogin('staff')} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                  <FlaskConical className="w-5 h-5 text-lab-teal" />
                  <span className="font-semibold text-gray-700">Lab Technician</span>
                </button>
                <button onClick={() => handleStaffLogin('doctor')} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-700">Doctor / Physician</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
