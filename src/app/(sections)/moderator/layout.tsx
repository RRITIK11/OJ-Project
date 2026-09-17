import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { SegmentedTabs } from "@/components/layout/SegmentedTabs";

const tabs = [
  { label: "Pending", href: "/moderator/pending" },
  { label: "Verified", href: "/moderator/verified" },
  { label: "Rejected", href: "/moderator/rejected" },
];

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer size="wide">
      <PageHeader
        title="Moderator"
        description="Review community-contributed problems before they go live."
      >
        <SegmentedTabs tabs={tabs} />
      </PageHeader>
      <div className="mt-6">{children}</div>
    </PageContainer>
  );
}
