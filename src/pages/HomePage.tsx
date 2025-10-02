// src/pages/HomePage.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import { heroBanner, productSections } from '../data/sampleData';
import ProductTabs from "../components/ProductTabs";

interface OutletContext {
  handleAddToCart: (productId: string) => void;
}

const HomePage: React.FC = () => {
  const { handleAddToCart } = useOutletContext<OutletContext>();

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
    <div>
      {/* Hero Section */}
      <HeroSection 
        banner={heroBanner}
        onShopNow={handleShopNow}
      />

      {/* Product Sections */}
      <main>
        <ProductSection title="Hot Deals" />
        <ProductSection title="New Arrivals" />
        <ProductSection title="Best Sellers" />
      </main>

      {/* Product Tabs Section */}
      <ProductTabs />
    </div>
  );
};

export default HomePage;
