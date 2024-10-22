// components/ProductsPage.tsx
import React from 'react';
import { Image } from "../typescript/action";

// Types
type AdditionalParam = {
  product_name: string;
  product_description: string;
  product_price: string;
}

type Product = {
  product_name: string;
  product_image: Image;
  product_description: string;
  product_price: number;
  $?: AdditionalParam;
}

type ProductProps = {
    product_category: string;
    category_description: string;
    $: AdditionalParam;
    products: Product[];
}

// Main Component
export default function ProductsPage({ourProduct}: {ourProduct:ProductProps}) {
  return (
    <div className="p-4 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{ourProduct.product_category}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {ourProduct.category_description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ourProduct.products.map((product,index) => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105" key={index}>
          {product.product_image && (
            <div className="aspect-video overflow-hidden">
              <img
                src={product.product_image.url}
                alt={product.product_image.title || product.product_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 
              className="text-xl font-semibold mb-2"
              {...product.$?.product_name as {}}
            >
              {product.product_name}
            </h3>
            <p 
              className="text-gray-600 mb-4"
              {...product.$?.product_description as {}}
            >
              {product.product_description}
            </p>
            <p className="text-2xl font-bold text-primary">
              ${product.product_price.toLocaleString()}
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
