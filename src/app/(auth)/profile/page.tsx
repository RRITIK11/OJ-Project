"use client";

import Link from "next/link";
import {
  BookOpen,
  GitPullRequest,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  SquareTerminal,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { initials } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const links = [
    { label: "Problems", href: "/problems", icon: BookOpen, show: true },
    {
      label: "Playground",
      href: "/playground",
      icon: SquareTerminal,
      show: true,
    },
    {
      label: "Contribute",
      href: "/contribute",
      icon: GitPullRequest,
      show: true,
    },
    {
      label: "Moderator",
      href: "/moderator",
      icon: ShieldCheck,
      show: !!user.roles?.isModerator,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: LayoutDashboard,
      show: !!user.roles?.isAdmin,
    },
  ].filter((l) => l.show);

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary ring-1 ring-primary/20">
            {initials(user.username)}
          </span>
          <div className="min-w-0">
            <Link
              href={`/profile/${user.username}`}
              className="block truncate text-lg font-semibold hover:text-primary"
            >
              {user.username}
            </Link>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {user.roles?.isAdmin && <Badge>Admin</Badge>}
              {user.roles?.isModerator && (
                <Badge variant="secondary">Moderator</Badge>
              )}
              {!user.roles?.isAdmin && !user.roles?.isModerator && (
                <Badge variant="muted">Member</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent/50"
            >
              <link.icon className="h-4 w-4 text-muted-foreground" />
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </CardContent>
    </Card>
  );
}
