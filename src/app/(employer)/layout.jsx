"use client";

import { usePathname } from "next/navigation";
import { Sidebar, TopBar } from "@/components/layout/AppShell";

export default function EmployerLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="mesh-bg flex min-h-screen">
      <Sidebar pathname={pathname} />
      <div className="flex flex-1 flex-col lg:pl-0">
        <TopBar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="page-enter">{children}</div>
        </main>
      </div>
    </div>
  );
}
