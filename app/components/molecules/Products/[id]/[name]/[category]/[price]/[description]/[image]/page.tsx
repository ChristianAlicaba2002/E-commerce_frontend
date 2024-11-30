import React from "react";
import Image from "next/image";

export default function page({
  params,
}: {
  params: {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    image: string;
  };
}) {
  const decodedName = decodeURIComponent(params.name);
  const decodedDescription = decodeURIComponent(params.description);

  return (
    <>
      <div
        className="container text-center mt-5  bg-gradient-to-b from-amber-50 to-orange-100"
        style={{
          color: "#343a40",
          padding: "5%",
          margin: "0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
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

      <div className="block mt-[-35%] ml-[50%]">
        <h1 className="mt-3" style={{ fontSize: "2.5rem" }}>
          ID: {params.id}
        </h1>
        <h1 className="mt-2 " style={{ fontSize: "2rem" }}>
          Name: &nbsp; {decodedName}
        </h1>
        <h2 className="mt-2" style={{ fontSize: "1.5rem", color: "red" }}>
          {" "}
          Price: &nbsp; &#8369;{params.price}.00
        </h2>
        <h2
          className="mt-2"
          style={{ fontSize: "1.5rem", fontStyle: "italic" }}
        >
          {" "}
          Category: {params.category}
        </h2>
        <p
          className="mt-2"
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
          }}
        >
          Description: {decodedDescription}
        </p>
      </div>
    </>
  );
}
