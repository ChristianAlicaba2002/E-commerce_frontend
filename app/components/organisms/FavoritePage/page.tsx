"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../atoms/Navbar/page";
import ProductIcon from "../../../../public/images/iconProduct.jpg";
import { useState, useEffect } from "react";

interface ProductType {
  id: number;
  product_id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesItems, setFavoritesItems] = useState<ProductType[]>([]);

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favoritesItems.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoritesItems(updatedFavorites);
    window.dispatchEvent(new Event("favoritesUpdate"));
    alert("Removed from Favorites");
  };

  useEffect(() => {
    const getFavoritesItems = () => {
      const items = localStorage.getItem("favorites");
      return items ? JSON.parse(items) : [];
    };

    setFavoritesItems(getFavoritesItems());

    const handleStorageChange = () => {
      setFavoritesItems(getFavoritesItems());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdate", handleStorageChange);
    };
  }, []);

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
      <title>Favorites - Don Macchiatos</title>

      <main className="container mx-auto px-4 py-8 pt-[7rem]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6">
            Favorites
          </h1>
          <p className="text-gray-600">Here are your favorite items.</p>
        </div>

        <div className="w-[80%] ml-[10%] gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritesItems.length > 0 ? (
            favoritesItems.map((data: ProductType) => (
              <div
                key={data.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={`/product/${data.id}`}>
                  <div className="relative h-48">
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
                  <div className="p-3">
                    <h3 className="text-lg font-serif text-amber-900 mb-1">
                      {data.name}
                    </h3>
                    <p className="text-gray-600 mb-1 text-sm">
                      {data.description}
                    </p>
                    <p className="text-amber-900 font-semibold text-sm">
                      &#8369;{data.price.toFixed(2)}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-between p-2">
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
                    className="flex-1 bg-amber-500 text-center text-white py-1.5 px-3 text-sm rounded-md hover:bg-amber-400 transition-colors duration-300 mr-2"
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    Buy now
                  </Link>

                  <button
                    onClick={() => removeFromFavorites(data.id)}
                    className="bg-red-500 text-white py-1.5 px-3 text-sm rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Your Favorites items is empty
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
