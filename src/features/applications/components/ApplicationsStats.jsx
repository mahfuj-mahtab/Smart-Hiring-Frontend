"use client";

import { Star, Users, UserCheck, Inbox } from "lucide-react";
import {
  APPLICATION_STAGES,
  STAGE_LABELS,
  STAGE_THEME,
} from "@/features/applications/constants/stages";
import { cn } from "@/lib/utils";

export function ApplicationsStats({ applications = [] }) {
  const total = applications.length;
  const shortlisted = applications.filter((app) => app.is_shortlisted).length;
  const activePipeline = applications.filter(
    (app) => !["hired", "rejected"].includes(app.stage)
  ).length;
  const newApplications = applications.filter((app) => app.stage === "applied").length;

  const stats = [
    {
      label: "Total applications",
      value: total,
      icon: Users,
      accent: "from-indigo-500 to-violet-500",
    },
    {
      label: "Active pipeline",
      value: activePipeline,
      icon: UserCheck,
      accent: "from-sky-500 to-cyan-500",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      icon: Star,
      accent: "from-amber-500 to-orange-500",
    },
    {
      label: "New applications",
      value: newApplications,
      icon: Inbox,
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  const stageCounts = APPLICATION_STAGES.reduce((acc, stage) => {
    acc[stage] = applications.filter((app) => app.stage === stage).length;
    return acc;
  }, {});

  return (
    <div className="mb-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>
                </div>
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                    stat.accent
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="premium-card border-0 p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pipeline breakdown
        </p>
        <div className="flex flex-wrap gap-2">
          {APPLICATION_STAGES.map((stage) => {
            const theme = STAGE_THEME[stage];
            const count = stageCounts[stage] || 0;
            return (
              <div
                key={stage}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                  theme.count
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
                {STAGE_LABELS[stage]}
                <span className="font-bold">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
