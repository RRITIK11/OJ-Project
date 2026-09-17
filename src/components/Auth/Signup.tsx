"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signUpSchema, type SignUpType } from "@/types/forms/signUpSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Signup() {
  const { loading, signup } = useAuth();
  const router = useRouter();
  const [sent, setSent] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = React.useState<SignUpType>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const canSubmit = signUpSchema.safeParse(user).success;

  const update =
    (field: keyof SignUpType) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setUser((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    const ok = await signup(
      user.username,
      user.email,
      user.password,
      user.firstname,
      user.lastname
    );
    if (ok) {
      setSent(true);
      setTimeout(() => router.push("/login"), 5000);
    }
  };

  if (sent) {
    return (
      <Card className="w-full max-w-sm animate-fade-in text-center">
        <CardHeader className="items-center space-y-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
            <MailCheck className="h-6 w-6" />
          </span>
          <CardTitle className="text-xl">Check your inbox</CardTitle>
          <CardDescription>
            We sent a verification link to{" "}
            <span className="font-medium text-foreground">{user.email}</span>.
            Open it to activate your account.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center text-xs text-muted-foreground">
          Redirecting you to log in…
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Solve problems, track submissions and contribute your own.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              autoComplete="username"
              placeholder="algo_fan"
              value={user.username}
              onChange={update("username")}
              autoFocus
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                autoComplete="given-name"
                placeholder="Ada"
                value={user.firstname}
                onChange={update("firstname")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">
                Last name{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="lastname"
                autoComplete="family-name"
                placeholder="Lovelace"
                value={user.lastname ?? ""}
                onChange={update("lastname")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={update("email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                value={user.password}
                onChange={update("password")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={!canSubmit}
          >
            Create account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 font-medium text-primary hover:underline"
        >
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
