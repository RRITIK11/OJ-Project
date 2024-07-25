"use client";
import Signup from "@/components/Signup";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
export default function Home() {
  return (
    //     <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">

    // </div>

    <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative z-0">
      <nav className="bg-gray-400 w-[40%] flex flex-row justify-between absolute top-[40px] rounded-xl text-black px-5 py-2 opacity-[70%]">
          <Link href="/problems">
            Problems
          </Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>

      <div className="w-full absolute inset-0 h-screen -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#EEEEEE"
        />
      </div>

      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 select-none">
        Algo Galaxy
      </h1>

     <div className="w-[40rem] h-40 relative">
        
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div> 


    </div>
  );

}
