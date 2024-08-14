"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/HomePage/Navigation";
import Footer from "@/components/HomePage/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-0 w-full h-full bg-black flex flex-col items-center overflow-x-hidden">
      <Navigation />

      <div className="absolute inset-0 w-full h-full -z-10">
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

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-[8rem] font-bold text-white relative z-20 select-none mb-6">
          Algo Galaxy
        </h1>

        <div className="relative w-full max-w-2xl mb-12">
          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 lg:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 lg:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-6 sm:inset-x-8 md:inset-x-24 lg:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-6 sm:inset-x-8 md:inset-x-24 lg:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>

        <div className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-gray-300 mb-4">
          Where Every Algorithm Finds Its Star
        </div>

        <div className="text-gray-400 text-center max-w-xl mx-auto mb-8 px-4">
          Master Coding Challenges, Boost Your Skills, and Prepare for Your Next
          Technical Adventure with Algo Galaxy.
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 px-4">
          <Link href="/playground" className="bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 font-semibold transition duration-300 rounded-xl text-center">
            Try the Playground
          </Link>

          <Link href="/problems" className="bg-gray-700 text-white hover:bg-gray-800 py-2 px-6 font-semibold transition duration-300 rounded-xl text-center">
            Explore Problems
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
