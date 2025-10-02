// src/service.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import { navigationItems, heroBanner, productSections } from './data/sampleData';

const ServicePage: React.FC = () => {
    const [cartItems, setCartItems] = useState<string[]>([]);

    const handleAddToCart = (productId: string) => {
        setCartItems(prev => [...prev, productId]);
        console.log(`Product ${productId} added to cart`);
    };

    const handleShopNow = () => {
        const firstProductSection = document.getElementById('hot-deals');
        if (firstProductSection) {
            firstProductSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header 
                navigationItems={navigationItems}
                cartItemCount={cartItems.length}
            />

            <HeroSection 
                banner={heroBanner}
                onShopNow={handleShopNow}
            />

            <main>
                {productSections.map((section) => (
                    <div key={section.id} id={section.id}>
                        <ProductSection
                            title={section.title}
                            products={section.products}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </main>

            <footer className="bg-gray-900 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">kapee.</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Your trusted electronics store with the best deals on tech products.
                            </p>
                            <div className="flex space-x-4">
                                <span className="text-2xl">📧</span>
                                <span className="text-2xl">📱</span>
                                <span className="text-2xl">📘</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Categories</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white">Smart Watches</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Audio</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Chargers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Customer Service</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Track Order</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-400 mb-4 md:mb-0">
                            © 2024 Kapee Electronics. All rights reserved.
                        </div>
                        
                        <div className="flex space-x-4 text-sm text-gray-400">
                            <span>💳 Visa</span>
                            <span>💳 Mastercard</span>
                            <span>💳 PayPal</span>
                            <span>💳 Apple Pay</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServicePage;