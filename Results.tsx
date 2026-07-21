import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ChevronDown, ChevronUp, Send, Bell, Plus, Download, Truck, PackageCheck, Microscope, Printer } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import ResultInterpretation from '../components/ResultInterpretation';
import NotificationModal from '../components/NotificationModal';
import { Order, OrderStatus, ResultEntry } from '../types';
import { useAuth } from '../context/AuthContext';

const sampleOrders: Order[] = [
  {
    id: 'ORD-1234567',
    patientId: 'MKL-100001',
    patientName: 'Amina Juma',
    phone: '+255 712 345 678',
    email: 'amina.juma@email.com',
    tests: ['Complete Blood Count (CBC)', 'Blood Glucose (Fasting)'],
    status: 'paid',
    date: '2026-01-15',
    timestamps: { ordered: '2026-01-15 08:00', paid: '2026-01-15 08:10' },
  },
  {
    id: 'ORD-2345678',
    patientId: 'MKL-100002',
    patientName: 'Hassan Mwangi',
    phone: '+255 754 987 654',
    email: 'hassan.mwangi@email.com',
    tests: ['Lipid Profile', 'HbA1c'],
    status: 'collected',
    date: '2026-01-14',
    timestamps: { ordered: '2026-01-14 10:00', paid: '2026-01-14 10:15', collected: '2026-01-14 11:00' },
  },
  {
    id: 'ORD-3456789',
    patientId: 'MKL-100003',
    patientName: 'Grace Okonkwo',
    phone: '+255 765 111 222',
    email: 'grace.okonkwo@email.com',
    tests: ['Thyroid Function (TSH)'],
    status: 'ready',
    date: '2026-01-13',
    timestamps: { ordered: '2026-01-13 09:00', paid: '2026-01-13 09:15', collected: '2026-01-13 09:30', ready: '2026-01-14 14:00' },
    results: [{ test: 'TSH', value: '8.5', unit: 'mIU/L', referenceRange: '0.4 – 4.0', status: 'high' }],
    interpretation: 'TSH is elevated suggesting possible hypothyroidism.',
  },
];

