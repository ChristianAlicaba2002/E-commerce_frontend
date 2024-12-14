"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  gender: string;
  email: string;
  password: string;
  image: string;
}
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("http://127.0.0.1:8000/api/Register", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();
      console.log("Response data:", data);

      if (data) {
        setTimeout(() => {
          setModalMessage(data.message || "Registration successful, you can now login");
          setIsModalOpen(true)
          setTimeout(() => {
            setIsModalOpen(false)
            router.push("/components/organisms/LoginPage");
          }, 1000)

        }, 3000)
      } else if (data.email === formData.email) {
        setModalMessage(
          data.message || "Email is already used, please make a new one."
        );
        setIsModalOpen(true);
        setTimeout(() => setIsModalOpen(false), 3000);

        const emailInput = document.querySelector(
          'input[name="email"]'
        ) as HTMLInputElement;
        if (emailInput) {
          emailInput.style.borderColor = "red";
        }

        setFormData((prev) => ({
          ...prev,
          email: "",
        }));
      }

    } catch (err) {
      setModalMessage('Something went wrong. Please try again.')
      setIsModalOpen(true)
      setTimeout(() => setIsModalOpen(false), 3000)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-black/60">
        <img
          src="/images/homeBackground.jpg"
          alt="logo"
          className="absolute w-full h-full -z-40"
        />
        <div className="min-h-screen z-50 flex items-center justify-center ">
          <div className="max-w-md w-full space-y-4 px-8 py-1 bg-white rounded-lg shadow">
            <div>
              <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="text-center text-gray-500 mt-2">
                For Don Macchiatos
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {error && (
                <div className="text-red-500 text-center text-sm">{error}</div>
              )}
              <div className="rounded-md shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <select
                      name="birthMonth"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}
                      value={formData.birthMonth}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthDay"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}
                      value={formData.birthDay}
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthYear"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}
                      value={formData.birthYear}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={handleChange}
                    value={formData.gender}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="forms-input mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    required
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-2 px-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    <span className="ml-2 text-indigo-600">Registering...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                )}
              </div>
            </form>

            <p className="text-center text-sm text-gray-600 pb-4">
              Already have an account?{" "}
              <Link
                href="/components/organisms/LoginPage"
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Sign in
              </Link>
            </p>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 p-4">
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
          </div>
        </div>
      </div>
    </>
  );
}
