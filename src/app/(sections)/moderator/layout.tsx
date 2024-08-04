export default function moderateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-[#677D6A] flex flex-col">
      <div className="text-4xl text-center bg-[#1A3636] p-2">
        Moderator DashBoard
      </div>
      {children}
    </div>
  );
}