const Results: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [entryMode, setEntryMode] = useState<string | null>(null);
  const [entryResults, setEntryResults] = useState<ResultEntry[]>([{ test: '', value: '', unit: '', referenceRange: '', status: 'normal' }]);
  const [notifModal, setNotifModal] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const matchesSearch = o.patientName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    if (user?.role === 'doctor') return matchesSearch && o.doctorId === user.id;
    return matchesSearch;
  });

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const tsKey = newStatus === 'collected' ? 'collected' : newStatus === 'in-transit' ? 'transit' : newStatus === 'received' ? 'received' : 'processed';
        return { ...o, status: newStatus, timestamps: { ...o.timestamps, [tsKey]: new Date().toLocaleString() } };
      }
      return o;
    }));
    toast.info(`Status updated to ${newStatus}`);
  };

  const submitResults = (orderId: string) => {
    const filled = entryResults.filter(r => r.test.trim() && r.value.trim());
    if (filled.length === 0) return toast.error('Enter at least one result');
    
    setOrders(prev => prev.map(o => o.id === orderId ? { 
      ...o, 
      status: 'ready', 
      results: filled, 
      interpretation: 'Auto-generated interpretation based on reference ranges.',
      timestamps: { ...o.timestamps, ready: new Date().toLocaleString() }
    } : o));
    setEntryMode(null);
    toast.success('Results submitted!');
  };

  const handlePrint = (order: Order) => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-lab-navy">Results Management</h1>
              <p className="text-gray-500">Track samples and manage diagnostic reports</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-lab-teal/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filtered.map((order) => (
              <motion.div key={order.id} layout className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-lab-teal/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-lab-teal" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lab-navy">{order.patientName}</h3>
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-14 md:ml-0">
                      <StatusBadge status={order.status} />
                      {expanded === order.id ? <ChevronUp className="w-4 h-4 text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === order.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gray-50">
                      <div className="p-6 space-y-6">
                        {/* Sample Tracking Workflow */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button onClick={() => updateStatus(order.id, 'collected')} disabled={order.status !== 'paid'} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${order.status === 'collected' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                            <PackageCheck className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase">Collected</span>
                          </button>
                          <button onClick={() => updateStatus(order.id, 'in-transit')} disabled={order.status !== 'collected'} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${order.status === 'in-transit' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                            <Truck className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase">In Transit</span>
                          </button>
                          <button onClick={() => updateStatus(order.id, 'received')} disabled={order.status !== 'in-transit'} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${order.status === 'received' ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                            <Microscope className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase">Received</span>
                          </button>
                          <button onClick={() => setEntryMode(order.id)} disabled={order.status !== 'received' && order.status !== 'processing'} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${order.status === 'processing' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                            <Plus className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase">Enter Results</span>
                          </button>
                        </div>

                        {order.results ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-heading font-bold text-lab-navy text-sm">Final Report</h4>
                              <button onClick={() => handlePrint(order)} className="flex items-center gap-2 text-lab-teal text-xs font-bold hover:underline">
                                <Printer className="w-4 h-4" /> Print Report
                              </button>
                            </div>
                            <ResultInterpretation results={order.results} summary={order.interpretation || ''} />
                            {order.status === 'ready' && (
                              <button onClick={() => setNotifModal(order)} className="w-full py-3 bg-lab-teal text-white font-bold rounded-xl hover:bg-lab-teal/90 transition-all flex items-center justify-center gap-2">
                                <Bell className="w-4 h-4" /> Notify Patient
                              </button>
                            )}
                          </div>
                        ) : entryMode === order.id ? (
                          <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h4 className="font-heading font-bold text-lab-navy text-sm">Result Entry</h4>
                            <div className="space-y-3">
                              {entryResults.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                  <input placeholder="Test" className="p-2 text-xs border border-gray-200 rounded-lg" value={row.test} onChange={e => {
                                    const newRes = [...entryResults];
                                    newRes[idx].test = e.target.value;
                                    setEntryResults(newRes);
                                  }} />
                                  <input placeholder="Value" className="p-2 text-xs border border-gray-200 rounded-lg" value={row.value} onChange={e => {
                                    const newRes = [...entryResults];
                                    newRes[idx].value = e.target.value;
                                    setEntryResults(newRes);
                                  }} />
                                  <input placeholder="Unit" className="p-2 text-xs border border-gray-200 rounded-lg" value={row.unit} onChange={e => {
                                    const newRes = [...entryResults];
                                    newRes[idx].unit = e.target.value;
                                    setEntryResults(newRes);
                                  }} />
                                  <input placeholder="Range" className="p-2 text-xs border border-gray-200 rounded-lg" value={row.referenceRange} onChange={e => {
                                    const newRes = [...entryResults];
                                    newRes[idx].referenceRange = e.target.value;
                                    setEntryResults(newRes);
                                  }} />
                                  <select className="p-2 text-xs border border-gray-200 rounded-lg bg-white" value={row.status} onChange={e => {
                                    const newRes = [...entryResults];
                                    newRes[idx].status = e.target.value as any;
                                    setEntryResults(newRes);
                                  }}>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                    <option value="critical">Critical</option>
                                  </select>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEntryResults([...entryResults, { test: '', value: '', unit: '', referenceRange: '', status: 'normal' }])} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600">+ Add Row</button>
                              <button onClick={() => submitResults(order.id)} className="px-4 py-2 bg-lab-teal text-white rounded-lg text-xs font-bold">Submit Results</button>
                              <button onClick={() => setEntryMode(null)} className="px-4 py-2 text-xs font-bold text-gray-400">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-xs text-gray-400">Complete sample collection steps to enable result entry.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile FAB for Result Entry */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button onClick={() => navigate('/register')} className="w-14 h-14 rounded-full bg-lab-teal text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <Footer />
      {notifModal && (
        <NotificationModal open={!!notifModal} onClose={() => setNotifModal(null)} patientName={notifModal.patientName} phone={notifModal.phone} email={notifModal.email} type="results" />
      )}
    </div>
  );
};

export default Results;