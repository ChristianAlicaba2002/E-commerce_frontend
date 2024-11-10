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
            A Don Macchiato is a popular espresso-based coffee drink that combines espresso&#44; steamed milk&#44; and caramel to create a sweet&#44; creamy&#44; and bold flavor profile. It&quot;s often confused with other macchiato drinks like the Latte Macchiato and the Espresso Macchiato&#44; but it has its own distinct preparation and taste.

            Origin of the Macchiato
            The term &quot;macchiato&quot; comes from Italy and means &quot;stained&quot; or &quot;spotted&quot; Traditionally&#44; a macchiato is an espresso &quot;stained&quot; with a small amount of milk to soften the bitterness of the coffee. However&#44; with modern adaptations&#44; especially in North America&#44; various types of macchiatos have developed with additional milk and sweeteners.
            
            Don Macchiato Ingredients
            A Don Macchiato typically contains&#58;

            Espresso  A shot or double shot of rich&#44; intense espresso forms the base.
            Steamed Milk  Small amounts of steamed milk are added for creaminess&#44; but not as much as in a latte.
            Foamed Milk Light foam on top to add texture.
            Caramel Drizzle A caramel topping&#44; usually in a crisscross pattern&#44; adds sweetness and visual appeal.
            Optional Syrup Flavors  Vanilla&#44; hazelnut&#44; or cinnamon syrups are sometimes added for extra sweetness.
            Variants of the Macchiato
            Caramel Macchiato&#58; This popular version adds vanilla syrup to the steamed milk&#44; with the espresso poured over it&#44; followed by a caramel drizzle.
            Latte Macchiato&#58; Milk is poured first&#44; followed by espresso&#44; resulting in a &quot;spotted&quot; look with the coffee on top.
            Espresso Macchiato&#58; A simple espresso shot with just a touch of foamed milk&#44; it&quot;s the most classic form of macchiato.
            How to Make a Don Macchiato
            To make one at home&#44; follow these steps&#58;

            Brew Espresso&#58; Use a shot or double shot of high-quality espresso.
            Steam the Milk&#58; Heat a small amount of milk (usually about a third of the amount of espresso) and froth it.
            Assemble&#58; Pour the espresso into a glass&#44; then add the steamed milk and top with a dollop of milk foam.
            Caramel Drizzle&#58; Drizzle caramel syrup over the top in a lattice or crisscross pattern.
            Serving Suggestions
            A Don Macchiato is generally served in a small glass or demitasse cup&#44; enhancing its layered appearance and rich flavor.
            </p>
              <div className='flex'>
                <Image className='w-[600px] h-[450px] ml-[10%] mt-[2%] rounded-lg' src={Picture1} alt='Picture.jpg'></Image>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7848.569861895267!2d123.9917422!3d10.3989294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bda7e9ccb2b7%3A0xd7554a9a837925aa!2sDon%20Macchiatos%20-%20Poblacion%20Liloan!5e0!3m2!1sen!2sph!4v1730517270537!5m2!1sen!2sph" width="600" height="450" className='border-[0] mt-[2%] ml-[5%] mb-[3rem] rounded-lg' allowFullScreen  loading="lazy" referrerPolicy='no-referrer-when-downgrade'></iframe>  
              </div>
              
      </div>
  )
}

export default AboutUs