import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  color = "blue",
}) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    emerald: "from-emerald-500 to-green-600",
    orange: "from-orange-500 to-amber-600",
    red: "from-red-500 to-rose-600",
    purple: "from-purple-500 to-fuchsia-600",
  };

  const gradient = colors[color] || colors.blue;

  const isPositive = trend > 0;
  const isNeutral = trend === 0 || trend === undefined;

  const TrendIcon = isNeutral
    ? Minus
    : isPositive
    ? TrendingUp
    : TrendingDown;

  return (
    <div
      className="
      relative overflow-hidden
      rounded-3xl
      bg-white
      border border-slate-200
      p-6
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
    "
    >
      <div
        className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient}`}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${gradient}
          text-white flex items-center justify-center shadow-lg`}
        >
          {icon}
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-6 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              isNeutral
                ? "bg-slate-100 text-slate-500"
                : isPositive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <TrendIcon size={12} />
            {Math.abs(trend)}%
          </span>

          <span className="text-xs text-slate-500">
            {trendLabel}
          </span>
        </div>
      )}

      <div
        className="
        absolute
        -bottom-10
        -right-10
        h-32
        w-32
        rounded-full
        bg-slate-50
      "
      />
    </div>
  );
}

export default StatCard;