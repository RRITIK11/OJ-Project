import type { Metadata } from "next";
import Login from "@/components/Auth/Login";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return <Login />;
}
