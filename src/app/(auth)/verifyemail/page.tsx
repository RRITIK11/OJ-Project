import type { Metadata } from "next";
import Verify from "@/components/Auth/Verify";

export const metadata: Metadata = { title: "Verify email" };

export default function VerifyEmailPage() {
  return <Verify />;
}
