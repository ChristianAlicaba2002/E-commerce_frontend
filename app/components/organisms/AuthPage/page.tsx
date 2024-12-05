"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostApi from "@/app/Hooks/PostApi";
import UserApi from "@/app/Hooks/UserApi";
interface fromData {
  email: string;
  username: string;
  password: string;
}

interface AlertMessage {
  type: "error" | "success";
  message: string;
}

export default function AuthPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState<any>();

  const [formData, setFormData] = useState<fromData>({
    email: "",
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const showAlert = (message: string, type: "error" | "success" = "error") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const RegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      showAlert("Please fill in all fields");
      return;
    } else if (password.length < 5) {
      showAlert("Password must be at least 5 characters long");
      return;
    } else if (!email.includes("@")) {
      showAlert("Please enter a valid email");
      return;
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        showAlert("Please fill in all fields");
        return;
      } else if (!user) {
        showAlert("Email does not exist");
        return;
      } else if (password !== user.password) {
        showAlert("Password is incorrect");
        return;
      } else {
        sessionStorage.setItem("user", "true");
        showAlert("Signed in successfully", "success");
        router.push("/components/molecules/Home");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-orange-400">
        {alert && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
            <div
              className={`p-4 rounded-md shadow-lg ${
                alert.type === "error"
                  ? "bg-red-100 text-red-700 border border-red-400"
                  : "bg-green-100 text-green-700 border border-green-400"
              }`}
            >
              {alert.message}
            </div>
          </div>
        )}
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-2">
              Don Macchiatos
            </h2>
            <p className="text-gray-600">
              {isSignIn
                ? "Welcome back! Sign in to your account"
                : "Join our coffee-loving community and discover the perfect brew for every moment."}
            </p>
            {isSignIn ? (
              <h1 className="text-orange-600">Sign In</h1>
            ) : (
              <h1 className="text-orange-600">Sign Up</h1>
            )}
          </div>

          {isSignIn ? (
            <form onSubmit={handleSignInSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="signin-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="signin-email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signin-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="signin-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </form>
          ) : (
            <form onSubmit={RegisterSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  id="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                Create Account
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              {isSignIn ? "Create Account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
