'use client'
import React from 'react';
import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa';

function PwdPage() {  
  const getInTouch = () => {
    window.location.href = 'https://facebook.com';
  };
  return (

    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
    <title>Don Macchiatos For PWD</title>
    <div className="min-h-screen p-8 bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto ">
        <div className='w-[100%] h-1 bg-[#FFA500]'></div>
      <a href="/components/molecules/Home"><i className="fa-solid fa-arrow-left text-[black] text-[2rem] mt-[2rem] hover:text-[#FFA500]"></i></a>
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[black] mb-4">
            Support for Persons with Disabilities
          </h1>
          <p className="text-lg text-[black]">
            Empowering and supporting our community members with accessible services and resources
          </p>

        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <ServiceCard
            icon={<FaWheelchair className="text-4xl"/>}
            title="Mobility Support"
            description="Access to mobility aids, ramps, and assistance services for physical disabilities"
          />
          <ServiceCard
            icon={<FaSignLanguage className="text-4xl" />}
            title="Communication Services"
            description="Sign language interpretation and communication aids for hearing impaired individuals"
          />
          <ServiceCard
            icon={<FaUniversalAccess className="text-4xl" />}
            title="Accessibility Programs"
            description="Educational and employment programs designed for PWD integration"
          />
        </div>

        <section className="bg-[white] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-whit mb-6">Available Resources</h2>
          <ul className="space-y-4 text-white">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-[#171717] flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-black">{resource.title}</h3>
                  <p className="text-black">{resource.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-black">Need Assistance?</h2>
          <p className="mb-4 text-black">Contact our PWD Support Team</p>
          <button onClick={getInTouch} className="bg-[#FFA500] text-black font-medium  px-6 py-3 transition-all duration-300 ease-in-out rounded-lg hover:bg-orange-500 shadow-lg hover:shadow-orange-500/50 hover:text-white">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
    </>
  );
}

const ServiceCard = ({ icon, title, description }:any) => (
  <div className="bg-[white] p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-[1.03] transition">
    <div className="text-[black] mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-800">{description}</p>
  </div>
);


const resources = [
  {
    title: "PWD ID Registration",
    description: "Guide on how to obtain your PWD identification card"
  },
  {
    title: "Benefits and Privileges",
    description: "Information about discounts and special privileges for PWDs"
  },
  {
    title: "Support Groups",
    description: "Connect with local PWD support groups and communities"
  },
  {
    title: "Healthcare Services",
    description: "Access to specialized healthcare services and facilities"
  }
  
];

export default PwdPage;