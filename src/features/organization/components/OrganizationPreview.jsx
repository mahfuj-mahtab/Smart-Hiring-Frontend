import Image from "next/image";
import { Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function OrganizationPreview({ organization }) {
  const hasBanner = Boolean(organization?.banner);

  return (
    <div className="premium-card overflow-hidden border-0">
      <div className="border-b border-border/60 bg-muted/20 px-5 py-4">
        <p className="text-sm font-semibold">Live preview</p>
        <p className="text-xs text-muted-foreground">
          How your organization appears on the public home page
        </p>
      </div>

      <div className="p-5">
        <div
          className={
            hasBanner
              ? "relative h-28 overflow-hidden rounded-xl"
              : "relative h-28 overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_70%)]"
          }
        >
          {hasBanner && (
            <>
              <Image
                src={organization.banner}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            {organization?.logo ? (
              <Image
                src={organization.logo}
                alt=""
                width={40}
                height={40}
                className="mb-2 h-10 w-10 rounded-lg object-cover shadow-md"
                unoptimized
              />
            ) : (
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg gradient-bg text-xs font-bold text-white">
                {(organization?.name || "OR").slice(0, 2).toUpperCase()}
              </div>
            )}
            <p className={`text-sm font-bold ${hasBanner ? "text-white" : ""}`}>
              {organization?.name || "Your organization"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {organization?.industry && (
            <Badge variant="secondary" className="gap-1">
              <Building2 className="h-3 w-3" />
              {organization.industry}
            </Badge>
          )}
          {organization?.employee_size_display && (
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {organization.employee_size_display}
            </Badge>
          )}
        </div>

        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Candidates visiting your subdomain will see this branding on the home page and careers section.
        </p>
      </div>
    </div>
  );
}
