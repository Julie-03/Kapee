import React from "react";

const salesData = [
  { name: "Product A", sales: 1200 },
  { name: "Product B", sales: 850 },
  { name: "Product C", sales: 400 },
];

const Sales = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales</h3>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-400 uppercase">
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 font-medium text-gray-700">
                {item.name}
              </td>
              <td className="px-4 py-2">{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
