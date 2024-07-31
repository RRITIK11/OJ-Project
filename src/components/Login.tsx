"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { UserInterface } from "@/models/user.model";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type UserLogin = Pick<UserInterface, 'username' | 'email' | 'password'>;

function Login() : React.ReactElement {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user , setUser] = useState<UserLogin>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("./api/users/login", user);
      toast.success("Login Successful")
      router.push("/");
    } catch (error) {
      console.log("Error at on Login", error);
      toast.error("Login failer");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      (user.email.length > 0 || user.username.length > 0) &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [toggleInput, setToggleInput] = useState("");

  useEffect(()=>{
    if(user.username.length == 0 && user.email.length == 0){
      setToggleInput("");
      return;
    }
    if(user.username.length > 0){
      setToggleInput("username");
      user.email = "";
      return;
    }
    if(user.email.length > 0){
      setToggleInput("email");
      user.username = "";
      return;
    }
  },[user.email, user.username])
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div>
        {loading ? (
          "Logging..."
        ) : (
          <div>
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
              Login to Algo Galaxy
            </h2>

            <form className="my-8 lg:w-[350px]" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="abc123"
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  disabled = {toggleInput==="email"}
                />
              </LabelInputContainer>
              <div className="relative text-center bottom-2 text-gray-300">
                OR
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="example@abc.com"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled = {toggleInput==="username"}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </LabelInputContainer>

             
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:text-gray-500"
                type="submit"  disabled={buttonDisabled}
              >
                Login &rarr;
                <BottomGradient />
              </button>

              <div className="w-full flex justify-center gap-3 text-sm text-gray-300 relative top-3">
                Don't have an account?
                <Link
                  href={"./signup"}
                  className="text-gray-100 hover:text-cyan-300"
                >
                  Sign up
                </Link>
              </div>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const BottomGradient  = ()=> {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Login;



// <div className="flex flex-col space-y-4">
// <button
//   className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//   type="submit"
// >
//   <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
//   <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//     GitHub
//   </span>
//   <BottomGradient />
// </button>
// <button
//   className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//   type="submit"
// >
//   <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
//   <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//     Google
//   </span>
//   <BottomGradient />
// </button>
// {/* <button
// className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
// type="submit"
// >
// <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
// <span className="text-neutral-700 dark:text-neutral-300 text-sm">
// OnlyFans
// </span>
// <BottomGradient />
// </button> */}
// </div>
