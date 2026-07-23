"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LayoutGrid, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "table";

  const setView = (view) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`${pathname}?${params.toString()}`);
  };

  const options = [
    { value: "table", label: "Table", icon: Table2 },
    { value: "kanban", label: "Kanban", icon: LayoutGrid },
  ];

  return (
    <div className="segmented-control">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          data-active={currentView === value}
          onClick={() => setView(value)}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
            currentView === value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
