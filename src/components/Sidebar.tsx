// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarCategory {
  id: string;
  label: string;
  href: string;
  hasSubmenu?: boolean;
  submenu?: { id: string; label: string; href: string; }[];
}

const categories: SidebarCategory[] = [
  { 
    id: 'mens-clothing', 
    label: "Men's Clothing", 
    href: '/category/mens-clothing',
    hasSubmenu: true,
    submenu: [
      { id: 'mens-shirts', label: 'Shirts', href: '/category/mens-shirts' },
      { id: 'mens-pants', label: 'Pants', href: '/category/mens-pants' },
      { id: 'mens-shoes', label: 'Shoes', href: '/category/mens-shoes' }
    ]
  },
  { 
    id: 'womens-clothing', 
    label: "Women's Clothing", 
    href: '/category/womens-clothing',
    hasSubmenu: true,
    submenu: [
      { id: 'womens-dresses', label: 'Dresses', href: '/category/womens-dresses' },
      { id: 'womens-tops', label: 'Tops', href: '/category/womens-tops' },
      { id: 'womens-shoes', label: 'Shoes', href: '/category/womens-shoes' }
    ]
  },
  { id: 'accessories', label: 'Accessories', href: '/category/accessories' },
  { id: 'shoes', label: 'Shoes', href: '/category/shoes' },
  { id: 'jewellery', label: 'Jewellery', href: '/category/jewellery' },
  { id: 'bags', label: 'Bags & Backpacks', href: '/category/bags' },
  { id: 'watches', label: 'Watches', href: '/category/watches' },
  { id: 'dresses', label: 'Dresses', href: '/category/dresses' },
  { id: 'shirts', label: 'Shirts', href: '/category/shirts' },
];

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Toggle button only visible on small screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-3 bg-yellow-500 text-white font-bold w-full text-left"
      >
        ☰ Shop by Categories
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 md:translate-x-0 md:static md:block z-50`}
      >
        {/* Header */}
        <div className="p-4 bg-yellow-500 flex items-center justify-between">
          <h2 className="font-bold text-white">SHOP BY CATEGORIES</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Categories */}
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className={`flex justify-between items-center px-4 py-3 text-sm 
              hover:text-yellow-600 transition-colors duration-200 ${
                isActive(category.href) ? 'text-yellow-600 font-semibold' : 'text-gray-700'
              }`}
              onClick={() => setIsSidebarOpen(false)} // auto-close on mobile click
            >
              {category.label}
              <span className="text-gray-400">›</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
