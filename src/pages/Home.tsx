import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlaskConical, ClipboardList, CreditCard, FileText, Bell, ArrowRight, Shield, Clock, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Patient Registration',
    desc: 'Register patient details including contact information. Confirmation is sent instantly via SMS and email.',
  },
  {
    icon: FlaskConical,
    step: '02',
    title: 'Test Order',
    desc: 'Select required diagnostic tests from our comprehensive catalog and generate an order.',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Payment',
    desc: 'Pay securely via mobile money, card, or cash at the counter before sample collection.',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Result Entry & Interpretation',
    desc: 'Lab technicians enter results which are automatically interpreted against clinical reference ranges.',
  },
  {
    icon: Bell,
    step: '05',
    title: 'Patient Notification',
    desc: 'Once results are submitted, the patient receives an SMS and email notification immediately.',
  },
];

const stats = [
  { value: '50,000+', label: 'Patients Served' },
  { value: '200+', label: 'Diagnostic Tests' },
  { value: '24hrs', label: 'Result Turnaround' },
  { value: '99.8%', label: 'Accuracy Rate' },
];

const features = [
  { icon: Shield, title: 'Accredited Laboratory', desc: 'ISO 15189 certified with rigorous quality control protocols.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Most results available within 24 hours of sample collection.' },
  { icon: Award, title: 'Expert Pathologists', desc: 'Results reviewed and validated by experienced clinical pathologists.' },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-lab-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80"
            alt="Laboratory equipment and diagnostics"
            width={1600}
            height={900}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-lab-navy via-lab-navy/90 to-lab-navy/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lab-teal/20 border border-lab-teal/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-lab-teal animate-pulse" />
              <span className="text-lab-teal text-xs font-semibold tracking-wider uppercase">Trusted Diagnostics Since 2010</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Precision Results.<br />
              <span className="text-lab-teal">Faster Care.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Mkaruka Diagnostic Laboratory delivers accurate, timely diagnostic results with seamless patient registration, test ordering, and automated result notifications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200"
              >
                Register a Patient
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/results"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
              >
                View Results
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="font-heading text-3xl font-bold text-lab-teal mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats mobile */}
      <section className="lg:hidden bg-lab-navy border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-heading text-2xl font-bold text-lab-teal">{s.value}</p>
              <p className="text-white/60 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-lab-teal text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-lab-navy mb-4">End-to-End Patient Journey</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From registration to result notification — every step is streamlined for efficiency and patient satisfaction.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-lab-teal/20 via-lab-teal/60 to-lab-teal/20" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-lab-teal/10 border border-lab-teal/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-lab-teal" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-lab-teal text-white text-xs font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lab-navy text-sm mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-lab-navy text-white font-semibold hover:bg-lab-navy/90 hover:scale-105 transition-all duration-200"
            >
              Start Registration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-lab-teal/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-lab-teal" />
                  </div>
                  <h3 className="font-heading font-bold text-lab-navy text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-lab-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">Register a patient today and experience seamless diagnostic services from order to result notification.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200"
              >
                Register Patient
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
