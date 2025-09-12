// src/data/sampleData.ts
import type { Product, ProductSection, NavItem, HeroBanner } from '../types/index';

export const navigationItems: NavItem[] = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'Shop', href: '/shop', hasDropdown: true },
    { id: 3, label: 'About', href: '/about' },
    { id: 4, label: 'Contact', href: '/contact' },
    { id: 5, label: 'Blog', href: '/blog' },
];

export const heroBanner: HeroBanner = {
    id: 1,
    title: 'WIRELESS CHARGING STAND',
    subtitle: 'Up To 70% Off',
    discount: '70%',
    buttonText: 'Shop Now',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    productImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'
};

const sampleProducts: Product[] = [
    {
        id: 1,
        name: 'Apple Watch Series 9',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop',
        category: 'smartwatch',
        isOnSale: true,
        rating: 4.5,
        inStock: true
    },
    {
        id: 2,
        name: 'Wireless Bluetooth Speaker',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
        category: 'audio',
        rating: 4.2,
        inStock: true
    },
    {
        id: 3,
        name: 'Watch Charger Stand',
        price: 29.99,
        originalPrice: 39.99,
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=300&fit=crop',
        category: 'accessories',
        isOnSale: true,
        rating: 4.0,
        inStock: true
    },
    {
        id: 4,
        name: 'Premium Headphones',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        category: 'audio',
        rating: 4.7,
        inStock: true
    },
    {
        id: 5,
        name: 'USB-C Lightning Cable',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        category: 'accessories',
        rating: 4.3,
        inStock: true
    },
    {
        id: 6,
        name: 'Wireless Earbuds Pro',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
        category: 'audio',
        rating: 4.8,
        inStock: true
    },
    {
        id: 7,
        name: 'Smart Fitness Tracker',
        price: 99.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
        category: 'smartwatch',
        isOnSale: true,
        rating: 4.4,
        inStock: true
    },
    {
        id: 8,
        name: 'Portable Power Bank',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1609592094733-50fe0ee9c4f6?w=300&h=300&fit=crop',
        category: 'accessories',
        rating: 4.1,
        inStock: false
    }
];

export const productSections: ProductSection[] = [
    {
        id: 'hot-deals',
        title: 'Hot Deals',
        products: sampleProducts.filter(p => p.isOnSale).slice(0, 4)
    },
    {
        id: 'featured-products',
        title: 'Featured Products',
        products: sampleProducts.slice(0, 6)
    },
    {
        id: 'best-selling',
        title: 'Best Selling Products',
        products: sampleProducts.slice(2, 8)
    }
];