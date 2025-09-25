// src/services/apiService.ts

// Updated to match your existing backend routes
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     (window as any).REACT_APP_API_URL || 
                     'http://localhost:7000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    console.log('🔍 Token found:', token ? 'Yes' : 'No');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response URL:', response.url);
    
    if (response.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userKey');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('🔍 Error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Test backend connection
  async testConnection(): Promise<void> {
    try {
      console.log('🔍 Testing connection to:', `${API_BASE_URL}/cart/test`);
      const response = await fetch(`${API_BASE_URL}/cart/test`);
      const data = await response.json();
      console.log('✅ Backend test successful:', data);
    } catch (error) {
      console.error('❌ Backend test failed:', error);
    }
  }

  // Cart API methods
  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse> {
    const url = `${API_BASE_URL}/cart/add`;
    const headers = this.getAuthHeaders();
    const body = JSON.stringify({ productId, quantity });
    
    console.log('🔍 Making request to:', url);
    console.log('🔍 Headers:', headers);
    console.log('🔍 Body:', body);
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    return this.handleResponse<ApiResponse>(response);
  }

  async getCartItems(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  async updateCartItem(productId: string, quantity: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/update/${productId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  async removeCartItem(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  async getCartItemById(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<ApiResponse>(response);
  }
}

export default new ApiService();