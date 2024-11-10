'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import picture1 from './images/homeBackground.jpg'
import productpic from '../Login/image/background.jpg'
import Navbar from '../../atoms/Navbar/page'


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  email: string;
}
function MainPage() {

  const [product,setProduct] = useState<Product[]>();

    useEffect(()=> {

      const fetchProduct = async ()=> {
        const response = await fetch("http://127.0.0.1:8000/api/allDonMacProduct",{
          method:"GET",
        });

      try {
        if(response){
          const getProduct = await response.json()
          if(getProduct){
            setProduct(getProduct.products)
          }
        } 
      } catch (error) {
          console.error(error)
      }
      
    }

      fetchProduct()

    },[]  )

  return (
            <>  
            <Navbar />
              
              <title>Home</title>
                <section>
                        <div className="container absolute w-[100%] h-[100vh]">
                            <Image src={picture1} alt="background" className='w-[100%] fixed z-[-50] duration-100 animate-slow-zoom object-cover'/>
                            <div className="mainImage mt-[50%] w-[100%] h-[auto] z-[100]  bg-[#000000c6]">
                                <h1 className='text-[3rem] mt-10 ml-[7rem] text-orange-400 font-bold font-serif'>Frozen Drinks to Cool you Down <br /> This Summer!</h1>
                            
                                  <div className=" gap-[50px] w-[90%] ml-[7%] mt-[50px] flex flex-1 flex-wrap">
                                        {product && product.length > 0 ? product.map((data:Product,index:number) => {
                                          const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                                          console.log('Image URL:', imageUrl);
                                          return (
                                            <div key={data.id || `product${index}`}  className="z-50 products w-[20%] rounded-[10px] mb-[20px] h-[auto] bg-orange-400 pb-[20px]  cursor-pointer transition-[1s] hover:scale-[1.05]">
                                              <Image 
                                                src={imageUrl}
                                                alt={`Product-${data.name} `} 
                                                width={1000} 
                                                height={1000} 
                                                className='rounded-t-[10px] w-[100%] h-[30vh] text-[white]'
                                              />
                                              <h1 className='ml-[1rem] text-[1.3rem] mt-[0.90rem] text-[black] font-semibold'>{data.name}</h1>
                                              <p className='text-[1.1rem] ml-[20px] text-[black]'><b>&#8369;{data.price}.00</b></p>
                                              <label className='text-[black]' htmlFor="">{data.email}</label><br />
                                              <label className='ml-[20px] text-[black]' htmlFor="">⭐⭐⭐⭐(121)</label><br />
                                            </div>
                                          )
                                        }) : <h1 className='text-[2rem] text-center w-[100%] text-white'>Please Wait...</h1> }  

                                  </div>
                            </div>
                        </div>
                </section>
            </>
            
  )
}

export default MainPage