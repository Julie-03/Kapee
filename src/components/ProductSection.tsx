// src/components/ProductSection.tsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Modal from './Modal';
import ProductDetails from './ProductDetails';
import type { ProductSection as ProductSectionType, Product } from '../types/index';

interface ProductSectionProps {
    section: ProductSectionType;
    onAddToCart?: (productId: number) => void; // Keep for backwards compatibility but don't use
}

const ProductSection: React.FC<ProductSectionProps> = ({ section }) => {
    // ✅ Remove onAddToCart parameter - let ProductCard use CartContext directly
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {section.title}
                </h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        // ✅ Remove onAddToCart prop - let ProductCard use CartContext directly
                        onSelect={() => setSelectedProduct(product)}
                    />
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-200">
                    View All {section.title}
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