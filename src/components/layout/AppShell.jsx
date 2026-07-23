"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  LayoutDashboard,
  Users,
  Shield,
  Briefcase,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Building2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { PERMISSIONS } from "@/constants/permissions";
import { can } from "@/lib/permissions";
import { toggleSidebar, setTheme } from "@/store/slices/uiSlice";
import { logoutAction } from "@/features/auth/actions/auth";

const navItems = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    permission: null,
  },
  {
    label: "Roles",
    href: ROUTES.ROLES,
    icon: Shield,
    permission: PERMISSIONS.ROLE_VIEW,
  },
  {
    label: "Members",
    href: ROUTES.MEMBERS,
    icon: Users,
    permission: PERMISSIONS.EMPLOYEE_VIEW,
  },
  {
    label: "Jobs",
    href: ROUTES.JOBS,
    icon: Briefcase,
    permission: PERMISSIONS.JOB_VIEW,
  },
  {
    label: "Applications",
    href: ROUTES.APPLICATIONS,
    icon: ClipboardList,
    permission: PERMISSIONS.CANDIDATE_VIEW,
  },
  {
    label: "Organization",
    href: ROUTES.ORGANIZATION_SETTINGS,
    icon: Building2,
    permission: PERMISSIONS.ORGANIZATION_CHANGE,
  },
];

function UserAvatar({ name }) {
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="avatar-ring">
      <div className="flex h-9 w-9 items-center justify-center text-xs font-semibold text-primary">
        {initials}
      </div>
    </div>
  );
}

export function Sidebar({ pathname }) {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { permissions, isOwner, organization } = useSelector((state) => state.auth);
  const [pending, startTransition] = useTransition();

  const visibleItems = navItems.filter(
    (item) => !item.permission || can(permissions, item.permission, isOwner)
  );

  const handleLogout = () => {
    startTransition(() => logoutAction());
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/50 bg-card/90 backdrop-blur-2xl transition-transform duration-300 ease-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-white text-xs font-bold shadow-lg shadow-primary/25">
              SH
            </div>
            <div>
              <p className="font-semibold text-sm tracking-tight">Smart Hiring</p>
              {organization && (
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {organization.name}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Separator className="opacity-50" />
        <nav className="flex-1 space-y-1 p-3">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "gradient-bg text-white shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    !active && "group-hover:scale-110"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/50 p-3">
          <Button
            variant="outline"
            className="w-full rounded-xl border-border/60"
            onClick={handleLogout}
            disabled={pending}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
    </>
  );
}

export function TopBar({ title, children }) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const { user, organization } = useSelector((state) => state.auth);

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.username ||
    "User";

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(next));
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 glass px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {title && (
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Separator orientation="vertical" className="h-8 opacity-50" />
        <div className="flex items-center gap-3">
          <UserAvatar name={displayName} />
          <div className="hidden text-right text-sm sm:block">
            <p className="font-medium leading-none">{displayName}</p>
            {organization && (
              <p className="mt-1 text-xs text-muted-foreground">
                {organization.slug}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
