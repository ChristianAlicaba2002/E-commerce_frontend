'use client'
import React from 'react';
import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa';

function PwdPage() {  
  const getInTouch = () => {
    window.location.href = 'https://facebook.com';
  };
  return (

    <>
    <title>Don Macchiatos For PWD</title>
    <div className="min-h-screen p-8 bg-[#171717f1]">
      <div className="max-w-6xl mx-auto ">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">
            Support for Persons with Disabilities
          </h1>
          <p className="text-lg text-white">
            Empowering and supporting our community members with accessible services and resources
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <ServiceCard 
            icon={<FaWheelchair className="text-4xl"/>}
            title="Mobility Support"
            description="Access to mobility aids, ramps, and assistance services for physical disabilities"
          />
          <ServiceCard className='bg-orange-400'
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

        <section className="bg-orange-400 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-6">Available Resources</h2>
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
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
          <h2 className="text-2xl font-semibold mb-4 text-white">Need Assistance?</h2>
          <p className="mb-4 text-white">Contact our PWD Support Team</p>
          <button onClick={getInTouch} className="bg-[white] text-black  px-6 py-3 rounded-lg hover:bg-orange-400 transition">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
    </>
  );
}

const ServiceCard = ({ icon, title, description }:any) => (
  <div className="bg-orange-400 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
    <div className="text-[white] mb-4 flex justify-center">{icon}</div>
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