// src/components/ProductTabs.tsx
import React from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-bold mb-2 border-b-2 border-yellow-500 inline-block">
        {title}
      </h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
            <div>
              <p className="text-sm text-gray-700">{product.name}</p>
              <p className="font-bold text-black">{product.price}</p>
              {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through">{product.oldPrice}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductTabs: React.FC = () => {
  const featured: Product[] = [
    { id: "1", name: "Apple AirPods with Wireless …", price: "$85.00", image: "/src/assets/airpods.jpg" },
    { id: "2", name: "JBL Wireless Bluetooth Speaker", price: "$96.00", image: "/src/assets/speaker.jpg" },
    { id: "3", name: "JBL On-Ear Headphones", price: "$124.00", image: "/src//assets/headphones.jpg" },
  ];

  const recent: Product[] = [
    { id: "4", name: "Apple iPhone 11 Pro Max 256GB", price: "$199.00", oldPrice: "$254.00", image: "/src/assets/iphone.jpg" },
    { id: "5", name: "Apple AirPods with Wireless …", price: "$85.00", image: "/src/assets/airpods.jpg" },
    { id: "6", name: "Apple Watch Series 5", price: "$499.00 - $599.00", image: "/src/assets/watch.jpg" },
  ];

  const onSale: Product[] = [
    { id: "7", name: "Apple iPhone 11 Pro Max 256GB", price: "$199.00", oldPrice: "$254.00", image: "/src/assets/iphone.jpg" },
    { id: "8", name: "Apple Watch Series 5", price: "$499.00 - $599.00", image: "/src/assets/watch.jpg" },
    { id: "9", name: "Samsung Gear 360 Camera", price: "$29.00", oldPrice: "$48.00", image: "/src/assets/camera.jpg" },
  ];

  const topRated: Product[] = [
    { id: "10", name: "Samsung Virtual Reality Headset", price: "$18.00", image: "/src/assets/vr.jpg" },
    { id: "11", name: "Microsoft Xbox One Wireless …", price: "$25.00", oldPrice: "$45.00", image: "/src/assets/xbox.jpg" },
    { id: "12", name: "Apple Watch Series 5 Black M…", price: "$599.00", image: "/src/assets/watch.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
      <ProductSection title="FEATURED" products={featured} />
      <ProductSection title="RECENT" products={recent} />
      <ProductSection title="ON SALE" products={onSale} />
      <ProductSection title="TOP RATED" products={topRated} />
    </div>
  );
};

export default ProductTabs;
