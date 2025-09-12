// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types/index';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product.id);
        } else {
            console.log(`Added ${product.name} to cart`);
        }
    };

    const discountPercentage = product.originalPrice && product.isOnSale
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
            <div className="relative mb-4">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover bg-gray-50 rounded"
                />
                
                {product.isOnSale && discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{discountPercentage}%
                    </span>
                )}

                {!product.inStock && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded">
                        <span className="text-white font-bold">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 h-12 overflow-hidden">
                    {product.name}
                </h3>

                {product.rating && (
                    <div className="flex items-center space-x-1">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span 
                                    key={i} 
                                    className={`text-sm ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.rating})</span>
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.isOnSale && (
                        <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded font-medium transition-colors duration-200 ${
                        product.inStock
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;