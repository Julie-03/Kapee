import React, { useEffect, useState } from 'react';
import { LayoutDashboard, User, ShoppingCart, Users, Map, Bell,TrendingUp,AlertTriangle,UserCheck
} from 'lucide-react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom"
import { Notify } from "notiflix"
import { productService } from '../components/services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { Package, Calendar, DollarSign, Eye, Trash2, AlertCircle } from 'lucide-react';
// Stats Card Component

interface StatsCardProps {
  icon: any;             
  number: string | number;
  label: string;
  subLabel?: string; 
  iconBg?: string;      
  numberColor?: string;  
}


const StatsCard = ({
  icon: Icon,
  number,
  label,
  subLabel,
  iconBg,
  numberColor,
}: StatsCardProps) => {  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white mb-4`}>
            {Icon}
          </div>
          <div className={`text-2xl font-bold ${numberColor} mb-1`}>{number}</div>
          <div className="text-sm text-gray-600 mb-1">{label}</div>
          <div className="text-xs text-gray-400">{subLabel}</div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
interface ChartProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}             
const Chart = ({ title, subtitle, children }) => {
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

// Sales & Revenue Chart
const SalesRevenueChart = () => {
  const data = [
    { month: 'Jan', sales: 12500, revenue: 15600, orders: 150 },
    { month: 'Feb', sales: 15800, revenue: 19200, orders: 189 },
    { month: 'Mar', sales: 13200, revenue: 16800, orders: 164 },
    { month: 'Apr', sales: 18900, revenue: 22400, orders: 220 },
    { month: 'May', sales: 22100, revenue: 26800, orders: 267 },
    { month: 'Jun', sales: 19600, revenue: 23200, orders: 196 },
    { month: 'Jul', sales: 25300, revenue: 29800, orders: 298 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Sales']}
        />
        <Legend />
        <Area type="monotone" dataKey="sales" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
        <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// User Registration Growth
const UserGrowthChart = () => {
  const data = [
    { week: 'W1', newUsers: 45, totalUsers: 1245 },
    { week: 'W2', newUsers: 67, totalUsers: 1312 },
    { week: 'W3', newUsers: 52, totalUsers: 1364 },
    { week: 'W4', newUsers: 89, totalUsers: 1453 },
    { week: 'W5', newUsers: 73, totalUsers: 1526 },
    { week: 'W6', newUsers: 95, totalUsers: 1621 },
    { week: 'W7', newUsers: 112, totalUsers: 1733 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="week" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value, name) => [value, name === 'newUsers' ? 'New Users' : 'Total Users']}
        />
        <Legend />
        <Line type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
        <Line type="monotone" dataKey="totalUsers" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Product Categories Performance
const CategoryChart = () => {
  const data = [
    { category: 'Electronics', sales: 45000, stock: 230, color: '#3b82f6' },
    { category: 'Clothing', sales: 32000, stock: 450, color: '#10b981' },
    { category: 'Home & Garden', sales: 28000, stock: 180, color: '#f59e0b' },
    { category: 'Sports', sales: 19000, stock: 120, color: '#ef4444' },
    { category: 'Books', sales: 15000, stock: 340, color: '#8b5cf6' },
    { category: 'Beauty', sales: 22000, stock: 200, color: '#06b6d4' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="category" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value, name) => [
            name === 'sales' ? `$${value.toLocaleString()}` : `${value} items`,
            name === 'sales' ? 'Sales' : 'Stock'
          ]}
        />
        <Legend />
        <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Order Status Distribution
const OrderStatusChart = () => {
  const data = [
    { name: 'Completed', value: 65, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Processing', value: 12, color: '#3b82f6' },
    { name: 'Cancelled', value: 3, color: '#ef4444' },
  ];

  return (
    <div className="flex justify-center">
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={100}
            innerRadius={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => [`${value}%`, 'Orders']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Low Stock Alert Chart
const LowStockChart = () => {
  const data = [
    { product: 'iPhone 15', stock: 5, threshold: 20, status: 'Critical' },
    { product: 'Samsung TV', stock: 12, threshold: 25, status: 'Low' },
    { product: 'Nike Shoes', stock: 8, threshold: 30, status: 'Critical' },
    { product: 'MacBook Pro', stock: 18, threshold: 20, status: 'Low' },
    { product: 'AirPods', stock: 3, threshold: 15, status: 'Critical' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" stroke="#666" />
        <YAxis dataKey="product" type="category" stroke="#666" fontSize={12} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value, name) => [
            `${value} units`,
            name === 'stock' ? 'Current Stock' : 'Threshold'
          ]}
        />
        <Legend />
        <Bar dataKey="threshold" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
        <Bar dataKey="stock" fill="#ef4444" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Top Products Chart
const TopProductsChart = () => {
  const data = [
    { product: 'iPhone 15 Pro', sales: 156, revenue: 156000 },
    { product: 'Samsung Galaxy S24', sales: 134, revenue: 120600 },
    { product: 'MacBook Air M3', sales: 89, revenue: 106800 },
    { product: 'AirPods Pro', sales: 245, revenue: 61250 },
    { product: 'iPad Pro', sales: 67, revenue: 80400 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="product" 
          stroke="#666" 
          fontSize={11}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value, name) => [
            name === 'sales' ? `${value} units` : `$${value.toLocaleString()}`,
            name === 'sales' ? 'Units Sold' : 'Revenue'
          ]}
        />
        <Legend />
        <Bar dataKey="sales" fill="#06b6d4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
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
              <label className=" block text-sm font-medium text-gray-700 mb-2">Company (disabled)</label>
              <input type="text" value="Creative Code Inc." disabled className="text-black w-full p-3 border border-gray-300 rounded-lg bg-white" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input type="text" defaultValue="michael23" className="bg-white text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input type="email" defaultValue="mike@email.com" className="bg-white text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input type="text" defaultValue="Mike" className="bg-white text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input type="text" defaultValue="Andrew" className="bg-white text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" className="bg-white text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
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

// Products page
// Replace your existing TableListPage component with this:
const TableListPage = () => {
  // Updated interface to match your MongoDB schema
  interface Product {
    _id?: string;
    id?: string | number; 
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    category?: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: ""
  });

  // Load products from database
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getAllProducts();
      // Add local IDs for React keys
      const productsWithIds = fetchedProducts.map((product: Product, index: number) => ({
        ...product,
        id: product._id || Date.now() + index
      }));
      setProducts(productsWithIds);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load products from database');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.description.trim()) return;

    try {
      const productData = {
        name: newProduct.name.trim(),
        price: parseFloat(newProduct.price) || 0,
        description: newProduct.description.trim(),
        imageUrl: newProduct.imageUrl.trim() || '/placeholder-image.jpg',
        category: newProduct.category.trim() || 'General'
      };

      if (editingProduct && editingProduct._id) {
        // Update existing product
        await productService.updateProduct(editingProduct._id, productData);
        alert('Product updated successfully!');
      } else {
        // Create new product
        await productService.createProduct(productData);
        alert('Product added successfully!');
      }

      // Reload products and reset form
      await loadProducts();
      setNewProduct({ name: "", price: "", description: "", imageUrl: "", category: "" });
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product to database');
    }
  };

  const removeProduct = async (product: Product) => {
    if (!product._id) return;

    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await productService.deleteProduct(product._id);
      await loadProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error removing product:', error);
      alert('Failed to remove product from database.');
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      imageUrl: product.imageUrl || "",
      category: product.category || ""
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", description: "", imageUrl: "", category: "" });
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
       <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowForm(s => !s)}
            className="flex items-center gap-3 bg-gradient-to-r bg-gray-200 text-black px-4 py-2 rounded-full shadow-lg hover:scale-105 transform transition"
            aria-expanded={showForm}
          >
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white text-black text-sm">+</span>
            <span className="text-sm font-medium">
              {editingProduct ? 'Edit product' : 'Add product'}
            </span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={addProduct} className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product name"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              required
            />
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price (e.g. 19.99)"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              required
            />
            <input
              value={newProduct.description}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              required
            />
            <input
              value={newProduct.category}
              onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="Category (optional)"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            />
            <input
              value={newProduct.imageUrl}
              onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              placeholder="Image URL (optional)"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black md:col-span-2"
            />
          </div>
         <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              {editingProduct ? 'Update product' : 'Save product'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-black bg-white shadow hover:underline px-4 py-2 rounded border"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id || product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => editProduct(product)}
                      className="px-3 py-1 mr-2 bg-blue-100 text-blue-800 text-sm rounded-md hover:bg-blue-200 transition"
                      aria-label={`Edit ${product.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(product)}
                      className="px-3 py-1 mr-2 bg-red-100 text-red-800 text-sm rounded-md hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No products yet — add one using the button above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
// Clients Component
// Updated Clients Component
const Clients = () => {
  interface Client {
    _id: string;
    username: string;
    email: string;
    userRole: string;
    createdAt?: string;
    updatedAt?: string;
  }

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients from your database
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:7000/api_v1/user/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched users data:', data); // Debug log
        
        // Handle the response structure - your controller returns { users: [...] }
        if (data.users && Array.isArray(data.users)) {
          setClients(data.users);
        } else {
          console.error('Unexpected data structure:', data);
          setError('Invalid data structure received from server');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to fetch clients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Clients</h3>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading clients...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Clients</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600 font-medium">Error</div>
          <div className="text-red-500 text-sm">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Clients ({clients.length})
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage registered users and their roles
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        client.userRole === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {client.userRole}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.createdAt 
                        ? new Date(client.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md hover:bg-blue-200 transition-colors"
                          onClick={() => console.log('View client:', client._id)}
                        >
                          View
                        </button>
                        <button 
                          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition-colors"
                          onClick={() => console.log('Edit client:', client._id)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No clients found. Users who register will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary footer */}
        {clients.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                Total: {clients.length} clients
              </div>
              <div>
                Admins: {clients.filter(c => c.userRole === 'admin').length} | 
                Users: {clients.filter(c => c.userRole === 'user').length}
              </div>
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};
// Orders Component
interface OrderItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    category?: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Order Service
const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response = await fetch('http://localhost:7000/order');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse<Order[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  createOrderFromCart: async (): Promise<Order> => {
    try {
      const response = await fetch('http://localhost:7000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse<Order> = await response.json();
      if (!result.data) {
        throw new Error('Failed to create order');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:7000/order/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};

// Order Details Modal Component
const OrderDetailsModal: React.FC<{
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.productId.name}</h4>
                    <p className="text-sm text-gray-600">{item.productId.description}</p>
                    <p className="text-sm text-gray-500">Category: {item.productId.category || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.productId.price.toFixed(2)} × {item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      Subtotal: ${(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Orders Component
const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await orderService.getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders from database');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrderFromCart = async () => {
    try {
      await orderService.createOrderFromCart();
      alert('Order created successfully from cart!');
      await loadOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error instanceof Error ? error.message : 'Failed to create order');
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!window.confirm(`Are you sure you want to cancel order ${order._id}?`)) {
      return;
    }

    try {
      await orderService.deleteOrder(order._id);
      alert('Order cancelled successfully!');
      await loadOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to cancel order');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (createdAt: string) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff < 1) return { status: 'Processing', color: 'bg-blue-100 text-blue-800' };
    if (hoursDiff < 24) return { status: 'Shipped', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Delivered', color: 'bg-green-100 text-green-800' };
  };

  // Safe function to get product display name
  const getProductDisplayName = (item: OrderItem): string => {
    if (!item.productId) return 'Product Unavailable';
    return item.productId.name || 'Unnamed Product';
  };

  // Safe function to calculate total revenue
  const calculateTotalRevenue = (): number => {
    return orders.reduce((sum, order) => {
      if (typeof order.totalPrice === 'number') {
        return sum + order.totalPrice;
      }
      return sum;
    }, 0);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <div className="text-red-600 font-medium">Error</div>
          </div>
          <div className="text-red-500 text-sm mt-1">{error}</div>
          <button 
            onClick={loadOrders}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        
        </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            All Orders ({orders.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const { status, color } = getOrderStatus(order.createdAt);
                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order._id ? order._id.slice(-8) + '...' : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items ? order.items.length : 0} item(s)
                        <div className="text-xs text-gray-400">
                          {order.items && order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx}>
                              {getProductDisplayName(item)} (×{item.quantity || 0})
                            </div>
                          ))}
                          {order.items && order.items.length > 2 && (
                            <div>+{order.items.length - 2} more...</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt ? formatDate(order.createdAt) : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order)}
                            className="flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-md hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center">
                      <Package className="h-12 w-12 text-gray-300 mb-2" />
                      <p>No orders found.</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Orders will appear here once customers make purchases.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
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
          subLabel="Get more info"
          iconBg="bg-yellow-500"
          numberColor="text-gray-800"
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />} 
          number="$ 1,345" 
          label="Last day"
          subLabel="Last day's earnings"
          iconBg="bg-yellow-500"
          numberColor="text-gray-800"
        />
        <StatsCard 
          icon={<AlertTriangle className="w-6 h-6" />} 
          number="23" 
          label="In the last hour" 
          subLabel="Last Campaign Performance"
          iconBg="bg-yellow-500"
          numberColor="text-gray-800"
        />
        <StatsCard 
          icon={<UserCheck className="w-6 h-6" />} 
          number="23" 
          label="Users" 
          subLabel="Updated now"
          iconBg="bg-yellow-500"
          numberColor="text-gray-800"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Chart title="Sales & Revenue Trend" subtitle="Monthly performance overview">
          <SalesRevenueChart />
        </Chart>
        
        <Chart title="User Growth" subtitle="New registrations and total user base">
          <UserGrowthChart />
        </Chart>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Chart title="Category Performance" subtitle="Sales by product category">
          <CategoryChart />
        </Chart>
        
        <Chart title="Order Status Distribution" subtitle="Current order breakdown">
          <OrderStatusChart />
        </Chart>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Chart title="Low Stock Alert" subtitle="Products requiring attention">
          <LowStockChart />
        </Chart>
        
        <Chart title="Top Selling Products" subtitle="Best performers this month">
          <TopProductsChart />
        </Chart>
      </div>
    </div>
  );
};

     
// Main Dashboard Component with Outlet functionality
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const { logout, isAuthenticated, user, loading } = useAuth();

useEffect(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode) setIsDarkMode(savedDarkMode === 'true');
}, []);

  useEffect(() => {
    if (loading) return;
    
    console.log('Dashboard auth check:', { isAuthenticated, user, loading });
    
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to home');
      navigate("/");
      return;
    }
    
    // Check if user is admin
    const userRole = user?.role || user?.userRole;
    console.log('User role:', userRole);

    if (userRole !== 'admin') {
      console.log('Not admin, redirecting to home');
      Notify.failure("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }
  console.log('Admin access confirmed');
  }, [isAuthenticated, user, navigate, loading]);

const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const handleLogout = () => {
    try {
      logout();

      Notify.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      Notify.failure("Error during logout");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const recentOrders = [
  { id: 'OR-1001', customer: 'John Doe', product: 'T-Shirt', amount: '$29.99', status: 'Completed' },
  { id: 'OR-1002', customer: 'Jane Smith', product: 'Sneakers', amount: '$89.00', status: 'Processing' },
  { id: 'OR-1003', customer: 'Bob Johnson', product: 'Hat', amount: '$15.50', status: 'Shipped' },
];

  const renderOutlet = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'profile':
        return <UserProfilePage />;
      case 'tables':
        return <TableListPage />;
      case 'clients': 
        return <Clients />;  
      case 'Orders':
        return <OrdersPage />;
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Completed" ? "bg-green-100 text-green-800" :
                            order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };


  return (
<div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>      {/* Sidebar */}
<div className={`w-64 fixed h-full overflow-y-auto z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>        <div className="p-6 border-b border-gray-900">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentPage('dashboard')}
          >
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
<span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>KAPEE</span>          </div>
        </div>
        
        <nav className="py-4">
          {[
            { icon: <LayoutDashboard className="text-black w-5 h-5" />, label: <span className="text-black">Dashboard</span>, key: 'dashboard' },
            { icon: <Package className="text-black w-5 h-5" />, label: <span className="text-black">Products</span>, key: 'tables' },
            { icon: <ShoppingCart className="text-black w-5 h-5" />, label: <span className="text-black">Orders</span>, key: 'Orders' },
            { icon: <Users className="text-black w-5 h-5" />, label: <span className="text-black">Clients</span>, key: 'clients' },
            { icon: <User className="text-black w-5 h-5" />, label: <span className="text-black">User Profile</span>, key: 'profile' },

          ].map((item) => (
            <div
              key={item.key}
              
              onClick={() => setCurrentPage(item.key)}
              
              className={`px-6 py-3 cursor-pointer transition-all duration-200 flex items-center space-x-3 ${
  currentPage === item.key
    ? `${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} border-r-4 border-yellow-500`
    : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
}`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-xs text-black text-center">
            <p>© 2024 Dashboard</p>
            <p className="text-grey-900 font-medium">Kapee</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* NavBar */}
<div className={`px-6 py-4 shadow-sm border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>          <div className="flex justify-between items-center">
            <div>
<h1 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1>
            </div>
            <div className="flex items-center space-x-6">
<div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-600'}`}>
    {isDarkMode ? '☀️' : '🌙'}
  </button>
                <span className="cursor-pointer hover:text-gray-700 transition-colors"onClick={handleLogout}>Log out</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
            </div>
          </div>
        </div>

        {/* Outlet Content */}
        {renderOutlet()}
      </div>
    </div>
  );
  
};export default Dashboard;
