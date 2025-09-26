// src/components/CartModal.tsx 
import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { CartContext } from "./CartContext";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cartContext = useContext(CartContext);
  const mockCartItems: CartItem[] = [];
  
  const items = cartContext?.items || mockCartItems;
  const removeItem = cartContext?.removeItem || (() => console.log('Remove item'));
  const clearCart = cartContext?.clearCart || (() => console.log('Clear cart'));
  const getTotalPrice = cartContext?.getTotalPrice || (() => 0);

  const isEmpty = items.length === 0;

  // checkout handler 
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log('Order placed:', {
        items: items,
        total: getTotalPrice(),
        timestamp: new Date()
      });
      
      clearCart();
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  // Show order success
  if (orderComplete) {
    return (
      <Modal onClose={onClose} ariaLabel="Order Success">
        <div className="text-center py-8 max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
          </div>
          
          <button
            onClick={onClose}
            className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    );
  }

  // Show simple checkout form
  if (showCheckout) {
    return (
      <Modal onClose={() => setShowCheckout(false)} ariaLabel="Checkout">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-black bg-white">Checkout</h2>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 bg-white text-black">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold bg-white text-black">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Simple Form */}
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-lg  bg-white text-black"
              required
            />
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 border border-gray-300 rounded-lg  bg-white text-black"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg  bg-white text-black"
              required
            />
            <input
              type="text"
              placeholder="Card number"
              className="w-full p-3 border border-gray-300 rounded-lg  bg-white text-black"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCheckout(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium  bg-yellow-500 text-white shadow"
            >
              Back to Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : `Place Order - $${getTotalPrice().toFixed(2)}`}
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Show empty cart
  if (isEmpty) {
    return (
      <Modal onClose={onClose} ariaLabel="Shopping Cart">
        <div className="text-center py-8">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5-6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-.5M16 11V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Cart</h2>
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    );
  }

  // Show cart contents
  const total = getTotalPrice();

  return (
    <Modal onClose={onClose} ariaLabel="Shopping Cart">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Cart ({items.length} items)</h2>
        
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-white rounded flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                <p className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-black bg-white px-2 py-1 text-sm border border-gray-300 shadow rounded hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">
              Total: ${total.toFixed(2)}
            </span>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={clearCart}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 bg-white text-black transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white text-black border border-gray-300 shadow hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => setShowCheckout(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}