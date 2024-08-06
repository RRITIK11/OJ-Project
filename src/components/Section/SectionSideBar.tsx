"use client"
import React, { useState ,useEffect} from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
// import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { motion } from "framer-motion";
import Image from "next/image";

function SectionSideBar() {
  
  // const cookieStore = cookies();
  // const token = cookieStore.get("token")?.value || "";

  // let userData = undefined;
  // try{
  //   const decode = await jwt.verify(token,process.env.TOKEN_SECRET!);
  //   userData = decode;
  // }catch(error : any){
  //   console.log(error.message)
  // }


  const initialLinks = [
      {
        label: "Problems",
        href: "/problems",
        icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : true
      },
      {
        label: "Contest",
        href: "/contest",
        icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : true
      },
      {
        label: "Courses",
        href: "/courses",
        icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : true
      },
      {
        label: "Discuss",
        href: "/discuss",
        icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible :true
      },
      {
        label: "Profile",
        href: "/profile",
        icon: (
          <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : false
      },
      {
        label: "Admin",
        href: "/admin",
        icon: (
          <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : false
      },
      {
        label: "Moderator",
        href: "/moderator",
        icon: (
          <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : false
      },
      {
        label: "Contribute",
        href: "/contribute",
        icon: (
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : false
      },
      {
        label: "Signup",
        href: "/signup",
        icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : true
      },
      {
        label: "Login",
        href: "/login",
        icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : true
      },
      {
        label: "Logout",
        href: "/",
        icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        visible : false
      },
    ];
  const [links, setLinks] = useState(initialLinks)
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(userData).length) {
  //     const updatedLinks = initialLinks.map(link => {
  //       if (link.label === "Admin") {
  //         return { ...link, visible: userData?.isAdmin };
  //       }
  //       if (link.label === "Moderator") {
  //         return { ...link, visible: userData?.isModerator };
  //       }
  //       if (link.label === "Profile" || link.label === "Logout" || link.label === "Contribute") {
  //         return { ...link, visible: true };
  //       }
  //       if (link.label === "Login" || link.label === "Signup") {
  //         return { ...link, visible: false };
  //       }
  //       return link;
  //     });
  //     setLinks(updatedLinks);
  //   } else {
  //     setLinks(initialLinks);
  //   }
  // }, [userData]);
  
  return (
    <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10 ">

          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                if(!link.visible) return null
                return <SidebarLink key={idx} link={link} />

              }
                
              )}
            </div>

          </div>


          <div>
          {/* <SidebarLink
              link={{
                label: `${Object.values(userData).length ? `${userData?.firstname} ${userData?.lastname}` : "Guest"}`,
                href: "/profile",
                icon: (
                  <Image
                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}
          </div>
        </SidebarBody>
      </Sidebar>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="p-1 font-extrabold text-center text-md bg-black dark:bg-white rounded-br-lg rounded flex-shrink-0" >
        <div>Ag</div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Algo Galaxy
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >

      <div className="p-1 font-extrabold text-center text-md bg-black dark:bg-white rounded-br-lg rounded flex-shrink-0" >
        <div>Ag</div>
      </div>
    </Link>
  );
};

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

export default SectionSideBar