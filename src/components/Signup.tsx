"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup({ title }: any) {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verfication, setVerification] = useState(false);
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onSignup = async (e: any) => {
    if (buttonDisabled) return;
    try {
      e.preventDefault();
      console.log(user);
      setLoading(true);
      await toast.promise(
        axios.post("/api/users/signup", user),
        {
          loading: "Loading",
          success: "Got the data",
          error: "Error when fetching",
        }
      );
      // const response = await axios.post("/api/users/signup", user);
      toast.success("Success : Verification link send to your email");
      setVerification(true);
      setTimeout(() => {
        setVerification(false);
        router.push("/login");
      }, 5000);
    } catch (error: any) {
      console.log("Error at on Signup", error);
      toast.error(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.firstname.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      {verfication ? (
        <div>
          <h1>Verfication link send to you email.</h1>
          <p>Verify it and login!</p>
        </div>
      ) : (
        <div>
          {loading ? (
            "Registering..."
          ) : (
            <div>
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                {title}
              </h2>
              {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      
    </p> */}

              <form className="my-8" onSubmit={onSignup}>
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
                  />
                </LabelInputContainer>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      placeholder="Algo"
                      type="text"
                      value={user.firstname}
                      onChange={(e) =>
                        setUser({ ...user, firstname: e.target.value })
                      }
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      placeholder="Galaxy"
                      type="text"
                      value={user.lastname}
                      onChange={(e) =>
                        setUser({ ...user, lastname: e.target.value })
                      }
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="example@abc.com"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
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
                  type="submit"
                  disabled={buttonDisabled}
                >
                  Sign up &rarr;
                  <BottomGradient />
                </button>

                <div className="w-full flex justify-center gap-3 text-sm text-gray-300 relative top-3">
                  Have an account?
                  <Link
                    href={"./login"}
                    className="text-gray-100 hover:text-cyan-300"
                  >
                    Sign in
                  </Link>
                </div>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                  <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      GitHub
                    </span>
                    <BottomGradient />
                  </button>
                  <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Google
                    </span>
                    <BottomGradient />
                  </button>
                  {/* <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            OnlyFans
          </span>
          <BottomGradient />
        </button> */}
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => {
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

export default Signup;
