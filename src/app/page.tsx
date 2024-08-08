"use client"
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/HomePage/Navigation";
export default function Home() {
  
  return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative z-0">
        <Navigation/>

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
