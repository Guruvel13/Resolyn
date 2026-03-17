import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, trend, trendType, description, icon }: StatCardProps) {
  return (
    <div className="card-paper p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-slate-900 font-outfit">{value}</h3>
        </div>
        {icon && (
          <div className="p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {trend && (
          <div className={cn(
            "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold",
            trendType === 'up' ? "bg-emerald-50 text-emerald-600" : 
            trendType === 'down' ? "bg-rose-50 text-rose-600" : 
            "bg-slate-50 text-slate-600"
          )}>
            {trendType === 'up' && <TrendingUp size={10} />}
            {trendType === 'down' && <TrendingDown size={10} />}
            {trend}
          </div>
        )}
        {description && <p className="text-[11px] text-slate-500 font-medium">{description}</p>}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
