import React from "react";

const TableListPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Table List
        </h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Jane Doe</td>
              <td className="px-4 py-2">Admin</td>
              <td className="px-4 py-2">Active</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">John Smith</td>
              <td className="px-4 py-2">User</td>
              <td className="px-4 py-2">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableListPage;
