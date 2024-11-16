'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import {Chart} from 'chart.js/auto';
import {_adapters} from 'chart.js'; 
import Picture1 from './image/background.jpg'

function AboutUs() {

    useEffect(() => {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
      if (!ctx) return;
      
      const labels = ['Dark Forest', 'Ice Caramel', 'Matcha', 'Matcha Berry', 'Donya Berry', 'Premium Dark Chocolate']; 
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Popular Don Macchiatos Products (Sales per Week)',
            data: [65, 85, 75, 81, 56, 90, 70],
            backgroundColor: [
              'rgba(139, 69, 19, 0.6)',    // Coffee brown
              'rgba(210, 180, 140, 0.6)',  // Light coffee
              'rgba(160, 82, 45, 0.6)',    // Saddle brown
              'rgba(101, 67, 33, 0.6)',    // Dark coffee
              'rgba(219, 112, 147, 0.6)',  // Caramel pink
              'rgba(205, 133, 63, 0.6)',   // Peru brown
              'rgba(244, 164, 96, 0.6)'    // Sandy brown
            ],
            borderColor: [
              'rgba(139, 69, 19, 1)',
              'rgba(210, 180, 140, 1)',
              'rgba(160, 82, 45, 1)',
              'rgba(101, 67, 33, 1)',
              'rgba(219, 112, 147, 1)',
              'rgba(205, 133, 63, 1)',
              'rgba(244, 164, 96, 1)'
            ],
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(205, 133, 63, 0.8)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Orders'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Don Macchiatos Product Performance'
            }
          }
        }
      });
    }, []);
  

  return (

    <div className='bg-gradient-to-b from-amber-50 to-orange-100'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin='' referrerPolicy='' />
        <title>Don Macchiatos About Us</title>
        <div className='w-[80%] mt-[0.90rem] ml-[10%] h-1 bg-[black]'></div>
        <a href="/components/molecules/Home"><i className="fa-solid fa-arrow-left text-[black] text-[2rem] mt-[2rem] ml-[4%]  hover:text-[#FFA500]"></i></a>
          <h1 className='text-[3rem] text-black text-center mt-[-1%]'>About Us</h1>
            <p className='text-[1rem] text-black w-[93%] ml-[7%] font-medium tracking-wider'>
                Don Macchiatos is a beloved coffee destination that has mastered the art of crafting exceptional espresso-based beverages. Our signature drink, the Don Macchiato, represents the perfect harmony of rich espresso, velvety steamed milk, and indulgent caramel, creating an unforgettable coffee experience.

                  Our Story
                  Founded with a passion for coffee excellence, Don Macchiatos has grown from a small local café into a cherished establishment known for its dedication to quality and innovation. Our skilled baristas combine traditional Italian coffee-making techniques with modern creativity to deliver drinks that delight and inspire.

                  Our Signature Drinks
                  At the heart of our menu is the classic Don Macchiato – a perfectly balanced combination of bold espresso and silky steamed milk, crowned with our house-made caramel drizzle. We've expanded our offerings to include unique variations like the Dark Forest Macchiato, Ice Caramel Macchiato, and our popular Matcha series, each crafted with the same attention to detail and quality.

                  Quality & Ingredients
                  We source only the finest coffee beans, carefully selected and roasted to bring out their optimal flavor profile. Our milk is locally sourced, and our syrups are made with premium ingredients. Every drink is crafted to order, ensuring the freshest and most delightful experience for our customers.

                  Community & Culture
                  Don Macchiatos is more than just a coffee shop – it's a community hub where people come together to share moments, create memories, and enjoy exceptional coffee. Our warm, welcoming atmosphere and friendly staff make every visit special, whether you're starting your day, meeting friends, or seeking a quiet moment with your favorite drink.
                  Our Commitment
                  We are committed to:
                  Visit Us
                  Experience the Don Macchiatos difference at our location in Poblacion Liloan. Whether you're a coffee connoisseur or new to the world of specialty coffee, our team is ready to serve you the perfect cup that keeps you coming back for more.
              </p>
            <div className=' justify-center w-[70%] mt-[2%] h-[65vh] ml-[20%]'>
                <canvas id="myChart"></canvas>
            </div>  
              <div className='flex'>
                <Image className='w-[600px] h-[450px] ml-[10%] mt-[2%] rounded-lg' src={Picture1} alt='Picture.jpg'></Image>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7848.569861895267!2d123.9917422!3d10.3989294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bda7e9ccb2b7%3A0xd7554a9a837925aa!2sDon%20Macchiatos%20-%20Poblacion%20Liloan!5e0!3m2!1sen!2sph!4v1730517270537!5m2!1sen!2sph" width="600" height="450" className='border-[0] mt-[2%] ml-[5%] mb-[3rem] rounded-lg' allowFullScreen  loading="lazy" referrerPolicy='no-referrer-when-downgrade'></iframe>  
              </div>
              
      </div>
  )
}

export default AboutUs