import Link from "next/link";
import {
  Users,
  Shield,
  Briefcase,
  ClipboardList,
  ExternalLink,
  Building2,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/layout/PageHeader";
import { ROUTES } from "@/constants/routes";
import { PERMISSIONS } from "@/constants/permissions";
import { STAGE_LABELS } from "@/features/applications/constants/stages";
import { can } from "@/lib/permissions";

export function DashboardContent({ user, stats = {} }) {
  const permissions = user.permissions || [];
  const isOwner = user.is_owner;

  const quickLinks = [
    {
      title: "Roles",
      description: "Manage roles and permissions",
      href: ROUTES.ROLES,
      icon: Shield,
      visible: can(permissions, PERMISSIONS.ROLE_VIEW, isOwner),
    },
    {
      title: "Members",
      description: "Manage team members",
      href: ROUTES.MEMBERS,
      icon: Users,
      visible: can(permissions, PERMISSIONS.EMPLOYEE_VIEW, isOwner),
    },
    {
      title: "Jobs",
      description: "Manage job postings",
      href: ROUTES.JOBS,
      icon: Briefcase,
      visible: can(permissions, PERMISSIONS.JOB_VIEW, isOwner),
    },
    {
      title: "Applications",
      description: "Review candidate pipeline",
      href: ROUTES.APPLICATIONS,
      icon: ClipboardList,
      visible: can(permissions, PERMISSIONS.CANDIDATE_VIEW, isOwner),
    },
  ].filter((link) => link.visible);

  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username;

  const stageEntries = Object.entries(stats.stageCounts || {}).slice(0, 3);

  return (
    <>
      <PageHeader
        badge="Dashboard"
        title={`Welcome back, ${displayName}`}
        description={`${user.organization?.name} — ${user.role?.name || "Member"}`}
        action={
          <Button asChild variant="outline" className="rounded-xl">
            <Link href={ROUTES.CAREERS} target="_blank">
              <ExternalLink className="h-4 w-4" />
              View careers page
            </Link>
          </Button>
        }
      />

      {(stats.openJobs !== undefined || stats.totalApplications !== undefined) && (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.openJobs !== undefined && (
            <StatCard
              icon={Briefcase}
              label="Open jobs"
              value={stats.openJobs}
              description="Active postings on your careers page"
            />
          )}
          {stats.totalApplications !== undefined && (
            <StatCard
              icon={TrendingUp}
              label="Total applications"
              value={stats.totalApplications}
              description="Candidates in your pipeline"
            />
          )}
          {stageEntries.length > 0 && (
            <StatCard
              icon={ClipboardList}
              label="Pipeline snapshot"
              value={stageEntries.reduce((sum, [, count]) => sum + count, 0)}
              description="Active candidates by stage"
            >
              <div className="flex flex-wrap gap-2">
                {stageEntries.map(([stage, count]) => (
                  <Badge key={stage} variant="secondary">
                    {STAGE_LABELS[stage] || stage}: {count}
                  </Badge>
                ))}
              </div>
            </StatCard>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="premium-card border-0 lg:col-span-1">
          <CardHeader>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Your workspace details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-lg bg-muted/40 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Name
              </p>
              <p className="mt-1 font-medium">{user.organization?.name}</p>
            </div>
            <div className="rounded-lg bg-muted/40 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Subdomain
              </p>
              <p className="mt-1 font-medium">{user.organization?.slug}</p>
            </div>
            <div className="rounded-lg bg-muted/40 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Role
              </p>
              <p className="mt-1 font-medium">
                {user.role?.name}
                {user.is_owner && (
                  <Badge variant="secondary" className="ml-2">
                    Owner
                  </Badge>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card key={link.href} className="premium-card group border-0">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href={link.href}>Open {link.title}</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
