import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";

const statusMap = {
  Open: {
    icon: AlertCircle,
    color: "bg-amber-100 text-amber-700",
  },
  "In Progress": {
    icon: Loader2,
    color: "bg-blue-100 text-blue-700",
    spin: true,
  },
  Closed: {
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-700",
  },
  Resolved: {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
  },
  "On Hold": {
    icon: Clock,
    color: "bg-orange-100 text-orange-700",
  },
  Cancelled: {
    icon: XCircle,
    color: "bg-red-100 text-red-700",
  },
};

function StatusBadge({ status }) {
  const config = statusMap[status] || {
    icon: AlertCircle,
    color: "bg-slate-100 text-slate-700",
  };

  const Icon = config.icon;

  return (
    <div
      className={`
      inline-flex items-center gap-2
      px-3 py-1.5
      rounded-full
      text-xs
      font-semibold
      ${config.color}
    `}
    >
      <Icon
        size={14}
        className={config.spin ? "animate-spin" : ""}
      />
      {status}
    </div>
  );
}

export default StatusBadge;