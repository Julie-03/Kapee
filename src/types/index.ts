// src/types/index.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
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