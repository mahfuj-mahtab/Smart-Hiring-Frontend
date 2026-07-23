"use client";

import { cn } from "@/lib/utils";

export function PermissionMatrix({ modules, selectedIds = [], disabled = false }) {
  return (
    <div className="space-y-4">
      {modules.map((group) => (
        <div
          key={group.module}
          className="rounded-xl border border-border/60 bg-muted/20 p-5"
        >
          <h4 className="mb-4 text-sm font-semibold capitalize tracking-tight">
            {group.module}
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {group.permissions.map((permission) => (
              <label
                key={permission.id}
                htmlFor={permission.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors",
                  "hover:border-border/60 hover:bg-card/50",
                  disabled && "cursor-not-allowed opacity-60"
                )}
              >
                <input
                  type="checkbox"
                  id={permission.id}
                  name="permission_ids"
                  value={permission.id}
                  defaultChecked={selectedIds.includes(permission.id)}
                  disabled={disabled}
                  className="h-4 w-4 rounded border border-input accent-primary"
                />
                <span className="text-sm">
                  {permission.label || permission.codename}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
