import { cn } from "@/utils/cn";
import SectionSideBar from "@/components/Section/SectionSideBar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function SidebarDemo({ children }: any) {

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  let userData = undefined;
  try{
    const decode = await jwt.verify(token,process.env.TOKEN_SECRET!);
    userData = decode;
  }catch(error : any){
    console.log(error.message)
  }
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800  flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 h-screen w-screen overflow-hidden" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <div className="rounded-tr-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-hidden">
        {children}
      </div>
      <SectionSideBar userData = {userData}/>
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
