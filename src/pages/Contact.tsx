import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+255 700 000 000', href: 'tel:+255700000000' },
  { icon: Mail, label: 'Email', value: 'info@mkarukalab.co.tz', href: 'mailto:info@mkarukalab.co.tz' },
  { icon: MapPin, label: 'Address', value: '123 Health Avenue, Arusha, Tanzania', href: '#' },
  { icon: Clock, label: 'Hours', value: 'Sun–Fri: 7:00 AM – 6:00 PM', href: '#' },
];

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We will get back to you shortly.');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-lab-teal text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-lab-navy mb-4">Contact Us</h1>
            <p className="text-gray-500 max-w-lg mx-auto">Have questions about our services? Reach out and our team will respond promptly.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-lab-teal/10 flex items-center justify-center shrink-0 group-hover:bg-lab-teal/20 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-lab-teal" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}

              <div className="bg-lab-navy rounded-xl p-6 mt-4">
                <h3 className="font-heading font-bold text-white mb-2">Emergency Line</h3>
                <p className="text-white/60 text-sm mb-3">For urgent diagnostic needs, call our 24/7 emergency line.</p>
                <a href="tel:+255700000001" className="text-lab-teal font-semibold text-lg">+255 700 000 001</a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
            >
              <h2 className="font-heading font-bold text-lab-navy text-xl mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
                  <input
                    {...register('subject')}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Describe your inquiry..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200 resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
