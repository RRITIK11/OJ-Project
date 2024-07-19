import Signup from "@/components/Signup";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">  
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Algo Galaxy
        </p>
        <p>
          Welcome to the Galaxy full of algorithms and tech stack.
        </p>
      </div>
    </div>
  );
}
