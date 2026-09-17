"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, MailCheck, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Status = "idle" | "verifying" | "verified" | "failed";

export default function Verify() {
  const { verifyUser } = useAuth();
  const [token, setToken] = React.useState<string>("");
  const [status, setStatus] = React.useState<Status>("idle");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || window.location.search.split("=")[1] || "");
  }, []);

  const handleVerify = async () => {
    if (!token || status === "verifying") return;
    setStatus("verifying");
    const ok = await verifyUser(token);
    setStatus(ok ? "verified" : "failed");
  };

  if (status === "verified") {
    return (
      <Card className="w-full max-w-sm animate-fade-in text-center">
        <CardHeader className="items-center space-y-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <CardTitle className="text-xl">Email verified</CardTitle>
          <CardDescription>
            Your account is active. You can log in now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">Continue to log in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm animate-fade-in text-center">
      <CardHeader className="items-center space-y-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {status === "failed" ? (
            <XCircle className="h-6 w-6 text-destructive" />
          ) : (
            <MailCheck className="h-6 w-6" />
          )}
        </span>
        <CardTitle className="text-xl">
          {status === "failed" ? "Verification failed" : "Verify your email"}
        </CardTitle>
        <CardDescription>
          {!token
            ? "This link is missing a verification token. Open the link from your email again."
            : status === "failed"
            ? "The link may have expired. Sign up again to receive a fresh link."
            : "Confirm the address you signed up with to activate your account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full"
          onClick={handleVerify}
          loading={status === "verifying"}
          disabled={!token}
        >
          {status === "failed" ? "Try again" : "Verify email"}
        </Button>
        {status === "failed" && (
          <Button asChild variant="ghost" className="w-full">
            <Link href="/signup">Back to sign up</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
