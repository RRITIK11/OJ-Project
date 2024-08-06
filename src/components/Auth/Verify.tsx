"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Verify() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      setVerified(false);
      setError(false);
      await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  return (
    <div className=" m-40 flex justify-center text-center flex-col items-center">
      {!verified && (
        <div className="flex flex-col items-center">
          <p className="text-2xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Click here to verify your email
          </p>
          <div className="active:scale-110">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black  bg-white text-black dark:text-white flex items-center space-x-2 dark:hover:font-extrabold hover:bg-white dark:bg-gradient-to-tr from-green-600  "
              onClick={verifyUserEmail}
            >
              <span>Verify</span>
            </HoverBorderGradient>
          </div>
          {error && (
            <div className="text-2xl text-red-600 font-bold rounded-lg m-2">
              <h2>Error!!!</h2>
            </div>
          )}
        </div>
      )}
      {/* <div className="p-2 m-4 bg-orange-500 text-black rounded-lg">
        {token ? `${token}` : "no token"}
      </div> */}
      {verified && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold rounded-lg m-2">
            Email verified ✅
          </h2>
          <div className="active:scale-110">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black  bg-white text-black dark:text-white flex items-center space-x-2 dark:hover:font-extrabold hover:bg-white dark:bg-gradient-to-tr from-green-600  "
              onClick={verifyUserEmail}
            >
              <Link href="./">Go to Home page</Link>
            </HoverBorderGradient>
          </div>
        </div>
      )}
    </div>
  );
}
