// src/services/apiService.ts
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:7000";

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

// Product service
export const productService = {
  // Fetch all products
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

  // Create a new product
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

  // Delete a product
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

// Main API service (for cart and other operations)
const apiService = {
  addToCart: async (productId: string, quantity: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Authentication required");
    }

    // 👇 if your backend also doesn’t use /api_v1 for cart, update here too
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
