import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MessageSquare, Mail } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
  phone: string;
  email: string;
  type: 'registration' | 'results';
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open, onClose, patientName, phone, email, type,
}) => {
  const title = type === 'registration' ? 'Registration Confirmed' : 'Results Notification Sent';
  const message =
    type === 'registration'
      ? `A confirmation has been sent to ${patientName} via SMS and email.`
      : `${patientName} has been notified that their results are ready via SMS and email.`;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-lab-teal/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-lab-teal" />
              </div>
              <h2 className="font-heading text-xl font-bold text-lab-navy">{title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{message}</p>

              <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-lab-teal shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">SMS sent to</p>
                    <p className="text-sm font-medium text-gray-800">{phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lab-teal shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email sent to</p>
                    <p className="text-sm font-medium text-gray-800">{email}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-lab-teal text-white font-semibold hover:bg-lab-teal/90 hover:scale-105 transition-all duration-200"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
