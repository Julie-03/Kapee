// src/context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "../components/services/apiService";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import type { ReactNode } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from backend when component mounts or user logs in
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log('⚠️ No token found, cart will be empty');
        setItems([]);
        return;
      }

      const response = await apiService.getCartItems();
      console.log('📦 Backend cart response:', response);
      
      // Transform backend cart format to CartItem format
      const cartItems: CartItem[] = response.data?.map((item: any) => ({
        id: item.productId._id,
        title: item.productId.name,
        price: item.productId.price,
        image: item.productId.imageUrl,
        qty: item.quantity
      })) || [];

      setItems(cartItems);
      console.log('✅ Cart loaded from backend:', cartItems.length, 'items');
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      // If unauthorized or error, use empty cart
      setItems([]);
    }
  };

  // Load cart when component mounts
  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (item: Omit<CartItem, "qty">, qty = 1) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        // User not logged in - only store locally
        setItems(prev => {
          const existing = prev.find(i => i.id === item.id);
          if (existing) {
            return prev.map(i =>
              i.id === item.id ? { ...i, qty: i.qty + qty } : i
            );
          }
          return [...prev, { ...item, qty }];
        });

        Notify.warning('Login to save your cart', {
          position: 'right-top',
          timeout: 3000,
        });
        return;
      }

      // User is logged in - sync with backend
      await apiService.addToCart(item.id, qty);
      console.log(`✅ Added ${qty}x ${item.title} to backend cart`);

      // Reload cart from backend to get fresh data
      await loadCart();

      Notify.success('Item added to cart', {
        position: 'right-top',
        timeout: 2000,
      });
    } catch (error) {
      console.error('❌ Error adding item to cart:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Check if item already exists error
      if (errorMessage.includes('already in cart')) {
        // Update quantity instead
        const existing = items.find(i => i.id === item.id);
        if (existing) {
          await updateQuantity(item.id, existing.qty + qty);
        }
        return;
      }

      // Still add to local state even if backend fails
      setItems(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { ...item, qty }];
      });

      if (errorMessage.includes('Authorization required')) {
        Notify.warning('Session expired. Item added locally only.', {
          position: 'right-top',
          timeout: 3000,
        });
      } else {
        Notify.failure('Failed to sync with server. Added locally.', {
          position: 'right-top',
          timeout: 3000,
        });
      }
    }
  };

  const removeItem = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        // Remove from backend first
        await apiService.removeFromCart(id);
        console.log(`✅ Removed item ${id} from backend cart`);
      }
      
      // Then remove from local state
      setItems(prev => prev.filter(i => i.id !== id));
      
      Notify.success('Item removed from cart', {
        position: 'right-top',
        timeout: 2000,
      });
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
      
      // Still remove from local state even if backend fails
      setItems(prev => prev.filter(i => i.id !== id));
      
      if (error instanceof Error && error.message.includes('Authorization required')) {
        Notify.warning('Session expired. Item removed locally only.', {
          position: 'right-top',
          timeout: 3000,
        });
      } else {
        Notify.failure('Failed to sync with server. Item removed locally.', {
          position: 'right-top',
          timeout: 3000,
        });
      }
    }
  };

  const updateQuantity = async (id: string, qty: number) => {
    if (qty <= 0) {
      await removeItem(id);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        // Update in backend
        await apiService.updateCartItem(id, qty);
        console.log(`✅ Updated quantity for ${id} to ${qty} in backend`);
      }

      // Update local state
      setItems(prev => 
        prev.map(i => 
          i.id === id ? { ...i, qty } : i
        )
      );
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      
      // Still update local state
      setItems(prev => 
        prev.map(i => 
          i.id === id ? { ...i, qty } : i
        )
      );

      if (error instanceof Error && error.message.includes('Authorization required')) {
        Notify.warning('Session expired. Updated locally only.', {
          position: 'right-top',
          timeout: 3000,
        });
      } else {
        Notify.failure('Failed to sync with server. Updated locally.', {
          position: 'right-top',
          timeout: 3000,
        });
      }
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        // Clear cart in backend first
        await apiService.clearCart();
        console.log('✅ Cart cleared in backend');
      }
      
      // Then clear local state
      setItems([]);
      
      Notify.success('Cart cleared successfully', {
        position: 'right-top',
        timeout: 2000,
      });
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      
      // Still clear local state even if backend fails
      setItems([]);
      
      if (error instanceof Error && error.message.includes('Authorization required')) {
        Notify.warning('Session expired. Cart cleared locally only.', {
          position: 'right-top',
          timeout: 3000,
        });
      } else {
        Notify.failure('Failed to sync with server. Cart cleared locally.', {
          position: 'right-top',
          timeout: 3000,
        });
      }
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity,
      clearCart, 
      loadCart,
      getTotalItems, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier usage
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};