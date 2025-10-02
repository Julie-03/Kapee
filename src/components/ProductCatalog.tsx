// src/components/ProductCatalog.tsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Modal from './Modal';
import ProductDetails from './ProductDetails';
import { productService, type BackendProduct } from './services/apiService';
import { adaptBackendProduct } from '../utils/productAdapter';
import type { Product } from '../types/index';
import Products from '../dashboardComponents/Sales';

const ProductCatalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error state
            
            console.log('🔄 Fetching products from API...');
            const backendProducts = await productService.getAllProducts();
            console.log('📦 Raw backend products:', backendProducts);
            
            if (!Array.isArray(backendProducts)) {
                throw new Error('Expected array of products from API');
            }
            
            const adaptedProducts = backendProducts.map(adaptBackendProduct);
            console.log('✅ Adapted products:', adaptedProducts);
            
            setProducts(adaptedProducts);
        } catch (error) {
            console.error('❌ Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleProductSelect = (product: Product) => {
        console.log('Selected product:', product);
        setSelectedProduct(product);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    <div className="text-gray-500">Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-12 space-y-4">
                <div className="text-red-500 text-center max-w-md">
                    <p className="font-semibold text-lg">Error loading products</p>
                    <p className="text-sm mt-2 bg-red-50 p-3 rounded border">{error}</p>
                </div>
                <button 
                    onClick={fetchProducts}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Our Products {products.length > 0 && `(${products.length})`}
                </h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-500 text-lg font-medium">No products available</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Products added through the dashboard will appear here
                    </p>
                    <button 
                        onClick={fetchProducts}
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.mongoId || product._id}
                            product={product}
                            onSelect={() => handleProductSelect(product)}
                        />
                    ))}
                </div>
            )}

            {selectedProduct && (
                <Modal 
                    onClose={() => setSelectedProduct(null)} 
                    ariaLabel="Product Details"
                >
                    <ProductDetails product={selectedProduct as BackendProduct} />
                </Modal>
            )}
        </section>
    );
};

export default ProductCatalog;