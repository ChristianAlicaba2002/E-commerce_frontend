"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import picture1 from "./images/homeBackground.jpg";
import Navbar from "../../atoms/Navbar/page";
import Link from "next/link";
import FetchApi from "@/app/Hooks/FetchApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Hooks/useAuth";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  email: string;
}

async function feth() {
  const response = await fetch('http://127.0.0.1:8000/api/allDonMacProduct')
  // .then(res => console.log(res))
  // .then(data => console.log(data))  

  const data = await response.json();
  console.log(data)


}


function MainPage() {
  const [favorite, setFavorite] = useState<Product[]>([]);
  const { getData, error, loading } = FetchApi(
    "http://127.0.0.1:8000/api/allDonMacProduct"
  );
  loading;
  const product = getData ? getData?.products : error;
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/components/organisms/LoginPage');
    }
  }, [isAuthenticated, router]);


  const toggleFavorite = (product: Product) => {
    setFavorite((prev) => {
      const isInFavorites = prev.some((item) => item.id === product.id);
      if (isInFavorites) {
        const favorites = prev.filter((item) => item.id !== product.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return favorites;
      } else {
        const favorites = [...prev, product];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return favorites;
      }
    });
    window.dispatchEvent(new Event("favoritesUpdate"));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorite(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* <title>Home</title> */}
      <section>
        <div className="container absolute w-[100%] h-[100vh] md:h-[100%] md:w-[100%] lg:w-[100%] lg:h-[100%]">
          <Image
            src={picture1}
            alt="background"
            className="w-[150%] fixed z-[-50] duration-100 animate-slow-zoom object-cover h-screen sm:w-[100%] md:w-[100%] lg:w-[100%]"
          />

          <div className="mt-[35%] w-[100%] h-[auto] z-[100] bg-gradient-to-b from-amber-50 to-orange-100 md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] md:mt-[25%] lg:mt-[15%]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl pt-10 mx-4 md:ml-[2rem] font-sans text-amber-900 mb-6 font-semibold">
              Frozen Drinks to Cool you Down <br className="hidden sm:block" />{" "}
              This Summer!
            </h1>

            <div className="w-full grid grid-cols-1 px-1 md:gap-0 md:w-[100%] sm:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] mx-auto md:grid-cols-2 lg:grid-cols-4">
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
                      key={`${data.id}-${index}`}
                      className="bg-white flex flex-col gap-0 mx-auto mb-4 w-[90%] h-auto rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
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
                            href={`/components/molecules/Home/${data.id}/${data.name}/${data.price}/${data.description}/${data.image}`}
                            className="bg-white text-amber-600 px-3 py-1 text-sm rounded-md font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          >
                            Quick View
                          </Link>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="block justify-between items-start mb-2">
                          <h5 className="text-lg font-serif text-amber-900">
                            {data.name}
                          </h5>
                          <p className="text-lg font-bold text-amber-600">
                            &#8369;{data.price}.00
                          </p>
                        </div>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {data.description}
                        </p>

                        <div className="flex gap-1">
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
                            className="flex-1 bg-amber-500 text-center text-white text-sm py-1.5 px-3 rounded-md hover:bg-amber-400 transition-colors duration-300"
                            onClick={() => {
                              console.log("Added to cart:", data.name);
                            }}
                          >
                            Add to Cart
                          </Link>
                          <button
                            className="p-1.5 text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50 transition-colors duration-300"
                            onClick={() => toggleFavorite(data)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill={
                                favorite.some((item) => item.id === data.id)
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
