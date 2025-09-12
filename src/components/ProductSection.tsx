// src/components/ProductSection.tsx
import React from 'react';
import ProductCard from './ProductCard';
import type { ProductSection as ProductSectionType } from '../types/index';

interface ProductSectionProps {
    section: ProductSectionType;
    onAddToCart?: (productId: number) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ section, onAddToCart }) => {
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
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors duration-200">
                    View All {section.title}
                </button>
            </div>
        </section>
    );
};

export default ProductSection;