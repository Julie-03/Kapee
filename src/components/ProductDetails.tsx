// src/components/ProductDetails.tsx
import React, { useContext } from "react";
import { CartContext } from "./CartContext"; // ✅ Make sure path matches

// Update interface to match your Product type
interface Product {
  id: number; // ✅ Changed from string to number to match your ProductCard
  name: string; // ✅ Changed from title to name
  description?: string;
  price: number;
  image?: string;
  rating?: number;
  originalPrice?: number;
  isOnSale?: boolean;
  inStock?: boolean;
}

export default function ProductDetails({ product }: { product: Product }) {
  const cartContext = useContext(CartContext);

  const addToCart = (qty = 1) => {
    if (cartContext?.addItem) {
      // Convert product to cart format
      const cartItem = {
        id: product.id.toString(), // Convert to string for cart
        title: product.name, // Convert name to title for cart
        price: product.price,
        image: product.image,
      };
      
      cartContext.addItem(cartItem, qty);
      console.log(`✅ Added ${product.name} to cart from ProductDetails`);
    } else {
      console.log(`❌ Cart context not available for ${product.name}`);
    }
  };

  const discountPercentage = product.originalPrice && product.isOnSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center justify-center">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="max-h-80 w-full object-cover rounded"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        
        {product.rating && (
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-lg ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>
        )}

        <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.isOnSale && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                -{discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToCart(1)}
            disabled={product.inStock === false}
            className={`px-6 py-2 rounded font-medium transition-colors duration-200 ${
              product.inStock !== false
                ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock !== false ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {product.inStock === false && (
          <p className="text-red-500 text-sm mt-2">This item is currently out of stock.</p>
        )}

        {/* Debug info */}
        {cartContext && (
          <div className="mt-4 text-xs text-gray-500">
            Total items in cart: {cartContext.getTotalItems()}
          </div>
        )}
      </div>
    </div>
  );
}