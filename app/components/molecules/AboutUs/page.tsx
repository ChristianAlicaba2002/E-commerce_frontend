"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Chart } from "chart.js/auto";
import { _adapters } from "chart.js";
import Picture1 from "./image/background.jpg";

function AboutUs() {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement | null;
    if (!ctx) return;

    const labels = [
      "Dark Forest",
      "Ice Caramel",
      "Matcha",
      "Matcha Berry",
      "Donya Berry",
      "Premium Dark Chocolate",
    ];
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Popular Don Macchiatos Products (Sales per Week)",
            data: [65, 85, 75, 81, 56, 90, 70],
            backgroundColor: [
              "rgba(139, 69, 19, 0.6)",
              "rgba(210, 180, 140, 0.6)",
              "rgba(160, 82, 45, 0.6)",
              "rgba(101, 67, 33, 0.6)",
              "rgba(219, 112, 147, 0.6)",
              "rgba(205, 133, 63, 0.6)",
              "rgba(244, 164, 96, 0.6)",
            ],
            borderColor: [
              "rgba(139, 69, 19, 1)",
              "rgba(210, 180, 140, 1)",
              "rgba(160, 82, 45, 1)",
              "rgba(101, 67, 33, 1)",
              "rgba(219, 112, 147, 1)",
              "rgba(205, 133, 63, 1)",
              "rgba(244, 164, 96, 1)",
            ],
            borderWidth: 1,
            hoverBackgroundColor: "rgba(205, 133, 63, 0.8)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Orders",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Don Macchiatos Product Performance",
          },
        },
      },
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin=""
        referrerPolicy=""
      />
      <title>Don Macchiatos About Us</title>
      <div className="w-[80%] mt-[0.90rem] mx-auto h-1 bg-[black]"></div>

      <a href="/components/molecules/Home">
        <i className="fa-solid fa-arrow-left text-[black] text-[1.5rem] md:text-[2rem] mt-[2rem] ml-[4%] hover:text-[#FFA500]"></i>
      </a>

      <h1 className="text-[2rem] md:text-[3rem] text-black text-center mt-[-1%]">
        About Us
      </h1>

      <p className="text-[0.9rem] md:text-[1rem] text-black w-[90%] md:w-[93%] mx-auto md:ml-[7%] font-medium tracking-wider px-4 md:px-0"></p>

      <div className="w-[60%] ml-[20%] mt-[2%] h-[50vh] md:h-[65vh]">
        <canvas id="myChart"></canvas>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-0">
        <Image
          className="w-full md:w-[600px] h-[300px] md:h-[450px] mx-auto md:ml-[10%] mt-[2%] rounded-lg object-cover"
          src={Picture1}
          alt="Picture.jpg"
        />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7848.569861895267!2d123.9917422!3d10.3989294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bda7e9ccb2b7%3A0xd7554a9a837925aa!2sDon%20Macchiatos%20-%20Poblacion%20Liloan!5e0!3m2!1sen!2sph!4v1730517270537!5m2!1sen!2sph"
          className="w-full md:w-[600px] h-[300px] md:h-[450px] mx-auto md:ml-[5%] mt-[2%] mb-[3rem] rounded-lg border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default AboutUs;
