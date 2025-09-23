import React from "react";

const PieChart = () => {
  return (
    <div className="h-64 flex items-center justify-center relative">
      <svg className="w-48 h-48" viewBox="0 0 32 32">
        <circle r="16" cx="16" cy="16" fill="#f3f4f6" />
        <circle
          r="16"
          cx="16"
          cy="16"
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="32"
          strokeDasharray="25 75"
          transform="rotate(-90) translate(-32)"
        />
        <circle
          r="16"
          cx="16"
          cy="16"
          fill="transparent"
          stroke="#10b981"
          strokeWidth="32"
          strokeDasharray="15 85"
          transform="rotate(-180) translate(-32)"
        />
        <circle
          r="16"
          cx="16"
          cy="16"
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth="32"
          strokeDasharray="35 65"
          transform="rotate(-240) translate(-32)"
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-2xl font-bold text-gray-800">65%</div>
        <div className="text-sm text-gray-500">Efficiency</div>
      </div>
    </div>
  );
};

export default PieChart;
