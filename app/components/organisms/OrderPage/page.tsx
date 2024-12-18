"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const product_id = searchParams.get("product_id");
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("Cash on delivery");
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(1); // 1: Prepared, 2: Out for Delivery, 3: Received

  console.log({ id, name, description, price, image });

  if (!id || product_id || !price || !name || !description || !image) {
    return <div>Invalid product details</div>;
  }

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);

      const generateTrackingNumber = () => {
        return "TRK" + Math.random().toString(36).substr(2, 9).toUpperCase();
      };

      const newTrackingNumber = generateTrackingNumber();
      setTrackingNumber(newTrackingNumber);

      const response = await fetch("http://127.0.0.1:8000/api/userOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          phoneNumber: phoneNumber,
          address: address,
          message: message,
          product_id: id,
          name: name,
          description: description,
          quantity: quantity,
          payment: payment,
          total_price: parseFloat(price) * quantity,
          tracking_number: newTrackingNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to place order");
      } else {
        setTimeout(() => {
          setModalMessage("Order Successfully Thank you!!");
          setIsModalOpen2(true);
          setTimeout(() => {
            setIsModalOpen2(false);
            setShowReceipt(true);
          }, 3000);
        }, 900);
      }
    } catch (error) {
      setTimeout(() => {
        setModalMessage("Please input your information");
        setIsModalOpen2(true);
        setTimeout(() => {
          setIsModalOpen2(false);
        }, 3500);
      }, 1000);
      setShowReceipt(false);
    } finally {
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="min-h-screen bg-[#FDF6EC] p-8">
        {showReceipt ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <button
              onClick={() => setShowReceipt(false)}
              className="px-6 py-2  bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Order
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Order Status
            </h2>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Product:</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Price per item:</span>
                <span>₱{price}.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4">
                <span>Total Amount:</span>
                <span>₱{(parseFloat(price) * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex w-full justify-center mb-4 mt-5">
                <p className="font-semibold">Delivery Information</p>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Full Name: </span>
                <span>{fullName}</span>
              </div>
              <div className="flex justify-between ">
                <span className="font-semibold">Phone Number: </span>
                <span>{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address: </span>
                <span>{address}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Track Your Order</h3>
                <p className="text-gray-600 mb-2">Your tracking number:</p>
                <p className="font-mono text-xl font-bold text-orange-600">
                  {trackingNumber}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Use this number to track your order status
                </p>
              </div>
            </div>
            <div className="mt-8 px-4">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200">
                  <div
                    className="h-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${((orderStatus - 1) / 2) * 100}%` }}
                  ></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus >= 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200"
                      }`}
                  >
                    <i className="fas fa-box"></i>
                  </div>
                  <p className="mt-2 text-sm font-medium">Prepared</p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus >= 2
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200"
                      }`}
                  >
                    <i className="fas fa-truck"></i>
                  </div>
                  <p className="mt-2 text-sm font-medium">Out for Delivery</p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus >= 3
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                      }`}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <p className="mt-2 text-sm font-medium">Received</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() =>
                    setOrderStatus((prev) => (prev < 3 ? prev + 1 : 1))
                  }
                  disabled={orderStatus === 3}
                  className={`px-4 py-2 bg-orange-500 text-white rounded-lg transition-colors ${orderStatus === 3
                    ? "opacity-35 bg-green-500 cursor-not-allowed"
                    : "hover:bg-orange-600"
                    }`}
                >
                  Update Status
                </button>
                <p className="mt-2 text-sm text-gray-600">
                  Current Status:{" "}
                  {orderStatus === 1
                    ? "Order Prepared"
                    : orderStatus === 2
                      ? "Out for Delivery"
                      : "Order Received"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-8">
            <Link
              href="/components/molecules/Products"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mb-4 shadow-md"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Products
            </Link>
            <div className="flex flex-col lg:flex-row lg:gap-12">
              <div className="w-full lg:w-2/5 relative aspect-square mb-6 lg:mb-0">
                <Image
                  src={`http://127.0.0.1:8000/api/storage/${image}`}
                  alt={`Product-${name}`}
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
              </div>

              <div className="w-full lg:w-3/5">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {name}
                </h1>
                <p className="mt-2 lg:mt-3 text-base lg:text-lg text-gray-600">
                  {description}
                </p>
                <p className="mt-4 lg:mt-6 mb-3 lg:mb-5 text-xl lg:text-2xl font-semibold text-orange-500">
                  &#8369;{price}.00
                </p>

                <label className="text-gray-700">
                  <strong>Payment</strong>: {payment}
                </label>
                <br />
                <select
                  className="w-full lg:w-40 mt-2 px-3 py-2 border rounded-lg"
                  name="payment"
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <div className="mt-4 text-gray-700">
                  <strong>Total</strong>: &#8369;
                  {(parseFloat(price) * quantity).toFixed(2)}
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Information:
                  </h2>
                  <p className="mt-2 text-gray-700">Full Name: {fullName}</p>
                  <p className="mt-2 text-gray-700">
                    Phone Number: {phoneNumber}
                  </p>
                  <p className="mt-2 text-gray-700">Address: {address}</p>
                  <p className="mt-2 text-gray-700">Message: {message}</p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full sm:w-20 px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full duration-300 ease-in-out sm:w-auto px-6 py-2 border-2 text-black rounded-lg bg-blue-200 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Add information
                  </button>
                  {isModalOpen2 && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 p-4">
                      <div className="bg-white py-5 px-10 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold text-gray-800">
                          {modalMessage}
                        </p>

                        <button
                          type="button"
                          onClick={() => setIsModalOpen2(false)}
                          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div
            id="add-info"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
              className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border-l-4 border-orange-500 relative"
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col flex-nowrap gap-6 flex-1">
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Delivery Information
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Please provide your delivery details below
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your full name"
                    maxLength={50}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 11) {
                        setPhoneNumber(value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                      if (phoneNumber.length >= 11 && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    min="0"
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 11) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          11
                        );
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your complete address"
                    maxLength={50}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add a message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                  placeholder="Enter your message"
                  maxLength={150}

                  onChange={(e) => setMessage(e.target.value)}
                />

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Confirm Details
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
