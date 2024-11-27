"use client";
import React, { useState } from "react";
import logo from "./image/favicon.ico";
import Image from "next/image";

export default function Navbar() {
  const [showDrawer, setShowDrawer] = useState(false);

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
          <a href="/components/molecules/Landing">
            <Image
              className="absolute w-[70px] h-[55px] ml-[15px] sm:ml-[35px] mt-[0.50rem] rounded-[50%] shadow-orange-500"
              src={logo}
              alt="logo.jpg"
              width={500}
            />
          </a>
          <nav>
            <div className="navigations w-full bg-[#FFA500] mt-0 p-[20px]">
              <ul className="hidden sm:flex justify-end gap-[30%] mr-[5%] sm:ml-[75%]">
                <li>
                  <a title="Home" href="/components/molecules/Home">
                    <i className="fa-solid fa-house text-[25px] text-black transition-all duration-300 hover:text-white" />
                  </a>
                </li>
                <li>
                  <a title="Products" href="/components/molecules/Products">
                    <i className="fa-solid fa-shop text-[25px] text-black transition-all duration-300 hover:text-white" />
                  </a>
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
        <div className="container fixed flex z-[80] justify-center w-full ml-[38%]">
          {/* sm:w-auto sm:ml-[44%] */}
          {showDrawer && (
            <div
              id="drawer"
              className="absolute bg-gradient-to-b from-amber-50 to-orange-100 shadow-md shadow-black mt-[4.4%] w-[200px] sm:min-w-[10%] h-auto p-[20px] rounded-b-[10px]"
            >
              <label
                onClick={closeDrawer}
                className="flex justify-start cursor-pointer"
                htmlFor=""
              >
                ❌
              </label>
              <ul className="mt-[-5rem] sm:mt-[5rem]">
                <div className="sm:hidden">
                  <li className="mb-[5%]">
                    <a
                      href="/components/molecules/Home"
                      className="text-[1rem] cursor-pointer text-[black] hover:text-white"
                    >
                      <i className="fa-solid fa-house mr-2" />
                      Home
                    </a>
                  </li>
                  <li className="mb-[5%]">
                    <a
                      href="/components/molecules/Products"
                      className="text-[1rem] cursor-pointer text-[black] hover:text-white"
                    >
                      <i className="fa-solid fa-shop mr-2" />
                      Products
                    </a>
                  </li>
                </div>
                <li className="mb-[5%]">
                  <a
                    href="/components/molecules/AboutUs"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-[5%]">
                  <a
                    href="/components/molecules/ForPWD"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600"
                  >
                    For PWD
                  </a>
                </li>
                <li className="mb-[5%]">
                  <a
                    href="/components/molecules/ContactUs"
                    className="text-[1rem] sm:text-[1.2rem] cursor-pointer text-[black] hover:text-amber-600"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
