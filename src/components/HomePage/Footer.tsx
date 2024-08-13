"use client";
import React from "react";
import Link from "next/link";
import { FaGithub , FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-400 w-full flex flex-col items-center text-black absolute bottom-0 opacity-[70%] font-bold tracking-wider justify-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl m-4">
        <div className="select-none">
          <span>
            &copy; {new Date().getFullYear()} Algo Galaxy. All rights reserved.
          </span>
        </div>

        <div className="flex gap-8 mt-2 md:mt-0">
          <Link
            href="mailto:pvt.ritik.11@gmail.com"
            target="_blank"
            className="hover:text-red-500"
          >
            <MdEmail size={24} />
          </Link>
          <Link
            href="https://x.com/rritik11"
            target="_blank"
            className="hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="https://www.instagram.com/_ritik_1109_/"
            target="_blank"
            className="hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://github.com/rritik11"
            target="_blank"
            className="hover:text-gray-800"
          >
            <FaGithub size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rritik11/"
            target="_blank"
            className="hover:text-blue-600"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
