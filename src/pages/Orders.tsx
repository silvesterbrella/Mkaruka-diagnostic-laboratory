import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, FlaskConical, ShoppingCart, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';
import StatusBadge from '../components/StatusBadge';

interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaround: string;
  description: string;
}

const allTests: Test[] = [
  { id: 't1', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 15000, turnaround: '4 hrs', description: 'Measures red cells, white cells, and platelets.' },
  { id: 't2', name: 'Blood Glucose (Fasting)', category: 'Chemistry', price: 8000, turnaround: '2 hrs', description: 'Measures blood sugar levels after fasting.' },
  { id: 't3', name: 'Lipid Profile', category: 'Chemistry', price: 25000, turnaround: '6 hrs', description: 'Cholesterol, HDL, LDL, and triglycerides.' },
  { id: 't4', name: 'Liver Function Tests (LFT)', category: 'Chemistry', price: 30000, turnaround: '6 hrs', description: 'ALT, AST, ALP, bilirubin, albumin.' },
  { id: 't5', name: 'Kidney Function Tests (KFT)', category: 'Chemistry', price: 28000, turnaround: '6 hrs', description: 'Creatinine, urea, uric acid, electrolytes.' },
  { id: 't6', name: 'Thyroid Function (TSH)', category: 'Endocrinology', price: 35000, turnaround: '8 hrs', description: 'Thyroid stimulating hormone levels.' },
  { id: 't7', name: 'Malaria RDT', category: 'Parasitology', price: 5000, turnaround: '30 min', description: 'Rapid diagnostic test for malaria.' },
  { id: 't8', name: 'HIV Screening', category: 'Serology', price: 10000, turnaround: '1 hr', description: 'HIV 1 & 2 antibody screening.' },
  { id: 't9', name: 'Urinalysis', category: 'Urinalysis', price: 7000, turnaround: '2 hrs', description: 'Physical, chemical, and microscopic urine analysis.' },
  { id: 't10', name: 'HbA1c', category: 'Chemistry', price: 22000, turnaround: '4 hrs', description: 'Average blood glucose over 3 months.' },
  { id: 't11', name: 'Widal Test', category: 'Serology', price: 12000, turnaround: '3 hrs', description: 'Typhoid fever antibody detection.' },
  { id: 't12', name: 'Stool Analysis', category: 'Microbiology', price: 9000, turnaround: '4 hrs', description: 'Ova, cysts, and occult blood.' },
];

const categories = ['All', ...Array.from(new Set(allTests.map(t => t.category)))];

const Orders: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<Test[]>([]);
  const [patientId, setPatientId] = useState('');
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const filtered = allTests.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (test: Test) => {
    setSelected(prev =>
      prev.find(t => t.id === test.id) ? prev.filter(t => t.id !== test.id) : [...prev, test]
    );
  };

  const total = selected.reduce((sum, t) => sum + t.price, 0);

  const handleOrder = () => {
    if (!patientId.trim()) {
      toast.error('Please enter a Patient ID');
      return;
    }
    if (selected.length === 0) {
      toast.error('Please select at least one test');
      return;
    }
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentOpen(false);
    const ref = `ORD-${Date.now().toString().slice(-7)}`;
    setOrderRef(ref);
    setOrderComplete(true);
    toast.success('Order placed and payment confirmed!');
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-lab-teal/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-lab-teal" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-lab-navy mb-2">Order Confirmed</h1>
              <p className="text-gray-500 mb-6">Payment received. Sample collection can now proceed.</p>

              <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Order Reference</span>
                  <span className="font-mono font-bold text-lab-teal">{orderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Patient ID</span>
                  <span className="font-semibold text-lab-navy">{patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Tests Ordered</span>
                  <span className="font-semibold text-lab-navy">{selected.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Amount Paid</span>
                  <span className="font-semibold text-lab-teal">TZS {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Status</span>
                  <StatusBadge status="paid" />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                {selected.map(t => (
                  <div key={t.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700">{t.name}</span>
                    <span className="text-gray-500">TZS {t.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/results" className="px-6 py-3 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200">
                  View Results
                </a>
                <button
                  onClick={() => { setOrderComplete(false); setSelected([]); setPatientId(''); }}
                  className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  New Order
                </button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-lab-teal text-sm font-semibold uppercase tracking-widest mb-2">Step 2 of 4</p>
            <h1 className="font-heading text-3xl font-bold text-lab-navy mb-2">Test Orders</h1>
            <p className="text-gray-500">Select diagnostic tests for the patient. Payment is required before sample collection.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient ID *</label>
                  <input
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    placeholder="e.g. MKL-123456"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200 font-mono"
                  />
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tests..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        activeCategory === cat
                          ? 'bg-lab-teal text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((test, i) => {
                  const isSelected = !!selected.find(t => t.id === test.id);
                  return (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={`bg-white rounded-xl border-2 p-5 cursor-pointer hover:shadow-md transition-all duration-200 ${
                        isSelected ? 'border-lab-teal shadow-md' : 'border-gray-100 hover:border-gray-200'
                      }`}
                      onClick={() => toggle(test)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-lab-teal/10 flex items-center justify-center">
                          <FlaskConical className="w-4 h-4 text-lab-teal" />
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'bg-lab-teal border-lab-teal' : 'border-gray-300'
                        }`}>
                          {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-lab-navy text-sm mb-1">{test.name}</h3>
                      <p className="text-gray-400 text-xs mb-3">{test.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{test.turnaround}</span>
                        <span className="font-semibold text-lab-teal text-sm">TZS {test.price.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingCart className="w-5 h-5 text-lab-teal" />
                  <h2 className="font-heading font-bold text-lab-navy">Order Summary</h2>
                </div>

                {selected.length === 0 ? (
                  <div className="text-center py-8">
                    <FlaskConical className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No tests selected yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-5">
                    {selected.map(t => (
                      <div key={t.id} className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.category}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-semibold text-lab-navy">TZS {t.price.toLocaleString()}</span>
                          <button
                            onClick={() => toggle(t)}
                            className="w-5 h-5 rounded-full bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
                            aria-label={`Remove ${t.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Total</span>
                    <span className="font-heading text-xl font-bold text-lab-navy">TZS {total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{selected.length} test{selected.length !== 1 ? 's' : ''} selected</p>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full py-3 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={total}
        orderRef={`ORD-${Date.now().toString().slice(-7)}`}
      />
    </div>
  );
};

export default Orders;
