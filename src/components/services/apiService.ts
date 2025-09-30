// src/services/apiService.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

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

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  contact: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SendOTPRequest {
  email: string;
}

export interface SendOTPResponse {
  message: string;
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Product service
export const productService = {
  getAllProducts: async (): Promise<BackendProduct[]> => {
    try {
      console.log("Fetching products from:", `${API_BASE_URL}/products`);
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      if (data.products && Array.isArray(data.products)) {
        return data.products;
      } else if (Array.isArray(data)) {
        return data;
      } else {
        console.warn("Unexpected API response structure:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  createProduct: async (
    productData: Omit<BackendProduct, "_id" | "createdAt" | "updatedAt">
  ): Promise<BackendProduct> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  deleteProduct: async (productId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};

// Contact service
export const contactService = {
  submitContact: async (data: ContactFormData): Promise<ContactResponse> => {
    try {
      console.log("Submitting contact form to:", `${API_BASE_URL}/api_v1/contacts`);

      const response = await fetch(`${API_BASE_URL}/api_v1/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },
};

// Password Reset service
export const passwordResetService = {
  // Send OTP to email
  sendOTP: async (data: SendOTPRequest): Promise<SendOTPResponse> => {
    try {
      console.log("Sending OTP to:", `${API_BASE_URL}/api_v1/user/send-otp`);

      const response = await fetch(`${API_BASE_URL}/api_v1/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

  // Reset password with OTP
  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      console.log("Resetting password:", `${API_BASE_URL}/api_v1/user/reset-password`);

      const response = await fetch(`${API_BASE_URL}/api_v1/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },
};

// Main API service (for cart and other operations)
const apiService = {
  addToCart: async (productId: string, quantity: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required");
      }
      const errorText = await response.text();
      throw new Error(`Failed to add to cart: ${errorText}`);
    }

    return response.json();
  },
};
export default apiService;