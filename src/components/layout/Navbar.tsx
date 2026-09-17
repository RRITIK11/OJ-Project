"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GitPullRequest,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessagesSquare,
  Orbit,
  ShieldCheck,
  SquareTerminal,
  Trophy,
  User,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const primaryLinks = [
  { label: "Problems", href: "/problems", icon: BookOpen },
  { label: "Playground", href: "/playground", icon: SquareTerminal },
  { label: "Contest", href: "/contest", icon: Trophy },
  { label: "Courses", href: "/courses", icon: GraduationCap },
  { label: "Discuss", href: "/discuss", icon: MessagesSquare },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight",
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Orbit className="h-4 w-4" />
      </span>
      <span>Algo Galaxy</span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
  icon: Icon,
  mobile,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const roleLinks = [
    { label: "Profile", href: "/profile", icon: User, show: true },
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
      show: !!user?.roles?.isModerator,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: LayoutDashboard,
      show: !!user?.roles?.isAdmin,
    },
  ].filter((l) => l.show);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Account menu"
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20 transition hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {initials(user.username)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-medium">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.roles?.isAdmin
                      ? "Administrator"
                      : user.roles?.isModerator
                      ? "Moderator"
                      : "Member"}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roleLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>
                      <link.icon />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => logout()}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Logo className="mb-6 px-1" />
              <div className="flex flex-col gap-1">
                {primaryLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isActive(link.href)}
                    onClick={() => setOpen(false)}
                    mobile
                  />
                ))}
              </div>
              <div className="my-4 h-px bg-border" />
              <div className="flex flex-col gap-1">
                {isAuthenticated && user ? (
                  <>
                    {roleLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        icon={link.icon}
                        active={isActive(link.href)}
                        onClick={() => setOpen(false)}
                        mobile
                      />
                    ))}
                    <button
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      href="/login"
                      label="Log in"
                      icon={LogIn}
                      active={isActive("/login")}
                      onClick={() => setOpen(false)}
                      mobile
                    />
                    <Button asChild className="mt-2">
                      <Link href="/signup" onClick={() => setOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
