import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Briefcase, Shield, Users, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Job management",
    description:
      "Create rich job postings with salary ranges, requirements, and deadlines.",
  },
  {
    icon: Users,
    title: "Hiring pipeline",
    description:
      "Track candidates in kanban or table views with drag-and-drop stages.",
  },
  {
    icon: Shield,
    title: "Role-based access",
    description:
      "Fine-grained permissions for your HR team on every organization.",
  },
  {
    icon: Zap,
    title: "Your own subdomain",
    description:
      "Branded careers pages where candidates discover and apply to roles.",
  },
];

export function PlatformHome() {
  return (
    <div className="mesh-bg flex flex-1 flex-col">
      <section className="relative overflow-hidden px-6 py-24 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="mx-auto max-w-4xl text-center page-enter">
          <p className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            Multi-tenant hiring platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Hire smarter with{" "}
            <span className="gradient-text">Smart Hiring</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Everything your team needs to post jobs, manage applications, and
            build a world-class candidate experience — on your own subdomain.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="gradient" className="rounded-xl px-8 h-12 text-base">
              <Link href={ROUTES.REGISTER}>
                Start hiring — free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl px-8 h-12 text-base"
            >
              <Link href={ROUTES.REGISTER_CANDIDATE}>Join as candidate</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need to hire
            </h2>
            <p className="mt-3 text-muted-foreground">
              A complete toolkit for modern recruiting teams
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="premium-card group p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
