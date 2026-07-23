"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setHydrated } from "@/store/slices/authSlice";

export function AuthHydrator({ session }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setAuth({
          user: session.user,
          accountType: session.accountType,
          permissions: session.permissions || [],
          isOwner: session.isOwner || false,
          organization: session.organization || session.user?.organization || null,
        })
      );
    } else {
      dispatch(setHydrated());
    }
  }, [session, dispatch]);

  return null;
}
