"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../atoms/Navbar/page";
import ProductIcon from "../../../../public/images/iconProduct.jpg";
import { useState, useEffect } from "react";

interface ProductType {
  id: number;
  //   product_id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>([]);
  //   const BackUpimage = "/images/placeholder.jpg";

  useEffect(() => {
    // Function to get current wishlist items
    const getWishlistItems = () => {
      const items = localStorage.getItem("wishlist");
      return items ? JSON.parse(items) : [];
    };

    // Initial load
    setWishlistItems(getWishlistItems());

    // Handle storage changes
    const handleStorageChange = () => {
      setWishlistItems(getWishlistItems());
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("wishlistUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdate", handleStorageChange);
    };
  }, []);

  //   // Add function to remove item from wishlist
  //   const removeFromWishlist = (productId: number) => {
  //     const updatedWishlist = wishlistItems.filter(
  //       (item) => item.id !== productId
  //     );
  //     setWishlistItems(updatedWishlist);
  //     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  //   };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <Navbar />
      <title>Wishlist - Don Macchiatos</title>

      <main className="container mx-auto px-4 py-8 pt-[7rem]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6">
            My Wishlist
          </h1>
        </div>

        <div className="w-[90%] ml-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((data: ProductType) => (
              <div
                key={data.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <Link href={`/product/${data.id}`}>
                  <div className="relative h-64">
                    {data.image ? (
                      <Image
                        src={`http://127.0.0.1:8000/api/storage/${data.image}`}
                        alt={data.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image src={ProductIcon} alt={data.name}></Image>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-serif text-amber-900 mb-2">
                      {data.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{data.description}</p>
                    <p className="text-amber-900 font-semibold">
                      &#8369;{data.price.toFixed(2)}
                    </p>
                  </div>
                </Link>

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
                  className="flex-1 bg-amber-600 float-right m-2 text-center text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-300"
                  onClick={() => {
                    console.log("Added to cart:", data.name);
                  }}
                >
                  Buy now
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Your wishlist is empty
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default WishlistPage;
