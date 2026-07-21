import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface ResultItem {
  test: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

interface ResultInterpretationProps {
  results: ResultItem[];
  summary: string;
}

const statusConfig = {
  normal: { label: 'Normal', className: 'text-green-600 bg-green-50 border-green-200', icon: Minus },
  high: { label: 'High', className: 'text-amber-600 bg-amber-50 border-amber-200', icon: TrendingUp },
  low: { label: 'Low', className: 'text-blue-600 bg-blue-50 border-blue-200', icon: TrendingDown },
  critical: { label: 'Critical', className: 'text-red-600 bg-red-50 border-red-200', icon: AlertTriangle },
};

const ResultInterpretation: React.FC<ResultInterpretationProps> = ({ results, summary }) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Test</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Result</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Reference Range</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((r, i) => {
              const cfg = statusConfig[r.status];
              const Icon = cfg.icon;
              return (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium text-lab-navy">{r.test}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-gray-800">{r.value} <span className="text-gray-400 font-normal">{r.unit}</span></td>
                  <td className="px-4 py-3 text-gray-500">{r.referenceRange}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}>
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-lab-navy/5 border border-lab-navy/10 rounded-xl p-5">
        <h4 className="font-heading font-semibold text-lab-navy text-sm mb-2">Clinical Interpretation</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        <p className="text-xs text-gray-400 mt-3 italic">This interpretation is auto-generated based on reference ranges. Please consult a qualified physician for clinical decisions.</p>
      </div>
    </div>
  );
};

export default ResultInterpretation;