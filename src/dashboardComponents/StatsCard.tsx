import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  subLabel?: string;
  iconBg?: string;
  numberColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  number,
  label,
  subLabel,
  iconBg = "bg-gray-100",
  numberColor = "text-gray-900"
}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow">
      <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
      <div className="ml-4">
        <p className={`text-xl font-bold ${numberColor}`}>{number}</p>
        <p className="text-sm text-gray-600">{label}</p>
        {subLabel && <p className="text-xs text-gray-400">{subLabel}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
