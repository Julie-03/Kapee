// src/components/ProductCard.tsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from '../contexts/AuthContext'; // Import auth context
import apiService from './services/apiService';
import type { Product } from '../types/index';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
    onSelect?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
    const cartContext = useContext(CartContext);
    const { isAuthenticated, user } = useAuth(); // Get auth state

    // Simple notification function - replace with your preferred notification library
    const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        // You can replace this with react-toastify, react-hot-toast, or any notification library
        alert(message); // Simple fallback - replace with better notification
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering onSelect
        
        // Check if user is authenticated
        if (!isAuthenticated) {
            notify('Please log in to add items to cart', 'info');
            return; // Don't redirect, just show notification
        }

        const button = e.target as HTMLButtonElement;
        const originalText = button.textContent;
        
        try {
            // Disable button during API call
            button.disabled = true;
            button.textContent = 'Adding...';
            
            if (onAddToCart) {
                // Use the callback if provided
                onAddToCart(product.id);
            } else {
                // Use API service to add to backend cart
                await apiService.addToCart(product.id.toString(), 1);
                
                // Also update local cart context if available
                if (cartContext?.addItem) {
                    const cartItem = {
                        id: product.id.toString(),
                        title: product.name,
                        price: product.price,
                        image: product.image,
                    };
                    
                    cartContext.addItem(cartItem, 1);
                }
                
                console.log(`✅ Added ${product.name} to cart via API`);
                notify(`${product.name} added to cart!`, 'success');
                
                // Show success feedback
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
            
            // Show error feedback
            button.textContent = 'Error!';
            button.style.backgroundColor = '#EF4444'; // Red color
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ''; // Reset to original
                button.disabled = false;
            }, 2000);
            
            // Handle specific error cases
            if (error instanceof Error && error.message.includes('Authentication required')) {
                notify('Your session has expired. Please log in again.', 'error');
                window.location.href = '/login';
            } else if (error instanceof Error && error.message.includes('already in cart')) {
                notify('This item is already in your cart. You can update the quantity from your cart.', 'info');
            } else {
                notify('Failed to add item to cart. Please try again.', 'error');
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
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover bg-gray-50 rounded hover:scale-105 transition-transform duration-200"
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
                <h3 
                    className="font-semibold text-gray-800 h-12 overflow-hidden cursor-pointer hover:text-yellow-600 transition-colors"
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
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded font-medium transition-all duration-200 ${
                        product.inStock
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 hover:shadow-md'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {!product.inStock 
                        ? 'Out of Stock' 
                        : 'Add to Cart'  // Always show "Add to Cart" regardless of auth status
                    }
                </button>
            </div>

            {/* Debug info - remove in production */}
            {cartContext && isAuthenticated && (
                <div className="mt-2 text-xs text-gray-500">
                    Cart has {cartContext.getTotalItems()} items | User: {user?.email}
                </div>
            )}
        </div>
    );
};

export default ProductCard;