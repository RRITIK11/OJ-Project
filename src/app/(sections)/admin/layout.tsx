"use client";

import { usePathname } from "next/navigation";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { SegmentedTabs } from "@/components/layout/SegmentedTabs";

const tabs = [
  { label: "Users", href: "/admin/users" },
  { label: "Problems", href: "/admin/problems" },
];

const problemTabs = [
  { label: "All problems", href: "/admin/problems" },
  { label: "Trash", href: "/admin/problems/trash" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const inProblems = pathname.startsWith("/admin/problems");

  return (
    <PageContainer size="wide">
      <PageHeader
        title="Admin"
        description="Manage members and the full problem catalogue."
      >
        <SegmentedTabs tabs={tabs} />
      </PageHeader>

      {inProblems && (
        <div className="mt-6">
          <SegmentedTabs tabs={problemTabs} exact />
        </div>
      )}

      <div className={inProblems ? "mt-4" : "mt-6"}>{children}</div>
    </PageContainer>
  );
}
