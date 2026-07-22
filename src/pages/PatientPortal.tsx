import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, FlaskConical, CheckCircle, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import ResultInterpretation from '../components/ResultInterpretation';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

const mockPatientOrders: Order[] = [
  {
    id: 'ORD-3456789',
    patientId: 'MKL-100001',
    patientName: 'Amina Juma',
    phone: '+255 712 345 678',
    email: 'amina.juma@email.com',
    tests: ['Thyroid Function (TSH)', 'Liver Function Tests (LFT)'],
    status: 'ready',
    date: '2026-01-13',
    timestamps: { ordered: '2026-01-13 09:00', paid: '2026-01-13 09:15', collected: '2026-01-13 09:30', ready: '2026-01-14 14:00' },
    results: [
      { test: 'TSH', value: '8.5', unit: 'mIU/L', referenceRange: '0.4 – 4.0', status: 'high' },
      { test: 'ALT', value: '32', unit: 'U/L', referenceRange: '7 – 56', status: 'normal' },
    ],
    interpretation: 'TSH is elevated suggesting possible hypothyroidism. Liver function is normal.',
  }
];

const PatientPortal: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleDownload = (order: Order) => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-lab-teal text-sm font-bold uppercase tracking-widest mb-2">Patient Portal</p>
              <h1 className="font-heading text-3xl font-bold text-lab-navy">Welcome, {user?.name}</h1>
              <p className="text-gray-500">Patient ID: <span className="font-mono font-bold text-lab-navy">{user?.patientId || 'MKL-100001'}</span></p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-gray-600">Verified Account</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {mockPatientOrders.map((order) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lab-teal/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-lab-teal" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lab-navy">Diagnostic Report</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-gray-400">{order.id}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} />
                    <button onClick={() => handleDownload(order)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lab-navy text-white text-xs font-bold hover:bg-lab-navy/90 transition-all">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tests</p>
                      <p className="text-xs font-bold text-lab-navy">{order.tests.length} Items</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Collected</p>
                      <p className="text-xs font-bold text-lab-navy">{order.timestamps.collected?.split(' ')[0] || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Doctor</p>
                      <p className="text-xs font-bold text-lab-navy">Dr. Mlowe</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Lab Ref</p>
                      <p className="text-xs font-bold text-lab-navy">MKL-LAB-01</p>
                    </div>
                  </div>

                  {order.results && (
                    <div className="print:block">
                      <ResultInterpretation results={order.results} summary={order.interpretation || ''} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientPortal;
