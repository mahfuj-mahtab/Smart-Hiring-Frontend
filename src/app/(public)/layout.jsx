import Link from "next/link";
import { headers } from "next/headers";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { getPublicOrganization } from "@/features/organization/api/organization";
import {
  OrgPublicBranding,
  OrgPublicFooter,
  OrgPublicHomeLink,
} from "@/features/organization/components/OrgPublicBranding";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }) {
  const headersList = await headers();
  const orgSlug = headersList.get("x-org-slug");

  let organization = null;
  if (orgSlug) {
    try {
      const { data } = await getPublicOrganization();
      organization = data;
    } catch {
      organization = null;
    }
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <OrgPublicHomeLink organization={organization} className="group flex items-center gap-3 transition-opacity hover:opacity-90">
            <OrgPublicBranding organization={organization} />
          </OrgPublicHomeLink>
          <nav className="flex items-center gap-2 text-sm sm:gap-3">
            <Link
              href={ROUTES.CAREERS}
              className="hidden rounded-lg px-3 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground sm:inline-flex"
            >
              Careers
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="rounded-lg px-3 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              Sign in
            </Link>
            {organization ? (
              <Button asChild variant="gradient" size="sm" className="rounded-lg shadow-md shadow-primary/20">
                <Link href={ROUTES.CAREERS}>View jobs</Link>
              </Button>
            ) : (
              <Button asChild variant="gradient" size="sm" className="rounded-lg">
                <Link href={ROUTES.REGISTER}>Get started</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <OrgPublicFooter organization={organization} />
          <div className="flex gap-6">
            <Link
              href={ROUTES.CAREERS}
              className="transition-colors hover:text-foreground"
            >
              Careers
            </Link>
            {!organization && (
              <Link
                href={ROUTES.REGISTER_CANDIDATE}
                className="transition-colors hover:text-foreground"
              >
                Join as candidate
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
