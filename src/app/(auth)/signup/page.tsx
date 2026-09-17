import type { Metadata } from "next";
import Signup from "@/components/Auth/Signup";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return <Signup />;
}
