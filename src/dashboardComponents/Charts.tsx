import React from "react";

interface ChartProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Chart: React.FC<ChartProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default Chart;
