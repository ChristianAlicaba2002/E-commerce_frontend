import React from "react";

export default function page({
  params,
}: {
  params: {
    id: string;
    name: string;
    price: string;
    description: string;
  };
}) {
  return (
    <div>
      <h1>Product Id {params.id}</h1>
      <h1>Hello &nbsp; {params.name}</h1>
      <h1>Price &nbsp; {params.price}</h1>
      <h1>Category {params.description}</h1>
    </div>
  );
}
