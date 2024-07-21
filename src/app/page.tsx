import Signup from "@/components/Signup";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
export default function Home() {
  return (
    <div >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
    
      <div className="flex flex-col items-center justify-center">  
          
        <p className="text-4xl sm:text-9xl font-bold relative z-20 bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Algo Galaxy
        </p>
        
        
      </div>
    </div>
  );
}

