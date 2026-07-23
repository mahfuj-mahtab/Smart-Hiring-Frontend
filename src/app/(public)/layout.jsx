import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href={ROUTES.HOME} className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white text-sm font-bold shadow-md shadow-primary/25 transition-transform duration-200 group-hover:scale-105">
              SH
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Smart Hiring
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm sm:gap-4">
            <Link
              href={ROUTES.CAREERS}
              className="hidden rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground sm:inline-flex"
            >
              Careers
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              Sign in
            </Link>
            <Button asChild variant="gradient" size="sm" className="rounded-lg">
              <Link href={ROUTES.REGISTER}>Get started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Smart Hiring. Built for modern teams.</p>
          <div className="flex gap-6">
            <Link
              href={ROUTES.CAREERS}
              className="transition-colors hover:text-foreground"
            >
              Careers
            </Link>
            <Link
              href={ROUTES.REGISTER_CANDIDATE}
              className="transition-colors hover:text-foreground"
            >
              Join as candidate
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
