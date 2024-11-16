'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import picture1 from './images/homeBackground.jpg'
import Navbar from '../../atoms/Navbar/page'





interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
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
                            
                            <div className=" mt-[35%] w-[100%] h-[auto] z-[100] bg-gradient-to-b from-amber-50 to-orange-100">
                                <h1 className='text-5xl md:text-6xl pt-10 ml-[7rem] font-sans  text-amber-900 mb-6 font-semibold'>
                                    Frozen Drinks to Cool you Down <br /> This Summer!
                                </h1>
                            
                                  <div className=" gap-[50px] w-[90%] ml-[7%] mt-[50px] flex flex-1 flex-wrap">
                                        {product && product.length > 0 ? product.map((data:Product,index:number) => {
                                          {product.sort((a,b) => a.name.localeCompare(b.name))}

                                          const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                                          return ( <div key={data.id || `product${index}`}  className="z-50 products w-[28%] shadow-lg overflow-hidden rounded-[10px] mb-[20px] h-[auto] min-w-96 bg-[white]  pb-[0.90rem]  cursor-pointer duration-300 hover:scale-[1.02]">
                                              <Image 
                                                src={imageUrl}
                                                alt={`Product-${data.name} `} 
                                                width={1000} 
                                                height={1000} 
                                                className='rounded-t-[10px] w-[100%] h-[30vh] text-[black]'
                                              />
                                              <h1 className='ml-[1rem] text-[1.3rem] mt-[0.90rem] text-[black] font-semibold'>{data.name}</h1>
                                              <p className='text-[1.1rem] ml-[20px] text-black'><b>&#8369;{data.price}.00</b></p>
                                              <label className=' text-black' htmlFor="">{data.email}</label><br />
                                              <label className=' text-black ml-[1rem]' htmlFor=""><strong>Description:</strong></label>
                                              <p className="ml-[5%] text-gray-600">{data.description}</p>
                                            </div>
                                          )
                                        }) :  ( <div className="col-span-full ml-[45%] flex justify-center items-center h-64 gap-4">
                                                  <div className={`animate-spin rounded-full h-10 w-2 border-b-4 border-orange-600`}/>
                                                  <div className={`animate-spin rounded-full h-10 w-4 border-b-4 border-orange-600`}/>
                                                  <div className={`animate-spin rounded-full h-10 w-6 border-b-4 border-orange-600`}/>
                                                  <div className={`animate-spin rounded-full h-10 w-8 border-b-4 border-orange-600`}/>
                                                  <div className={`animate-spin rounded-full h-10 w-10 border-b-4 border-orange-600`}/>
                                              </div>)
                                          

                                      }
                                  </div>
                            </div>
                        </div>
                </section>
            </>
            
  )
}

export default MainPage