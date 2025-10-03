import React from 'react';

interface HeroBanner {
    badge?: string;
    title: string;
    subtitle: string;
    buttonText: string;
}

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

    const sidebarCategories = [
        { id: 1, name: "Laptops", hasSubmenu: true },
        { id: 2, name: "Watches", hasSubmenu: true },
        { id: 3, name: "Phones", hasSubmenu: true },
        { id: 4, name: "Cameras", hasSubmenu: true },
        { id: 5, name: "Drones", hasSubmenu: true },
        { id: 6, name: "Headphones", hasSubmenu: true },
        { id: 7, name: "Accessories", hasSubmenu: true },
    ];

    return (
        <section className="bg-gray-100 w-full">
            <div className="flex flex-col lg:flex-row w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                {/* Sidebar - Hidden on mobile/tablet, visible on large screens */}
                <aside className="hidden lg:block lg:w-64 bg-white flex-shrink-0">
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
                <div className="flex-1 py-8 md:py-12 px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            {/* Left content */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="mb-4 md:mb-6">
                                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                                        {banner.badge || 'BEATS EP ON-EAR'}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                                    PERSONALIZED<br />
                                    HEADPHONES
                                </h1>
                                
                                <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
                                    {banner.subtitle}
                                </p>
                                
                                <button
                                    onClick={handleShopNow}
                                    className="bg-yellow-400 text-black font-bold py-3 px-6 md:py-4 md:px-8 rounded hover:bg-yellow-500 transition-colors text-sm md:text-base"
                                >
                                    {banner.buttonText}
                                </button>
                            </div>

                            {/* Right content - Headphones image */}
                            <div className="flex-1 flex justify-center">
                                <div className="relative w-full max-w-sm lg:max-w-md">
                                    <img
                                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
                                        alt={banner.title}
                                        className="w-full h-64 md:h-80 lg:h-96 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Navigation arrows */}
                        <div className="flex justify-center mt-6 md:mt-8 space-x-4">
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 text-lg md:text-xl">
                                ←
                            </button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 text-lg md:text-xl">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Demo with sample data
export default function App() {
    const sampleBanner: HeroBanner = {
        badge: 'BEATS EP ON-EAR',
        title: 'PERSONALIZED HEADPHONES',
        subtitle: 'Experience crystal-clear sound with our premium wireless headphones',
        buttonText: 'SHOP NOW'
    };

    return <HeroSection banner={sampleBanner} onShopNow={() => alert('Shop now clicked!')} />;
}