"use client";

import { useSelector } from "react-redux";
import { can } from "@/lib/permissions";

export function PermissionGate({ permission, children, fallback = null }) {
  const { permissions, isOwner, isHydrated } = useSelector((state) => state.auth);

  if (!isHydrated) return null;
  if (!can(permissions, permission, isOwner)) return fallback;
  return children;
}

export function OwnerGate({ children, fallback = null }) {
  const { isOwner, isHydrated } = useSelector((state) => state.auth);
  if (!isHydrated) return null;
  if (!isOwner) return fallback;
  return children;
}
