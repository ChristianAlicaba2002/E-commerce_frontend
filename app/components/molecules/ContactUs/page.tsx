"use client";
import Image from "next/image";
import picture1 from "./images/backgroundContact.jpg";
export default function ContactUs() {
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "de7c7041-9681-4b4b-be28-77d36e697d78");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    result ? alert("Thanks for feedback us! 😊") : alert("Complete all fields");
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <title>Don Macchiatos Contact Us</title>
   
      <Image
        src={picture1}
        alt="background"
        className="absolute w-[100%] h-[100vh] bg-center bg-cover bg-no-repeat bg-fixed z-[-50]"
      ></Image>

      <div className="bg-[#000000c4] min-h-[100vh]">
        <a href="/components/molecules/Home">
          <i className="fa-solid fa-arrow-left text-[#ffffff] text-[1.5rem] sm:text-[2rem] mt-[2rem] ml-[3%] hover:text-[orange]"></i>
        </a>
        <h1 className="text-[2rem] sm:text-[3rem] font-sans mt-[0.99%] ml-[5%] sm:ml-[9.5%] text-[white]">
          Contact Us
        </h1>
        <p className="text-[1rem] sm:text-[1.1rem] font-sans mt-[1.3%] ml-[5%] sm:ml-[10%] text-[white] mr-[5%] sm:mr-[10%]">
          Let's connect! Whether you have a question about my work...
        </p>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="text-[1.2rem] rounded-md outline-none text-[black] placeholder:text-[#000000a2] w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] bg-[#ffffffdb] p-[1.3rem] ml-[5%] sm:ml-[10%] mt-[3%] hover:bg-[#ffffffa9]"
          />
          <br />

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            className="text-[1.2rem] rounded-md outline-none text-[black] placeholder:text-[#000000a2] w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] bg-[#ffffffdb] p-[1.2rem] ml-[5%] sm:ml-[10%] mt-[2%] hover:bg-[#ffffffa9]"
          />

          <textarea
            id="message"
            name="message"
            placeholder="Send us message"
            className="ml-[5%] sm:ml-[10%] w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] mt-[-4.5%] text-[1.2rem] rounded-md p-[1.3rem] text-[black] scroll-p-4 placeholder:text-[#000000a2] bg-[#ffffffdb] absolute max-h-96 outline hover:bg-[#ffffffa9] border-collapse"
          />
          <br />
          <button
            type="submit"
            className="p-[0.55rem] px-[3rem] text-[black] font-semibold bg-[#FFA500] hover:bg-[#ffc65b] ml-[5%] sm:ml-[10%] rounded-md mt-[2%]"
          >
            Submit
          </button>
        </form>

        <footer className="w-full mt-[5%] py-[1rem] bg-transparent">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between px-[5%] md:px-[10%] gap-4 md:gap-8">
            <div className="flex flex-col items-center md:items-start">
              <i className="fa-solid fa-phone text-[1.5rem] mb-2 text-[#ffffff]"></i>
              <p className="text-[#ffffff] text-sm md:text-base">
                0965-537-6522
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <i className="fa-brands fa-google text-[1.5rem] mb-2 text-[#ffffff]"></i>
              <p className="text-[#ffffff] text-sm md:text-base">
                christiandave120702@gmail.com
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <i className="fa-solid fa-circle-info text-[1.5rem] mb-2 text-[#ffffff]"></i>
              <p className="text-[0.90rem] text-[white] text-center md:text-left">
                &copy; 2024 By Christian Dave Alicaba
                <br />
                Powered and Secured by Don Macchiatos
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
