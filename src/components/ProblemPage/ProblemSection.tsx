"use client";

import { usePathname } from "next/navigation";
import { FileText, History, Users } from "lucide-react";
import { Panel, PanelBody, PanelHeader, PanelTab } from "./Panel";

const tabs = [
  { label: "Description", segment: "description", icon: FileText },
  { label: "Submissions", segment: "submissions", icon: History },
  { label: "All submissions", segment: "allSubmissions", icon: Users },
];

export default function ProblemSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const current = pathname.split("/").filter(Boolean).pop();

  return (
    <Panel>
      <PanelHeader>
        {tabs.map((tab) => (
          <PanelTab
            key={tab.segment}
            href={`./${tab.segment}`}
            active={current === tab.segment}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </PanelTab>
        ))}
      </PanelHeader>
      <PanelBody>{children}</PanelBody>
    </Panel>
  );
}
