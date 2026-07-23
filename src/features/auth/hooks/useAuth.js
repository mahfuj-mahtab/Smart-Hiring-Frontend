"use client";

import { useSelector } from "react-redux";
import { can } from "@/lib/permissions";

export function useAuth() {
  return useSelector((state) => state.auth);
}

export function usePermissions() {
  const { permissions, isOwner } = useSelector((state) => state.auth);

  return {
    permissions,
    isOwner,
    can: (codename) => can(permissions, codename, isOwner),
  };
}
