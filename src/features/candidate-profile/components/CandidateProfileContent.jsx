import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Mail, Phone, User } from "lucide-react";

export function CandidateProfileContent({ profile }) {
  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.username;

  const fields = [
    { label: "Username", value: profile.username, icon: User },
    { label: "Phone", value: profile.phone || "—", icon: Phone },
    { label: "First name", value: profile.first_name || "—", icon: User },
    { label: "Last name", value: profile.last_name || "—", icon: User },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Candidate portal"
        title="My Profile"
        description="Your candidate account information across all organizations"
      />

      <Card className="premium-card border-0 overflow-hidden">
        <div className="h-24 gradient-bg opacity-90" />
        <CardHeader className="relative -mt-12">
          <div className="avatar-ring mb-4 w-fit">
            <div className="flex h-20 w-20 items-center justify-center text-2xl font-bold text-primary">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            {displayName}
            <Badge variant="secondary">Candidate</Badge>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {profile.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
                <p className="mt-1.5 font-medium">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg border border-dashed border-border/80 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
            Profile editing will be available when the backend update endpoint is added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
