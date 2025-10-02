// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productSections } from '../data/sampleData';

interface OutletContext {
  handleAddToCart: (productId: string) => void;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { handleAddToCart } = useOutletContext<OutletContext>();

  // Get products for this category (for demo, we'll use all products)
  const allProducts = productSections.flatMap(section => section.products);
  
  // Format category name for display
  const categoryName = category?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Products';

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryName}
        </h1>
        <div className="w-24 h-1 bg-yellow-500"></div>
        <p className="text-gray-600 mt-4">
          Showing {allProducts.length} products in {categoryName}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Rating</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Price:</label>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>All Prices</option>
              <option>Under $50</option>
              <option>$50 - $100</option>
              <option>$100 - $200</option>
              <option>Over $200</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="inStock" 
              className="text-yellow-500 focus:ring-yellow-500"
            />
            <label htmlFor="inStock" className="text-sm text-gray-700">In Stock Only</label>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="onSale" 
              className="text-yellow-500 focus:ring-yellow-500"
            />
            <label htmlFor="onSale" className="text-sm text-gray-700">On Sale</label>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-yellow-500 text-white px-8 py-3 rounded hover:bg-yellow-600 transition-colors duration-200">
          Load More Products
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;