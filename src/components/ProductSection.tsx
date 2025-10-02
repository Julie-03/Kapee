// src/components/ProductSection.tsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Modal from './Modal';
import ProductDetails from './ProductDetails';
import { productService } from './services/apiService';
import type { BackendProduct } from './services/apiService';

interface ProductSectionProps {
  title: string;
  filter?: (product: BackendProduct) => boolean; // optional filter
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, filter }) => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<BackendProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await productService.getAllProducts();
        setProducts(filter ? allProducts.filter(filter) : allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              _id: String(product._id),        
    mongoId: String(product._id),   
    name: product.name,
    title: product.name,           
    price: product.price,
    image: product.imageUrl || '',  
    description: product.description,
    category: product.category || 'Uncategorized', 
    inStock: true,
    isOnSale: false,             
            }}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-200">
          View All {title}
        </button>
      </div>

      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)} ariaLabel="Product Details">
          <ProductDetails product={selectedProduct} />
        </Modal>
      )}
    </section>
  );
};

export default ProductSection;