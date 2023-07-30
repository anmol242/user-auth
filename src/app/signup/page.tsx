"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [signUpDisabled, setSignUpDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("api/users/signup", user);
      console.log("SignUp successful", response.data);

      toast.success("User signed up successfully");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length && user.username.length) {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen py-2">
      <Toaster position="bottom-center" />
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
        placeholder="password"
      />
      <button
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        {signUpDisabled ? "No Sign Up" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Here</Link>
    </div>
  );
}
