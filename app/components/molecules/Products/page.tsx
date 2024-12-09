"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../atoms/Navbar/page";
import FetchApi from "@/app/Hooks/FetchApi";

interface ProductType {
  id: number;
  product_id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  const { getData, error, loading } = FetchApi(
    "http://127.0.0.1:8000/api/AllSpecialProduct"
  );
  const products = getData ? getData?.products : error;

  const toggleFavorites = (product: ProductType) => {
    setFavorites((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id);
      if (isInWishlist) {
        const newWishlist = prev.filter((item) => item.id !== product.id);
        localStorage.setItem("favorites", JSON.stringify(newWishlist));
        return newWishlist;
      } else {
        const newWishlist = [...prev, product];
        localStorage.setItem("favorites", JSON.stringify(newWishlist));
        return newWishlist;
      }
    });
    window.dispatchEvent(new Event("favoritesUpdate"));
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <Navbar />
        <title>Don Macchiatos Products</title>

        <main className="container mx-auto px-4 py-8 pt-[7rem]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6">
              Available Products
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Discover our carefully curated selection of premium coffee
              beverages and delightful accompaniments. From our signature
              macchiatos to freshly baked pastries, each item is crafted to
              enhance your coffee experience.
            </p>
          </div>

          <div className="flex justify-center flex-1 flex-wrap gap-4 mb-8">
            {["Pizza", "Drink", "Dessert", "Combo"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-1 rounded-md text-lg font-medium transition-all duration-300 
                      ${activeCategory === category
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-amber-600 hover:bg-amber-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {products &&
            products.length > 0 &&
            products.filter((item: any) => item.category === activeCategory)
              .length > 0 && (
              <h3 className="ml-[5%] text-3xl md:text-4xl font-serif text-amber-900 mb-8 pl-4">
                {activeCategory}&apos;s
              </h3>
            )}

          <div className="w-[90%] ml-[5%] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products && products.length > 0 ? (
              products
                .filter((item: any) => item.category === activeCategory)
                .map((data: ProductType) => {
                  const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                  return (
                    <div
                      key={data.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative group">
                        <Image
                          src={imageUrl}
                          alt={`Product-${data.name}`}
                          width={500}
                          height={500}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link
                            href={`/components/molecules/Products/${data.product_id}/${data.name}/${data.category}/${data.price}/${data.description}/${data.image}`}
                            className="bg-white text-amber-600 px-3 py-1 text-sm rounded-md font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          >
                            Quick View
                          </Link>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="block justify-between items-start mb-2">
                          <h5 className="text-lg font-serif  text-amber-900">
                            {data.name}
                          </h5>
                          <p className="text-lg font-bold text-amber-600">
                            &#8369;{data.price}.00
                          </p>
                        </div>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {data.category}
                        </p>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {data.description}
                        </p>

                        <div className="flex gap-1">
                          <Link
                            href={{
                              pathname: "/components/organisms/OrderPage",
                              query: {
                                id: data.product_id,
                                name: data.name,
                                description: data.description,
                                price: data.price,
                                image: data.image,
                              },
                            }}
                            className="flex-1 bg-amber-500 text-center text-white text-sm py-1.5 px-3 rounded-md hover:bg-amber-400 transition-colors duration-300"
                            onClick={() => {
                              console.log("Added to cart:", data.name);
                            }}
                          >
                            Add to Cart
                          </Link>
                          <button
                            className="p-1.5 text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50 transition-colors duration-300"
                            onClick={() => toggleFavorites(data)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill={
                                favorites.some((item) => item.id === data.id)
                                  ? "currentColor"
                                  : "none"
                              }
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="col-span-full flex justify-center items-center h-64 gap-4">
                <div
                  className={`animate-spin rounded-full h-10 w-2 border-b-4 border-orange-600`}
                />
                <div
                  className={`animate-spin rounded-full h-10 w-4 border-b-4 border-orange-600`}
                />
                <div
                  className={`animate-spin rounded-full h-10 w-6 border-b-4 border-orange-600`}
                />
                <div
                  className={`animate-spin rounded-full h-10 w-8 border-b-4 border-orange-600`}
                />
                <div
                  className={`animate-spin rounded-full h-10 w-10 border-b-4 border-orange-600`}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductPage;
