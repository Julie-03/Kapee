// src/types/index.ts
import type { ReactNode } from 'react';

export interface Product {
    _id: string;
    mongoId?: string;
    name: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    category: string;
    isOnSale?: boolean;
    rating?: number;
    inStock: boolean;
}

export interface ProductSection {
    id: string;
    title: string;
    products: Product[];
}

export interface NavItem {
    id: number;
    label: string;
    href: string;
    hasDropdown?: boolean;
}

export interface HeroBanner {
    id: number;
    title: string;
    subtitle: string;
    discount: string;
    buttonText: string;
    backgroundImage: string;
    productImage: string;
    badge?: string;
}

// Props interface for ProductSection component
export interface ProductSectionProps {
    section: ProductSection;
    onAddToCart: (productId: string) => void;
}