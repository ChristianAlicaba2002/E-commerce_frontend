import React from 'react'
import Image from 'next/image'
import Picture1 from './image/background.jpg'

function AboutUs() {
  return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin='' referrerPolicy='' />
        <title>Don Macchiatos About Us</title>
        <a href="/components/molecules/Home"><i className="fa-solid fa-arrow-left text-[#ffffff] text-[2rem] mt-[2rem] ml-[4%]  hover:text-[orange]"></i></a>
          <h1 className='text-[3rem] text-white text-center mt-[-1%]'>About Us</h1>
            <p className='text-[1rem] w-[93%] ml-[7%] font-extralight tracking-wider'>
            A Don Macchiato is a popular espresso-based coffee drink that combines espresso, steamed milk, and caramel to create a sweet, creamy, and bold flavor profile. It’s often confused with other macchiato drinks like the Latte Macchiato and the Espresso Macchiato, but it has its own distinct preparation and taste.

            Origin of the Macchiato
            The term "macchiato" comes from Italy and means "stained" or "spotted." Traditionally, a macchiato is an espresso "stained" with a small amount of milk to soften the bitterness of the coffee. However, with modern adaptations, especially in North America, various types of macchiatos have developed with additional milk and sweeteners.

            Don Macchiato Ingredients
            A Don Macchiato typically contains:

            Espresso – A shot or double shot of rich, intense espresso forms the base.
            Steamed Milk – Small amounts of steamed milk are added for creaminess, but not as much as in a latte.
            Foamed Milk – Light foam on top to add texture.
            Caramel Drizzle – A caramel topping, usually in a crisscross pattern, adds sweetness and visual appeal.
            Optional Syrup Flavors – Vanilla, hazelnut, or cinnamon syrups are sometimes added for extra sweetness.
            Variants of the Macchiato
            Caramel Macchiato: This popular version adds vanilla syrup to the steamed milk, with the espresso poured over it, followed by a caramel drizzle.
            Latte Macchiato: Milk is poured first, followed by espresso, resulting in a "spotted" look with the coffee on top.
            Espresso Macchiato: A simple espresso shot with just a touch of foamed milk, it’s the most classic form of macchiato.
            How to Make a Don Macchiato
            To make one at home, follow these steps:

            Brew Espresso: Use a shot or double shot of high-quality espresso.
            Steam the Milk: Heat a small amount of milk (usually about a third of the amount of espresso) and froth it.
            Assemble: Pour the espresso into a glass, then add the steamed milk and top with a dollop of milk foam.
            Caramel Drizzle: Drizzle caramel syrup over the top in a lattice or crisscross pattern.
            Serving Suggestions
            A Don Macchiato is generally served in a small glass or demitasse cup, enhancing its layered appearance and rich flavor.
            </p>
              <div className='flex'>
                <Image className='w-[600px] h-[450px] ml-[10%] mt-[2%] rounded-lg' src={Picture1} alt='Picture.jpg'></Image>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7848.569861895267!2d123.9917422!3d10.3989294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bda7e9ccb2b7%3A0xd7554a9a837925aa!2sDon%20Macchiatos%20-%20Poblacion%20Liloan!5e0!3m2!1sen!2sph!4v1730517270537!5m2!1sen!2sph" width="600" height="450" className='border-[0] mt-[2%] ml-[5%] mb-[3rem] rounded-lg' allowFullScreen  loading="lazy" referrerPolicy='no-referrer-when-downgrade'></iframe>  
              </div>
              
      </div>
  )
}

export default AboutUs