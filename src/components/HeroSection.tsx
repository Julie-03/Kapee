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

    return (
        <section className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
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
        </section>
    );
};

export default HeroSection;