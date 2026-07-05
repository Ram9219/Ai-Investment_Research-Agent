import { FiAlertTriangle, FiCpu, FiRadio, FiSearch, FiWifiOff } from 'react-icons/fi';

const variants = {
  network: {
    icon: FiWifiOff,
    cardClass: 'border-amber-500/20 bg-amber-500/10',
    iconClass: 'bg-amber-500/20 text-amber-300'
  },
  company: {
    icon: FiSearch,
    cardClass: 'border-sky-500/20 bg-sky-500/10',
    iconClass: 'bg-sky-500/20 text-sky-300'
  },
  ai: {
    icon: FiCpu,
    cardClass: 'border-violet-500/20 bg-violet-500/10',
    iconClass: 'bg-violet-500/20 text-violet-300'
  },
  news: {
    icon: FiRadio,
    cardClass: 'border-emerald-500/20 bg-emerald-500/10',
    iconClass: 'bg-emerald-500/20 text-emerald-300'
  },
  default: {
    icon: FiAlertTriangle,
    cardClass: 'border-red-500/20 bg-red-500/10',
    iconClass: 'bg-red-500/20 text-red-300'
  }
};

const ErrorCard = ({ message, title = 'Analysis unavailable', subtitle, variant = 'default' }) => {
  const config = variants[variant] || variants.default;
  const Icon = config.icon;

  return (
    <div className={`rounded-3xl border p-8 text-center shadow-soft ${config.cardClass}`} role="alert" aria-live="polite">
      <div className="mb-4 flex justify-center">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.iconClass}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{message}</p>
      {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
};

export default ErrorCard;
