// src/components/HeroSection.tsx
import React from 'react';
import type { HeroBanner } from '../types/index';

interface HeroSectionProps {
    banner: HeroBanner;
    onShopNow?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ banner, onShopNow }) => {
    const handleShopNow = () => {
        if (onShopNow) {
            onShopNow();
        } else {
            console.log('Navigate to shop page');
        }
    };

    // Sidebar categories data - you can move this to props or data file
    const sidebarCategories = [
        { id: 1, name: "Men's Clothing", hasSubmenu: true },
        { id: 2, name: "Women's Clothing", hasSubmenu: true },
        { id: 3, name: "Accessories", hasSubmenu: true },
        { id: 4, name: "Shoes", hasSubmenu: true },
        { id: 5, name: "Jewellery", hasSubmenu: true },
        { id: 6, name: "Bags & Backpacks", hasSubmenu: true },
        { id: 7, name: "Watches", hasSubmenu: true },
        { id: 8, name: "Dresses", hasSubmenu: true },
        { id: 9, name: "Shirts", hasSubmenu: true },
    ];

    return (
        <section className="bg-gray-100 w-full">
            <div className="flex w-full min-h-[600px]">
                {/* Sidebar - Only visible on hero section */}
                <aside className="w-64 bg-white flex-shrink-0">
                    <div className="p-4 h-full">
                        <h3 className="font-bold text-black mb-4 text-lg uppercase tracking-wide">SHOP BY CATEGORIES</h3>
                        <nav>
                            <ul className="space-y-1">
                                {sidebarCategories.map((category) => (
                                    <li key={category.id}>
                                        <a
                                            href={`#${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                            className="flex items-center justify-between py-3 px-3 text-black hover:bg-yellow-400 rounded transition-colors duration-200 text-sm font-medium border-b border-yellow-400 border-opacity-30 last:border-b-0"
                                        >
                                            <span>{category.name}</span>
                                            {category.hasSubmenu && (
                                                <span className="text-black font-bold">›</span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* Main Hero Content */}
                <div className="flex-1 py-12 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between">
                            {/* Left content */}
                            <div className="flex-1">
                                <div className="mb-6">
                                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                                        {banner.badge || 'BEATS EP ON-EAR'}
                                    </span>
                                </div>
                                
                                <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    PERSONALIZED<br />
                                    HEADPHONES
                                </h1>
                                
                                <p className="text-xl text-gray-600 mb-8">
                                    {banner.subtitle}
                                </p>
                                
                                <button
                                    onClick={handleShopNow}
                                    className="bg-yellow-400 text-black font-bold py-4 px-8 rounded hover:bg-yellow-500 transition-colors"
                                >
                                    {banner.buttonText}
                                </button>
                            </div>

                            {/* Right content - Headphones image */}
                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <img
                                        src="/src/assets/headphones.jpg"
                                        alt={banner.title}
                                        className="w-96 h-80 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Navigation arrows */}
                        <div className="flex justify-center mt-8 space-x-4">
                            <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
                                ←
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;