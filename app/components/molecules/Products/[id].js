import React from "react";

export const getStaticPaths = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/AllSpecialProduct");
  const data = await res.json();

  const paths = data.map((product) => {
    return { params: { id: product.id.toString() } };
  });
  return { paths, fallback: false };
};

export const getStatisProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://127.0.0.1:8000/api/AllSpecialProduct/${id}`);
  const data = await res.json();

  return { props: { product: data } };
};

const GetDetial = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div>
        <h1>Name: {product.id}</h1>
        <h1>Name: {product.name}</h1>
        <h1>Name: {product.price}</h1>
        <h1>Name: {product.category}</h1>
        <h1>Name: {product.description}</h1>
      </div>
    </>
  );
};
export default GetDetial;
