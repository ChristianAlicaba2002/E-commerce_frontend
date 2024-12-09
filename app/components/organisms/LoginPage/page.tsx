"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// interface FormData {
//   email: string;
//   password: string;
// }

export default function LoginPage() {
  const router = useRouter();
  // const [formData, setFormData] = useState<FormData>({
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setTimeout(() => {
          setModalMessage("Error during login");
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            setLoading(false);
          }, 3000);
        }, 500);
        const inputs = document.querySelectorAll("forms-input");
        inputs.forEach((input) => {
          (input as HTMLInputElement).style.borderColor = "red";
        });
      }
      const data = await response.json();
      console.log(data);

      if (data.user) {
        alert("Login Successfully");
        router.push("/components/molecules/Home");
      }
    } catch (error) {
      return;
    }
  };

  const inputPassword = document.getElementById("password") as HTMLInputElement;

  const showPasswordButton = () => {
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="relative bg-black/60">
        <img
          src="/images/homeBackground.jpg"
          alt="logo"
          className="absolute w-full h-full -z-40"
        />
        <div className="min-h-screen z-50 flex items-center justify-center ">
          <title>Login</title>
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome Back!
              </h2>
              <p className="text-center text-gray-500">
                Sign in to your account.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-center text-sm">{error}</div>
              )}
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="forms-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="forms-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div>
                  <input
                    id="showPassword"
                    name="showPassword"
                    type="checkbox"
                    required
                    className="mr-2"
                    onClick={showPasswordButton}
                  />
                  <label
                    className="text-gray-500 text-[.90rem] -mt-10 cursor-pointer"
                    htmlFor="showPassword"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-2 px-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    <span className="ml-2 text-indigo-600">Logging in...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/components/organisms/RegisterPage"
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-800">
              {modalMessage}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
