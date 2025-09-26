// src/utils/productAdapter.ts
import type { Product } from '../types/index';

export interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const adaptBackendProduct = (backendProduct: BackendProduct): Product => {
    return {
        id: Date.now() + Math.random(), // Generate unique number ID for frontend display
        mongoId: backendProduct._id, // Keep MongoDB ID for backend operations
        name: backendProduct.name,
        price: backendProduct.price,
        description: backendProduct.description,
        image: backendProduct.imageUrl || '/placeholder-image.jpg',
        category: backendProduct.category || 'General',
        inStock: true, // Default to true unless specified otherwise
        rating: undefined, // Add if your backend provides this
        originalPrice: undefined, // Add if your backend provides this
        isOnSale: false // Default to false unless specified otherwise
    };
};