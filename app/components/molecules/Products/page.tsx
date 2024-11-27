"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../atoms/Navbar/page";
import useGetDataSpecialProduct from "@/app/Hooks/useGetDataSpecialProduct";

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
  const { getData, error, loading } = useGetDataSpecialProduct(
    "http://127.0.0.1:8000/api/AllSpecialProduct"
  );

  const products = getData ? getData?.products : error;

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

          {/* Add navigation  */}
          <div className="flex justify-center flex-1 flex-wrap gap-4 mb-8">
            {["Pizza", "Drink", "Dessert", "Combo"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-1 rounded-md text-lg font-medium transition-all duration-300 
                      ${
                        activeCategory === category
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

          <div className="w-[90%] ml-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products
                .filter((item: any) => item.category === activeCategory)
                .map((data: ProductType) => {
                  {
                    products.sort((a: any, b: any) =>
                      a.name.localeCompare(b.name)
                    );
                  }
                  const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                  return (
                    <div
                      key={data.id}
                      className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Product-${data.name}`}
                        width={1000}
                        height={1000}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {data.name}
                        </h2>
                        <p className="text-lg font-serif font-bold text-amber-600 mb-4">
                          &#8369;{data.price}.00
                        </p>
                        <div className="space-y-1">
                          <h3 className="font-semibold  text-gray-900">
                            Category:
                          </h3>
                          <p className="text-gray-600">{data.category}</p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">
                            Description:
                          </h3>
                          <p className="text-gray-600">{data.description}</p>
                        </div>
                      </div>
                      <Link
                        key={data.id}
                        href={`/components/molecules/Products/${data.id}/${data.name}/${data.category}/${data.price}/${data.description}/${data.image}`}
                        title="View more"
                        className="p-4 shadow-sm shadow-black  bg-gradient-to-b from-amber-50 to-orange-100 rounded-lg float-right m-5 duration-100 ease-in-out hover:bg-gradient-to-b  hover:from-orange-100 hover:to-amber-50 "
                      >
                        View more
                      </Link>
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
