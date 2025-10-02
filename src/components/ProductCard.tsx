// src/components/ProductCard.tsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import apiService from './services/apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import type { Product } from '../types/index';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: string) => void;
    onSelect?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
    const cartContext = useContext(CartContext);
    const { isAuthenticated, user } = useAuth();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            Notify.warning('Please log in to add items to cart', {
                position: 'right-top',
                timeout: 3000,
                showOnlyTheLastOne: true,
            });
            return;
        }

        const button = e.target as HTMLButtonElement;
        const originalText = button.textContent || 'Add to Cart';
        
        try {
            button.disabled = true;
            button.textContent = 'Adding...';
            
            if (onAddToCart) {
                // Use the callback if provided (for backward compatibility)
                onAddToCart(product._id);
            } else {
                // Use mongoId for backend operations, fallback to id.toString()
                const productIdForBackend = product.mongoId || product._id.toString();
                
                console.log(`Adding product to cart:`, {
                    productId: productIdForBackend,
                    productName: product.name,
                    mongoId: product.mongoId
                });
                
                await apiService.addToCart(productIdForBackend, 1);
                
                // Update local cart context with display data
                if (cartContext?.addItem) {
                    const cartItem = {
                        id: productIdForBackend,
                        title: product.name,
                        price: product.price,
                        image: product.image,
                    };
                    cartContext.addItem(cartItem, 1);
                }
                
                console.log(`✅ Added ${product.name} to cart via API`);
                
                // Show success notification
                Notify.success(`${product.name} added to cart!`, {
                    position: 'right-top',
                    timeout: 2000,
                    showOnlyTheLastOne: true,
                });
                
                // Show success feedback on button
                button.textContent = 'Added!';
                button.style.backgroundColor = '#10B981'; // Green color
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = ''; // Reset to original
                    button.disabled = false;
                }, 1500);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            
            // Show error feedback on button
            button.textContent = 'Error!';
            button.style.backgroundColor = '#EF4444'; // Red color
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ''; // Reset to original
                button.disabled = false;
            }, 2000);
            
            // Handle specific error cases with Notiflix
            if (error instanceof Error) {
                if (error.message.includes('Authentication required') || error.message.includes('Authorization required')) {
                    Notify.failure('Your session has expired. Please log in again.', {
                        position: 'right-top',
                        timeout: 3000,
                    });
                    // Optionally redirect to login
                    // setTimeout(() => window.location.href = '/login', 1500);
                } else if (error.message.includes('already in cart')) {
                    Notify.info('This item is already in your cart. Update quantity from your cart.', {
                        position: 'right-top',
                        timeout: 3000,
                    });
                } else {
                    Notify.failure('Failed to add item to cart. Please try again.', {
                        position: 'right-top',
                        timeout: 3000,
                    });
                }
            } else {
                Notify.failure('An unexpected error occurred. Please try again.', {
                    position: 'right-top',
                    timeout: 3000,
                });
            }
        }
    };

    const discountPercentage = product.originalPrice && product.isOnSale
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
            <div 
                className="relative mb-4 cursor-pointer"
                onClick={onSelect} 
            >
                <img 
                    src={product.image || '/placeholder-image.jpg'} 
                    alt={product.name}
                    className="w-full h-48 object-cover bg-gray-50 rounded hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                        // Fallback image if the image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.jpg';
                    }}
                />
                
                {product.isOnSale && discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{discountPercentage}%
                    </span>
                )}

                {product.inStock === false && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded">
                        <span className="text-white font-bold">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <h3 
                    className="font-semibold text-gray-800 h-12 overflow-hidden cursor-pointer hover:text-yellow-600 transition-colors line-clamp-2"
                    onClick={onSelect}
                    title={product.name}
                >
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
                    disabled={product.inStock === false}
                    className={`w-full py-2 px-4 rounded font-medium transition-all duration-200 ${
                        product.inStock !== false
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 hover:shadow-md'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {product.inStock === false 
                        ? 'Out of Stock' 
                        : 'Add to Cart'
                    }
                </button>
            </div>
        </div>
    );
};

export default ProductCard;