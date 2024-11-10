'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '../../atoms/Navbar/page'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function ProductPage() {

  const [product,setProduct] = useState<Product[]>();

    useEffect(()=> {
      const fetchProduct = async ()=> {
        const response = await fetch("http://127.0.0.1:8000/api/AllSpecialProduct",{
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

      const filterProduct = () => {
        product?.sort((a,b) => b.price - a.price)

        return product
      }
      filterProduct()

    },[]  )



  return (
    <>
        <Navbar />
        <title>Don Macchiatos Products</title>
        <div className='h-[200vh] w-[100%] bg-[#171717f1] pt-[auto]'>

            <div className='mt-[3%] absolute'>
              <h1 className='mt-[2rem] text-center text-[2.5rem] ml-[5%] text-[white] font-serif'>Available Products</h1>
              <p className='w-[90%] text-center ml-[5%] text-[white]'>Discover our carefully curated selection of premium coffee beverages and delightful accompaniments. From our signature macchiatos to freshly baked pastries, each item is crafted to enhance your coffee experience. Our menu celebrates the perfect harmony between rich espresso and complementary treats.</p>
              { product && product.length > 0 ? <h3 className='mt-[2rem] text-[2.5rem] ml-[10%] text-[white] font-serif tracking-wider'>Pizza's</h3> : ""}
            <div className=" gap-[50px] w-[90%] ml-[10%] mt-[1.3rem] flex flex-4 flex-wrap">
            
              {product && product.length > 0 ? product.map((data:Product, index:number) => {
                 const imageUrl = `http://127.0.0.1:8000/api/storage/${data.image}`;
                return <div key={data.id || `product${index}`} className="z-50 products w-[20%] rounded-[10px] mb-[20px] h-[auto] bg-orange-400 pb-[20px]  cursor-pointer transition-[1s] hover:scale-[1.05]">
                            <Image src={imageUrl} alt={`Product-${data.name}`} width={1000} height={1000} className='rounded-t-[10px] w-[100%] h-[30vh]'></Image>
                            <h1 className='ml-[1rem] text-[1.3rem] mt-[0.90rem] text-[black] font-semibold'>{data.name}</h1>
                            <p className='text-[1.1rem] ml-[20px] text-[black]'><b>&#8369;{data.price}.00</b></p>
                            <label className='ml-[20px] text-[black]' htmlFor="">⭐⭐⭐⭐(121)</label><br />
                        </div>
                }) : <h1 className='text-[2rem] ml-[40%] mt-[10%] w-[100%] text-[white]'>Please Wait...</h1>}
              </div>
            </div> 
        </div> 
    </>
    
  )
}

export default ProductPage
