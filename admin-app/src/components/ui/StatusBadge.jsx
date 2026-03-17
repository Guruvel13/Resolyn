import clsx from 'clsx';

export default function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-[rgba(255,170,0,0.1)] text-[#ffaa00] border-[#ffaa00]',
    active: 'bg-[rgba(0,255,204,0.1)] text-[#00ffcc] border-[#00ffcc]',
    resolved: 'bg-[rgba(244,244,245,0.05)] text-zinc-400 border-zinc-600',
    escalated: 'bg-[rgba(255,0,85,0.1)] text-[#ff0055] border-[#ff0055] animate-pulse',
  };

  const normalizedStatus = status.toLowerCase();
  
  return (
    <span className={clsx(
      'px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider border rounded-sm shrink-0',
      styles[normalizedStatus] || styles.pending
    )}>
      {status}
    </span>
  );
}
