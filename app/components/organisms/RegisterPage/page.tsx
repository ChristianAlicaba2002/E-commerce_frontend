"use client";

import { useEffect, useState } from "react";
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
}
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState('')
  const [isEmailDuplicate, setIsEmailDuplicate] = useState('')
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsPasswordMatch('');
    const inputs = document.querySelector('input[type=password]')
    if (inputs) {
      (inputs as HTMLInputElement).style.borderColor = 'gray';
    }

    try {
      setLoading(true);
      const hasCapitalLetter = /[A-Z]/
      // Password validation first
      if (formData.password.length < 8) {
        setTimeout(() => {
          setIsPasswordMatch('Password must be at least 8 characters long');
          const inputs = document.querySelector('input[type=password]')
          if (inputs) {
            (inputs as HTMLInputElement).style.borderColor = 'red';
          }
        }, 2500)

      } else if (!hasCapitalLetter.test(formData.password)) {
        setTimeout(() => {
          setIsPasswordMatch('Password must have at least one Capital letter');
          const inputs = document.querySelector('input[type=password]')
          if (inputs) {
            (inputs as HTMLInputElement).style.borderColor = 'red';
          }
        }, 2500);

      } else {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });

        const response = await fetch("http://127.0.0.1:8000/api/auth/Register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataToSend)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.value === false) {
          setIsEmailDuplicate(data.message);
          setLoading(false);
          return;
        }

        if (data.status === true) {
          setIsModalOpen(data.message)
          setIsModalOpen(true)
          setTimeout(() => {
            setIsModalOpen(false)
            router.push('/components/organisms/LoginPage');
          }, 3000)
        }
      }

    } catch (error) {
      setError('An error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  }



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
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="forms-input mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <p className="text-red-500 text-sm">{isEmailDuplicate}</p>
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
                  <p className="text-red-500 text-sm">{isPasswordMatch}</p>
                </div>

              </div>

              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-4 px-4 rounded-md  bg-indigo-600">
                    {/* <span className="mr-2 text-indigo-600">Registering</span> */}
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-[bounce_0.4s_infinite]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-[bounce_0.5s_infinite_0.2s]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-[bounce_0.5s_infinite_0.4s]"></div>
                    </div>
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
