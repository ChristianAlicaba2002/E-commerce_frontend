'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import picture1 from './images/homeBackground.jpg'
import Navbar from '../../atoms/Navbar/page'
import useGetDataDonMacchiatos from '@/app/Hooks/useGetDataDonMacchiatos'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  email: string;
}

function MainPage() {

  const {getData, error, loading} = useGetDataDonMacchiatos("http://127.0.0.1:8000/api/allDonMacProduct");
  const product =  getData ? getData?.products : loading;

  return (
    <>
      <Navbar />
      <title>Home</title>
      <section>

        <div className="container absolute w-[100%] h-[100vh]">
          <Image src={picture1} alt="background" className='w-[100%] fixed z-[-50] duration-100 animate-slow-zoom object-cover h-screen' />

          <div className="mt-[35%] md:mt-[25%] lg:mt-[15%] w-[100%] h-[auto] z-[100] bg-gradient-to-b from-amber-50 to-orange-100">
            <h1 className='text-4xl sm:text-5xl md:text-6xl pt-10 mx-4 md:ml-[7rem] font-sans text-amber-900 mb-6 font-semibold'>
              Frozen Drinks to Cool you Down <br className="hidden sm:block" /> This Summer!
            </h1>

            <div className="gap-4 md:gap-8 w-[95%] md:w-[90%] mx-auto md:ml-[7%] mt-[30px] md:mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {product && product.length > 0 ? product.map((data: Product, index: number) => {
                { product.sort((a:any, b:any) => a.name.localeCompare(b.name)) }

                const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                return (
                  <div key={data.id || `product${index}`} className="z-50 products w-full shadow-lg overflow-hidden rounded-[10px] mb-[20px] h-[auto] bg-[white] pb-[0.90rem] cursor-pointer duration-300 hover:scale-[1.02]">
                    <Image
                      src={imageUrl}
                      alt={`Product-${data.name}`}
                      width={1000}
                      height={1000}
                      className='rounded-t-[10px] w-[100%] h-[30vh] object-cover text-[black]'
                    />
                    <div className="px-4 md:px-6">
                      <h1 className='text-[1.3rem] mt-[0.90rem] text-[black] font-semibold'>{data.name}</h1>
                      <p className='text-lg font-serif  text-amber-600'><b>&#8369;{data.price}.00</b></p>
                      <label className='text-black' htmlFor="">{data.email}</label><br />
                      <label className='text-black' htmlFor=""><strong>Description:</strong></label>
                      <p className="text-gray-600">{data.description}</p>
                    </div>
                  </div>
                )
              }) : (
                <div className="col-span-full flex justify-center items-center h-64 gap-4">
                  <div className={`animate-spin rounded-full h-10 w-2 border-b-4 border-orange-600`} />
                  <div className={`animate-spin rounded-full h-10 w-4 border-b-4 border-orange-600`} />
                  <div className={`animate-spin rounded-full h-10 w-6 border-b-4 border-orange-600`} />
                  <div className={`animate-spin rounded-full h-10 w-8 border-b-4 border-orange-600`} />
                  <div className={`animate-spin rounded-full h-10 w-10 border-b-4 border-orange-600`} />
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
    </>

  )
}

export default MainPage