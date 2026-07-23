"use client";

import Link from "next/link";
import { useTransition } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { logoutAction } from "@/features/auth/actions/auth";
import { setTheme } from "@/store/slices/uiSlice";

export default function CandidateLayout({ children }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const [pending, startTransition] = useTransition();

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.username ||
    user?.email;

  const handleLogout = () => {
    startTransition(() => logoutAction());
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(next));
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/candidate/profile" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white text-xs font-bold shadow-md shadow-primary/25">
              SH
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Smart Hiring
            </span>
          </Link>
          <div className="flex items-center gap-3">
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
            <div className="hidden items-center gap-2 text-sm sm:flex">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{displayName}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={handleLogout}
              disabled={pending}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 p-6 lg:p-8 page-enter">
        {children}
      </main>
    </div>
  );
}
