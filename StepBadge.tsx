import React from 'react';

interface StepBadgeProps {
  step: number;
  label: string;
  active?: boolean;
  completed?: boolean;
}

const StepBadge: React.FC<StepBadgeProps> = ({ step, label, active, completed }) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          completed
            ? 'bg-lab-teal text-white'
            : active
            ? 'bg-lab-teal/20 border-2 border-lab-teal text-lab-teal'
            : 'bg-white/10 border-2 border-white/20 text-white/40'
        }`}
      >
        {completed ? '✓' : step}
      </div>
      <span className={`text-xs font-medium transition-colors duration-300 ${active || completed ? 'text-lab-teal' : 'text-white/40'}`}>
        {label}
      </span>
    </div>
  );
};

export default StepBadge;