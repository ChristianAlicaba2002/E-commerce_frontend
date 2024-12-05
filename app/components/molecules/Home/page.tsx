"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import picture1 from "./images/homeBackground.jpg";
import Navbar from "../../atoms/Navbar/page";
import Link from "next/link";
import FetchApi from "@/app/Hooks/FetchApi";
interface Product {
  id: number;
  product_id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  email: string;
}

function MainPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { getData, error, loading } = FetchApi(
    "http://127.0.0.1:8000/api/allDonMacProduct"
  );
  loading;
  const product = getData ? getData?.products : error;

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id);
      if (isInWishlist) {
        const newWishlist = prev.filter((item) => item.id !== product.id);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        return newWishlist;
      } else {
        const newWishlist = [...prev, product];
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        return newWishlist;
      }
    });
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  return (
    <>
      <Navbar />
      <title>Home</title>
      <section>
        <div className="container absolute w-[100%] h-[100vh]">
          <Image
            src={picture1}
            alt="background"
            className="w-[100%] fixed z-[-50] duration-100 animate-slow-zoom object-cover h-screen"
          />

          <div className="mt-[35%] md:mt-[25%] lg:mt-[15%] w-[100%] h-[auto] z-[100] bg-gradient-to-b from-amber-50 to-orange-100">
            <h1 className="text-4xl sm:text-5xl md:text-6xl pt-10 mx-4 md:ml-[7rem] font-sans text-amber-900 mb-6 font-semibold">
              Frozen Drinks to Cool you Down <br className="hidden sm:block" />{" "}
              This Summer!
            </h1>

            <div className="gap-4 md:gap-8 w-[95%] md:w-[90%] mx-auto md:ml-[7%] mt-[30px] md:mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {product && product.length > 0 ? (
                product.map((data: Product, index: number) => {
                  {
                    product.sort((a: any, b: any) =>
                      a.name.localeCompare(b.name)
                    );
                  }

                  const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                  return (
                    <div
                      key={`${data.id} - ${index}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="relative group">
                        <Image
                          src={imageUrl}
                          alt={`Product-${data.name}`}
                          width={1000}
                          height={1000}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link
                            href={`/components/molecules/Home/${data.product_id}/${data.name}/${data.price}/${data.description}/${data.image}`}
                            className="bg-white text-amber-600 px-4 py-2 rounded-md font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          >
                            Quick View
                          </Link>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-bold text-gray-900">
                            {data.name}
                          </h2>
                          <p className="text-xl font-bold text-amber-600">
                            &#8369;{data.price}.00
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {data.description}
                        </p>

                        <div className="flex gap-2">
                          <Link
                            href={{
                              pathname: "/components/organisms/OrderPage",
                              query: {
                                id: data.id,
                                name: data.name,
                                description: data.description,
                                price: data.price,
                                image: data.image,
                              },
                            }}
                            className="flex-1 bg-amber-600 text-center text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-300"
                            onClick={() => {
                              console.log("Added to cart:", data.name);
                            }}
                          >
                            Add to Cart
                          </Link>
                          <button
                            className="p-2 text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50 transition-colors duration-300"
                            onClick={() => toggleWishlist(data)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill={
                                wishlist.some((item) => item.id === data.id)
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
          </div>
        </div>
      </section>
    </>
  );
}

export default MainPage;
