import { FiAlertTriangle } from 'react-icons/fi';

const ErrorCard = ({ message, title = 'Analysis unavailable', subtitle }) => {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-soft">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20">
          <FiAlertTriangle className="text-2xl text-red-300" />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{message}</p>
      {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
};

export default ErrorCard;
