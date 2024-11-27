import React from "react";
import Image from "next/image";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function page({
  params,
}: {
  params: {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
  };
}) {
  return (
    <>
      <div
        className="container text-center mt-5  bg-gradient-to-b from-amber-50 to-orange-100"
        style={{
          color: "#343a40",
          padding: "5%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Image
          src={`http://127.0.0.1:8000/api/storage/${params.image}`}
          alt={`Product-${params.name}`}
          width={500}
          height={100}
          className="img-fluid rounded-full shadow-lg w-[40%] h-[100%]"
        />
      </div>

      <div className="block mt-[-35%] ml-[55%]">
        <h1 className="mt-3" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          ID: &nbsp; {params.id}
        </h1>
        <h1 className="mt-2" style={{ fontSize: "2rem", fontWeight: "600" }}>
          Name: &nbsp; {params.name}
        </h1>
        <h2 className="mt-2" style={{ fontSize: "1.5rem", color: "red" }}>
          {" "}
          Price: &nbsp; &#8369;{params.price}.00
        </h2>

        <p
          className="mt-2"
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
          }}
        >
          Description: &nbsp; {params.description}
        </p>
      </div>
    </>
  );
}
