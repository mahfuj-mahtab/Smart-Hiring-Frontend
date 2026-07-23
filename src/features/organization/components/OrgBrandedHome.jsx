import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

export function OrgBrandedHome({ organization }) {
  const hasBanner = Boolean(organization?.banner);
  const textOnHero = hasBanner ? "text-white" : "text-foreground";
  const mutedOnHero = hasBanner ? "text-white/85" : "text-muted-foreground";

  const highlights = [
    {
      icon: Briefcase,
      title: "Open roles",
      description: "Browse current openings and find a role that fits your skills.",
      href: ROUTES.CAREERS,
      cta: "View careers",
    },
    {
      icon: Building2,
      title: organization.industry || "Our industry",
      description: organization.industry
        ? `We're building in ${organization.industry.toLowerCase()}.`
        : "Learn more about what we do and who we are.",
    },
    {
      icon: Users,
      title: organization.employee_size_display
        ? `${organization.employee_size_display} team`
        : "Growing team",
      description: organization.employee_size_display
        ? `Join a company of ${organization.employee_size_display} employees.`
        : "Be part of a team that's scaling thoughtfully.",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <section className="px-6 pb-10 pt-4 lg:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="org-hero-panel">
            <div
              className={
                hasBanner
                  ? "relative min-h-[380px] sm:min-h-[440px]"
                  : "relative min-h-[380px] sm:min-h-[440px] org-hero-mesh"
              }
            >
              {hasBanner ? (
                <>
                  <Image
                    src={organization.banner}
                    alt={`${organization.name} banner`}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_58%)]" />
                  <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                </>
              )}

              <div
                className={`relative flex min-h-[380px] flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[440px] sm:py-20 ${textOnHero}`}
              >
                <p
                  className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm ${
                    hasBanner
                      ? "border-white/20 bg-white/10 text-white backdrop-blur-sm"
                      : "border-primary/20 bg-primary/5 text-primary"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Careers at {organization.name}
                </p>

                {organization?.logo ? (
                  <Image
                    src={organization.logo}
                    alt={`${organization.name} logo`}
                    width={112}
                    height={112}
                    className={`mb-6 h-28 w-28 rounded-2xl object-cover shadow-2xl ${
                      hasBanner ? "border border-white/20 ring-4 ring-white/10" : ""
                    }`}
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-2xl gradient-bg text-3xl font-bold text-white shadow-2xl ring-4 ring-primary/20">
                    {organization.name.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {hasBanner ? (
                    organization.name
                  ) : (
                    <>
                      Welcome to{" "}
                      <span className="gradient-text">{organization.name}</span>
                    </>
                  )}
                </h1>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {organization.industry && (
                    <Badge
                      variant="secondary"
                      className={
                        hasBanner
                          ? "rounded-full border-white/20 bg-white/15 px-4 py-1.5 text-white backdrop-blur-sm"
                          : "rounded-full px-4 py-1.5"
                      }
                    >
                      <Building2 className="mr-1.5 h-3.5 w-3.5" />
                      {organization.industry}
                    </Badge>
                  )}
                  {organization.employee_size_display && (
                    <Badge
                      variant="secondary"
                      className={
                        hasBanner
                          ? "rounded-full border-white/20 bg-white/15 px-4 py-1.5 text-white backdrop-blur-sm"
                          : "rounded-full px-4 py-1.5"
                      }
                    >
                      <Users className="mr-1.5 h-3.5 w-3.5" />
                      {organization.employee_size_display} employees
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className={
                      hasBanner
                        ? "rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-sm"
                        : "rounded-full px-4 py-1.5"
                    }
                  >
                    <Globe className="mr-1.5 h-3.5 w-3.5" />
                    {organization.slug}
                  </Badge>
                </div>

                <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${mutedOnHero}`}>
                  Discover career opportunities and learn what it&apos;s like to work with our team.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    variant="gradient"
                    className="rounded-xl px-8 h-12 text-base shadow-lg shadow-primary/25"
                  >
                    <Link href={ROUTES.CAREERS}>
                      View open positions
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="premium-card group h-full border-0 p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  {item.cta && (
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {item.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  )}
                </div>
              );

              return item.href ? (
                <Link key={item.title} href={item.href} className="block h-full">
                  {content}
                </Link>
              ) : (
                <div key={item.title} className="h-full">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
