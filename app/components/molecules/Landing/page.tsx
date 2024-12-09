import React from "react";
import Image from "next/image";
import Link from "next/link";
import background from "./images/homeBackground.jpg";

export default function LandingPage() {
  return (
    <>
      <link
        rel="shortcut icon"
        href="../../../../public/images/logo.jpg"
        type="image/x-icon"
      />
      <title>Don Macchiatos Landing Page</title>
      <div className="relative min-h-screen w-full bg-black/80 overflow-hidden">
        <Image
          src={background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-[-1] 
            animate-fade-in transition-opacity duration-1000"
          priority
        />

        <div className="container  ml-[3rem] mt-[2rem] px-6 pt-32 md:pt-40">
          <div className="space-y-8 animate-fade-in-up">
            <h1
              className="text-5xl md:text-7xl font-bold text-[#FFA500] mb-6 
              drop-shadow-lg hover:text-orange-300 transition-colors duration-300
              animate-pulse-soft"
            >
              Don Macchiatos
            </h1>

            <p
              className="text-lg md:text-xl text-gray-100 max-w-2xl mb-8
              animate-[fade-in_0.8s_ease-out_0.3s_forwards]"
            >
              We source only the highest quality tea leaves, fresh milk, and
              natural ingredients to bring you a rich, authentic taste with
              every sip. From classic flavors to creative blends,&nbsp;
              <span
                className="text-[#FFA500] font-semibold hover:text-orange-300 
                transition-colors duration-300"
              >
                &ldquo; DON MACCHIATOS &rdquo;
              </span>{" "}
              guarantees a taste that delights.
            </p>

            <Link
              href="/components/organisms/LoginPage"
              className="inline-block px-8 py-3 bg-[#FFA500] hover:bg-[#f5b745]
                text-black font-bold rounded-full transform hover:scale-100
                transition-all duration-300 ease-in-out shadow-lg hover:shadow-orange-500/50
                opacity-0 animate-[fade-in_0.8s_ease-out_0.6s_forwards]
                hover:translate-y-[-0.10rem] hover:text-white active:bg-white"
            >
              Get started
            </Link>
          </div>

          <div
            className="absolute top-10 right-[20%] w-24 h-24 border-t-2 border-r-2 
            border-orange-400/30 animate-[spin_8s_linear_infinite]"
          />

          <div
            className="absolute top-10 right-[75%] w-24 h-24 border-t-2 border-r-2 
            border-orange-400/30 animate-[spin_8s_linear_infinite]"
          />

          <div
            className="absolute bottom-10 left-[75%] w-32 h-32 border-b-2 border-l-2 
            border-orange-400/30 animate-[spin_10s_linear_infinite]"
          />

          <div
            className="absolute bottom-10 left-[20%] w-32 h-32 border-b-2 border-l-2 
            border-orange-400/30 animate-[spin_10s_linear_infinite]"
          />
        </div>
      </div>
    </>
  );
}
