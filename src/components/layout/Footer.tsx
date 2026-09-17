import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { label: "Email", href: "mailto:pvt.ritik.11@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/rritik11", icon: Github },
  { label: "X", href: "https://x.com/rritik11", icon: Twitter },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rritik11/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_ritik_1109_/",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} Algo Galaxy. Built for people who
          like hard problems.
        </p>
        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="rounded-md p-2 transition-colors hover:bg-accent hover:text-foreground"
            >
              <s.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
