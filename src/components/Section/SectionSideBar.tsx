"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBook,
  IconTrophy,
  IconMessages,
  IconUser,
  IconSettings,
  IconArrowRight,
  IconLogin,
  IconLogout,
  IconUserStar, IconShield
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { motion } from 'framer-motion';


interface LinkInterface {
  label: string;
  href: string;
  icon: any;
  visible: boolean;
}

function SectionSideBar() {
  const { user, isAuthenticated } = useAuth();

  const initialLinks: LinkInterface[] = [
    {
      label: "Problems",
      href: "/problems",
      icon: <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Contest",
      href: "/contest",
      icon: <IconTrophy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Courses",
      href: "/courses",
      icon: <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Discuss",
      href: "/discuss",
      icon: <IconMessages className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      visible: false
    },
    {
      label: "Admin",
      href: "/admin",
      icon: (
        <IconUserStar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      visible: false
    },
    {
      label: "Moderator",
      href: "/moderator",
      icon: (
        <IconShield className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      visible: false
    },
    {
      label: "Contribute",
      href: "/contribute",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: false,
    },
    {
      label: "Signup",
      href: "/signup",
      icon: <IconArrowRight className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Login",
      href: "/login",
      icon: <IconLogin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: true,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      visible: false,
    },
  ];

  const [links, setLinks] = useState<LinkInterface[]>(initialLinks);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const updatedLinks = initialLinks.map(link => {
        if (link.label === "Admin") {
          return { ...link, visible: user?.roles?.isAdmin };
        }
        if (link.label === "Moderator") {
          return { ...link, visible: user?.roles?.isModerator };
        }
        if (link.label === "Profile" || link.label === "Logout" || link.label === "Contribute") {
          return { ...link, visible: true };
        }
        if (link.label === "Login" || link.label === "Signup") {
          return { ...link, visible: false };
        }
        return link;
      });
      setLinks(updatedLinks);
    } else {
      setLinks(initialLinks);
    }
  }, [user, isAuthenticated]);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => {
              if (!link.visible) return null;
              return <SidebarLink key={idx} link={link} />;
            })}
          </div>
        </div>

        <div>
          <SidebarLink
            link={{
              label: `${(isAuthenticated && user) ? `${user.username}` : "Guest"}`,
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
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="p-1 font-extrabold text-center text-md bg-black dark:bg-white rounded-br-lg rounded flex-shrink-0">
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
      <div className="p-1 font-extrabold text-center text-md bg-black dark:bg-white rounded-br-lg rounded flex-shrink-0">
        <div>Ag</div>
      </div>
    </Link>
  );
};

export default SectionSideBar;



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
