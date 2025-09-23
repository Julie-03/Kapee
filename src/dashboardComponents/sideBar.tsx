import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Package, 
  ShoppingCart, 
  Users, 
  Map, 
  Bell,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

// Stats Card Component
interface StatsCardProps {
  icon: React.ReactNode; // Define icon as ReactNode to allow any valid React element
  number: string; // Define number as a string
  label: string; // Define label as a string
  subLabel?: string; // Make subLabel optional
  iconBg?: string; // Make iconBg optional
  numberColor?: string;
}
const StatsCard: React.FC<StatsCardProps> = ({ icon, number, label, subLabel, iconBg, numberColor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${iconBg || 'bg-gradient-to-r from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center text-white shadow-lg`}>
            {icon || <TrendingUp className="w-6 h-6" />}
          </div>
          <div>
            <div className={`text-2xl font-bold ${numberColor || 'text-gray-800'}`}>{number}</div>
            <div className="text-gray-500 text-sm font-medium">{label}</div>
          </div>
        </div>
        {subLabel && (
          <div className="text-right">
            <div className="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-lg">{subLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
};



// Line Chart Component
const LineChart = () => {
  return (
    <div className="h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Lines */}
        <polyline
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          points="20,160 60,140 100,130 140,120 180,110 220,100 260,95 300,90 340,85 380,80"
        />
        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          points="20,180 60,170 100,175 140,165 180,155 220,150 260,145 300,140 340,135 380,130"
        />
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          points="20,170 60,165 100,160 140,155 180,150 220,145 260,140 300,135 340,130 380,125"
        />
      </svg>
      
      {/* Legend */}
      <div className="flex items-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span className="text-gray-600">Open</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-gray-600">Click</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Click Second Time</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-2">
        Campaign sent 2 days ago
      </div>
    </div>
  );
};

// Pie Chart Component
const PieChart = () => {
  const data = [
    { label: 'Open', value: 62, color: '#06b6d4' },
    { label: 'Bounce', value: 32, color: '#f59e0b' },
    { label: 'Unsubscribe', value: 6, color: '#ef4444' }
  ];
  
  let cumulativePercentage = 0;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  return (
    <div className="h-64 flex items-center justify-center relative">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = item.value;
            const startAngle = cumulativePercentage * 3.6 - 90;
            const endAngle = (cumulativePercentage + percentage) * 3.6 - 90;
            
            const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
            const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
            const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
            const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
            
            const largeArc = percentage > 50 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            cumulativePercentage += percentage;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-6 text-xs text-gray-400">
        Campaign sent 2 days ago
      </div>
    </div>
  );
};

// Tasks Component
const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Sign contract for \"What are conference organizers afraid of?\"", completed: true },
    { id: 2, text: "Lines From Great Russian Literature? Or E-mails From My Boss?", completed: false },
    { id: 3, text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit", completed: false },
    { id: 4, text: "Create 4 Invisible User Experiences you Never Knew About", completed: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
        <p className="text-sm text-gray-500">Backend development</p>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sales Component
const Sales = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6">
      
      </div>
   
  );
};

// User Profile Page
const UserProfilePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Company (disabled)</label>
              <input type="text" value="Creative Code Inc." disabled className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input type="text" defaultValue="michael23" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input type="email" defaultValue="mike@email.com" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input type="text" defaultValue="Mike" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input type="text" defaultValue="Andrew" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Table List Page
const TableListPage = () => {
  const tableData = [
    { id: 1, name: "Dakota Rice", country: "Niger", city: "Oud-Turnhout", salary: "$36,738" },
    { id: 2, name: "Minerva Hooper", country: "Curaçao", city: "Sinaai-Waas", salary: "$23,789" },
    { id: 3, name: "Sage Rodriguez", country: "Netherlands", city: "Baileux", salary: "$56,142" },
    { id: 4, name: "Philip Chaney", country: "Korea, South", city: "Overland Park", salary: "$38,735" },
    { id: 5, name: "Doris Greene", country: "Malawi", city: "Feldkirchen in Kärnten", salary: "$63,542" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Simple Table</h2>
          <p className="text-gray-500">Here is a subtitle for this table</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.salary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          icon={<Package className="w-6 h-6" />} 
          number="150" 
          label="Pending orders" 
          subLabel="Get more info" // Ensure this is provided
          iconBg="bg-gradient-to-r from-orange-500 to-orange-600"
          numberColor="text-gray-800"
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />} 
          number="$ 1,345" 
          label="Last day"
          subLabel="Last day's earnings" // Add subLabel here
          iconBg="bg-gradient-to-r from-green-500 to-green-600"
          numberColor="text-gray-800"
        />
        <StatsCard 
          icon={<AlertTriangle className="w-6 h-6" />} 
          number="23" 
          label="In the last hour" 
          subLabel="Last Campaign Performance" // Ensure this is provided
          iconBg="bg-gradient-to-r from-red-500 to-red-600"
          numberColor="text-gray-800"
        />
        <StatsCard 
          icon={<UserCheck className="w-6 h-6" />} 
          number="23" 
          label="Users" 
          subLabel="Updated now" // Ensure this is provided
          iconBg="bg-gradient-to-r from-blue-500 to-blue-600"
          numberColor="text-gray-800"
        />
      </div>
      {/* Other content... */}
    </div>
  );
};

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tasks />
        <Sales />
      </div>
// Main Dashboard Component with Outlet functionality
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // This simulates an outlet - in a real app you'd use React Router's <Outlet />
  const renderOutlet = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'profile':
        return <UserProfilePage />;
      case 'tables':
        return <TableListPage />;
      default:
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Under Construction</h2>
              <p className="text-gray-500">The {currentPage} page is currently being developed.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white fixed h-full overflow-y-auto z-10">
        <div className="p-6 border-b border-gray-700">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentPage('dashboard')}
          >
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-lg font-medium text-gray-200">KAPEE</span>
          </div>
        </div>
        
        <nav className="py-4">
          {[
            { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', key: 'dashboard' },
            { icon: <User className="w-5 h-5" />, label: 'User Profile', key: 'profile' },
            { icon: <Package className="w-5 h-5" />, label: 'Products', key: 'tables' },
            { icon: <ShoppingCart className="w-5 h-5" />, label: 'Orders', key: 'typography' },
            { icon: <Users className="w-5 h-5" />, label: 'Clients', key: 'icons' },
            { icon: <Map className="w-5 h-5" />, label: 'Maps', key: 'maps' },
            { icon: <Bell className="w-5 h-5" />, label: 'Notifications', key: 'notifications' }
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              className={`px-6 py-3 cursor-pointer transition-all duration-200 flex items-center space-x-3 ${
                currentPage === item.key
                  ? 'bg-gray-800 border-r-4 border-teal-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 text-center">
            <p>© 2024 Dashboard</p>
            <p className="text-teal-400 font-medium">Kapee</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* NavBar */}
        

        {/* Outlet Content */}
        {renderOutlet()}
      </div>
    </div>
  );
};

export default Dashboard;