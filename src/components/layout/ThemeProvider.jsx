"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme]);

  return children;
}
