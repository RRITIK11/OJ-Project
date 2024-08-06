"use client"
import { cn } from "@/utils/cn";
import SectionSideBar from "@/components/Section/SectionSideBar";
import { ProblemFormProvider } from "@/context/ProblemFormContext";

export default function layout({ children }: any) {

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800  flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 h-screen w-screen overflow-hidden" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >

      <div className="rounded-tr-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-hidden">
      <ProblemFormProvider>
        {children}
      </ProblemFormProvider>
      </div>
      <SectionSideBar/>
      {/* <Dashboard /> */}
      
    </div>
  );
}
// Dummy dashboard component with content

// const Dashboard = () => {
//   return (
//     <div className="flex flex-1">
//       <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
//         <div className="flex gap-2">
//           {[...Array(4).keys()].map((i) => (
//             <div
//               key={i}
//               className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
//             ></div>
//           ))}
//         </div>
//         <div className="flex gap-2 flex-1">
//           {[...Array(2).keys()].map((i) => (
//             <div
//               key={i}
//               className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
