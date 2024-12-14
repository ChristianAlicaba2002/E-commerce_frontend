"use client";
import React, { useEffect, useState } from "react";
import logo from "./image/favicon.ico";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const getFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoritesCount(favorites.length);
    };

    getFavoritesCount();

    window.addEventListener("storage", getFavoritesCount);

    window.addEventListener("favoritesUpdated", getFavoritesCount);

    return () => {
      window.removeEventListener("storage", getFavoritesCount);
      window.removeEventListener("favoritesUpdated", getFavoritesCount);
    };
  }, []);

  const clickDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const closeDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <header>
        <div className="w-full h-[5vh] bg-white fixed z-[80]">
          <Link href="/components/molecules/Landing">
            <Image
              className="absolute w-[70px] h-[55px] ml-[15px] sm:ml-[35px] mt-[0.50rem] rounded-[50%] shadow-orange-500"
              src={logo}
              alt="logo.jpg"
              width={500}
            />
          </Link>
          <nav>
            <div className="navigations w-full bg-[#FFA500] mt-0 p-[20px]">
              <ul className="hidden sm:flex justify-end gap-[30%] mr-[5%] sm:ml-[75%]">
                <li>
                  <Link title="Home" href="/components/molecules/Home">
                    <i className="fa-solid fa-house text-[25px] text-black transition-all duration-300 hover:text-white" />
                  </Link>
                </li>
                <li>
                  <Link title="Products" href="/components/molecules/Products">
                    <i className="fa-solid fa-shop text-[25px] text-black transition-all duration-300 hover:text-white" />
                  </Link>
                </li>
                <li>
                  <Link href="/components/organisms/AllFavorites">
                    <div className="relative">
                      <i className="fa-solid fa-heart text-[25px] text-black transition-all duration-300 hover:text-white"></i>
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {favoritesCount}
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="cursor-pointer" title="Menu">
                  <i
                    onClick={clickDrawer}
                    className="fa-solid fa-bars text-[25px] text-black transition-all duration-300 hover:text-white"
                  />
                </li>
              </ul>

              <ul className="sm:hidden flex justify-end mr-[5%]">
                <li className="cursor-pointer" title="Menu">
                  <i
                    onClick={clickDrawer}
                    className="fa-solid fa-bars text-[20px] text-black transition-all duration-300 hover:text-white"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <aside>
        <div className="container fixed flex z-[80] justify-end w-full">
          {showDrawer && (
            <div
              id="drawer"
              className="absolute bg-gradient-to-b from-amber-50 to-orange-100 shadow-md shadow-black right-0 w-[200px] h-auto p-[20px] rounded-b-[10px]
                sm:mt-[9vh]  sm:right-4"
            >
              <label
                onClick={closeDrawer}
                className="flex justify-end cursor-pointer mb-4"
                htmlFor=""
              >
                ❌
              </label>
              <ul className="flex flex-col gap-4">
                <div className="sm:hidden space-y-4">
                  <li>
                    <Link
                      href="/components/molecules/Home"
                      className="text-[1rem] cursor-pointer text-[black] hover:text-white flex items-center"
                    >
                      <i className="fa-solid fa-house mr-2" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/components/molecules/Products"
                      className="text-[1rem] cursor-pointer text-[black] hover:text-white flex items-center"
                    >
                      <i className="fa-solid fa-shop mr-2" />
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/components/organisms/AllFavorites"
                      className="text-[1rem] cursor-pointer text-[black] hover:text-white flex items-center"
                    >
                      <div className="relative">
                        <i className="fa-solid fa-heart text-[25px] text-black transition-all duration-300 hover:text-white"></i>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {favoritesCount}
                        </span>
                      </div>
                      <p className="ml-2">Favorites</p>
                    </Link>
                  </li>
                </div>
                <li>
                  <Link
                    href="/components/molecules/AboutUs"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600 block"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/components/molecules/ForPWD"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600 block"
                  >
                    For PWD
                  </Link>
                </li>
                <li>
                  <Link
                    href="/components/molecules/ContactUs"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600 block"
                  >
                    Contact us
                  </Link>
                </li>

              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
