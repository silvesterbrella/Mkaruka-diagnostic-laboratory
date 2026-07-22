import React from 'react';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const config: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending Payment', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  paid: { label: 'Paid', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  collected: { label: 'Sample Collected', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  'in-transit': { label: 'In Transit', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  received: { label: 'Lab Received', className: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  processing: { label: 'Processing', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  ready: { label: 'Results Ready', className: 'bg-lab-teal/10 text-lab-teal border-lab-teal/30' },
  notified: { label: 'Patient Notified', className: 'bg-green-100 text-green-700 border-green-200' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { label, className } = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
