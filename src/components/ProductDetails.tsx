// src/components/ProductDetails.tsx
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import apiService from "./services/apiService";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import type { BackendProduct } from "./services/apiService";

export default function ProductDetails({ product }: { product: BackendProduct }) {
  const { addItem, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addToCart = async (qty = 1) => {
    // Check authentication first
    if (!isAuthenticated) {
      Notify.warning('Please log in to add items to cart', {
        position: 'right-top',
        timeout: 3000,
        showOnlyTheLastOne: true,
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      // Use the MongoDB _id for backend operations
      const productIdForBackend = product._id;
      
      console.log(`Adding product to cart:`, {
        productId: productIdForBackend,
        productName: product.name,
        quantity: qty
      });
      
      // Call the backend API
      await apiService.addToCart(productIdForBackend, qty);
      
      // Update local cart context with display data
      const cartItem = {
        id: String(product._id),
        title: product.name,
        price: product.price,
        image: product.imageUrl,
      };
      
      addItem(cartItem, qty);
      console.log(`✅ Added ${product.name} to cart via API`);
      
      // Show success notification
      Notify.success(`${product.name} added to cart!`, {
        position: 'right-top',
        timeout: 2000,
        showOnlyTheLastOne: true,
      });
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('Authentication required') || error.message.includes('Authorization required')) {
          Notify.failure('Your session has expired. Please log in again.', {
            position: 'right-top',
            timeout: 3000,
          });
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
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400x400?text=No+Image"}
            alt={product.name}
            className="max-h-96 w-full object-contain rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
            }}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          
          <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => addToCart(1)}
              disabled={isAddingToCart}
              className={`px-6 py-2 rounded font-medium transition-all duration-200 ${
                isAddingToCart
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 hover:shadow-md'
              }`}
            >
              {isAddingToCart ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <p>Total items in cart: <span className="font-semibold">{getTotalItems()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}