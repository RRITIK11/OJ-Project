"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/HomePage/Navigation";
import Footer from "@/components/HomePage/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative z-0 px-4 md:px-8 lg:px-16">
      <Navigation />

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

      <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 select-none mb-4">
        Algo Galaxy
      </h1>

      <div className="w-full max-w-[40rem] h-40 relative mb-4">
        <div className="absolute inset-x-4 md:inset-x-12 lg:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-4 md:inset-x-12 lg:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-8 md:inset-x-24 lg:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-8 md:inset-x-24 lg:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>

      <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-center text-white mb-4">
        Where Every Algorithm Finds Its Star
      </div>

      <div className="text-gray-500 text-center max-w-2xl mx-auto">
        Master Coding Challenges, Boost Your Skills, and Prepare for Your Next
        Technical Adventure with Algo Galaxy.
      </div>

      <div className="flex gap-4 my-8">
        <Link href="/compiler" className="bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 font-semibold transition duration-300 rounded-xl">
          Try the Playground
        </Link>

        <Link href="/problems" className="bg-gray-700 text-white hover:bg-gray-800 py-2 px-6 font-semibold transition duration-300 rounded-xl">
          Explore Problems
        </Link>
      </div>

      <Footer />
    </div>
  );
}
