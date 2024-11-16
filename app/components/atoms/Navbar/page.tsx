"use client"
import React, { useState } from 'react'
import logo from "./image/favicon.ico"
import Image from 'next/image'

export default function Navbar() {

    const [showDrawer , setShowDrawer] = useState(false)

    const clickDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    const closeDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    
  return (
    <>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>

            <header>
        
                    <div className='w-[100%] h-[5vh] bg-white fixed z-[80]'>
                    {/* <h3 className='absolute text-[1.6rem] ml-[2%] mt-[10px] '>Don Macchiatos</h3> */}
                    <a href="/components/molecules/Landing"><Image className='absolute w-[70px] h-[55px] ml-[35px] mt-[0.50rem] rounded-[50%] shadow-orange-500' src={logo} alt='logo.jpg' width={500}></Image></a>
                        <nav>
                            <div className="navigations w-[100%] bg-[#FFA500] mt-[0] p-[20px]">
                                <ul className='flex gap-[30%] ml-[75%]'>
                                    <li><a title='Home' href='/components/molecules/Home'><i className="fa-solid fa-house text-[25px] text-[black] transition-all duration-300  hover:text-[white]"/></a></li>
                                    <li><a title='Products' href="/components/molecules/Products"><i className="fa-solid fa-shop text-[25px] text-[black] transition-all duration-300  hover:text-[white]"/></a></li>
                                    <li className='mr-[16%] cursor-pointer'  title='Menu'><i id='drawerIcon' onClick={clickDrawer} className="fa-solid fa-bars text-[25px] text-[black] transition-all duration-300 hover:text-[white]"/></li> 
                                    {/* <li title='Items you cart'><i id='cartIcon' className="fa-solid fa-cart-shopping text-[25px] cursor-pointer text-black  hover:text-orange-700"/></li> */}
                                </ul>
                            </div>
                        </nav>
                    </div>
            </header>

            <aside>
                     <div className="container fixed flex z-[80] justify-center ml-[44%]">
                          { showDrawer ? <div id='drawer' className="absolute bg-[black] mt-[4.4%] min-w-[10%] h-[auto] p-[20px] rounded-b-[10px] duration-[1s]">
                                            <label id='closeMenu' onClick={closeDrawer}  className='flex justify-starts cursor-pointer' htmlFor="">❌</label>
                                        <ul className='mt-[5rem]'>
                                            {/* <li className='mb-[25px]'><label className='text-[25px] cursor-pointer  text-black' htmlFor="">Your information</label></li> */}
                                            <li className='mb-[5%]'><a href='/components/molecules/AboutUs'  className='text-[1.2rem] cursor-pointer  text-[orange]  hover:text-[#ffffff]'>About us</a></li>
                                            <li className='mb-[5%]'><a href='/components/molecules/ForPWD'  className='text-[1.2rem] cursor-pointer  text-[orange]  hover:text-[#ffffff]'>For PWD</a></li>
                                            <li className='mb-[5%]'><a href='/components/molecules/ContactUs' className='text-[1.2rem] cursor-pointer  text-[orange]  hover:text-[#ffffff] hover:translate-y-5'>Contact us</a></li>
                                            {/* <li className='mb-[25px]'><label className='text-[1.2rem] text-[red] cursor-pointer' htmlFor="">Sign out</label></li> */}
                                        </ul>
                      </div> : '' }   
                    </div> 
                    

              </aside>

              {/* <aside>
                    <div id='cartPage' className="mycart hidden ml-[65%] w-[35%] fixed mt-[66px] h-[auto] bg-orange-300 z-10">
                    <label id='closeCart' className='flex justify-starts cursor-pointer ml-[10px] mt-[20px]' htmlFor="">❌</label>
                        <h1 className='text-center text-[1.2rem] font-sans mt-[10px] font-semibold text-black'>MY CART</h1>
                        <div className="buttons flex">
                            <button className=' bg-slate-200 w-[40%] p-[20px]  text-black'  type="submit">Subtotal: <b>&#8369;1000</b></button>
                            <button className='bg-red-700 w-[60%] text-white hover:bg-red-500' type="submit">Check out</button> 
                        </div>
                        
                    </div>
              </aside> */}

            
    </>
  )
}
