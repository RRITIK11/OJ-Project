import { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
        {children}
      </main>
    </div>
  );
}
