import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, MapPin, ChevronDown, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotificationModal from '../components/NotificationModal';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(5, 'Address is required'),
  emergencyContact: z.string().min(10, 'Emergency contact required'),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [formData, setFormData] = useState<FormData | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    const id = `MKL-${Date.now().toString().slice(-6)}`;
    setPatientId(id);
    setFormData(data);
    setSubmitted(true);
    setModalOpen(true);
    toast.success('Patient registered successfully!');
  };

  if (submitted && formData) {
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
              <h1 className="font-heading text-2xl font-bold text-lab-navy mb-2">Registration Complete</h1>
              <p className="text-gray-500 mb-6">Patient has been successfully registered in the system.</p>

              <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Patient ID</span>
                  <span className="font-mono font-bold text-lab-teal">{patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Name</span>
                  <span className="font-semibold text-lab-navy">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Phone</span>
                  <span className="text-gray-700">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Email</span>
                  <span className="text-gray-700">{formData.email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/orders"
                  className="px-6 py-3 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200"
                >
                  Order Tests
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Register Another
                </button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
        <NotificationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          patientName={`${formData.firstName} ${formData.lastName}`}
          phone={formData.phone}
          email={formData.email}
          type="registration"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <p className="text-lab-teal text-sm font-semibold uppercase tracking-widest mb-2">Step 1 of 4</p>
              <h1 className="font-heading text-3xl font-bold text-lab-navy mb-2">Patient Registration</h1>
              <p className="text-gray-500">Fill in the patient's details. A confirmation will be sent via SMS and email upon registration.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div>
                <h2 className="font-heading font-semibold text-lab-navy text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        {...register('firstName')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        {...register('lastName')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date of Birth *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Gender *</label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select
                        {...register('gender')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200 appearance-none bg-white"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Blood Group</label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select
                        {...register('bloodGroup')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200 appearance-none bg-white"
                      >
                        <option value="">Unknown</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Known Allergies</label>
                    <input
                      {...register('allergies')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                      placeholder="None"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-semibold text-lab-navy text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                        placeholder="+255 7XX XXX XXX"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                        placeholder="patient@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        {...register('address')}
                        rows={2}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200 resize-none"
                        placeholder="Street, City, Region"
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Emergency Contact *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        {...register('emergencyContact')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lab-teal/50 transition-all duration-200"
                        placeholder="+255 7XX XXX XXX"
                      />
                    </div>
                    {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.message}</p>}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Patient & Send Confirmation'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">Patient will receive SMS and email confirmation upon registration.</p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;