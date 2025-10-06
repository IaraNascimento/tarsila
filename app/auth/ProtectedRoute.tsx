"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";
import Header from "../components/header/header";

export default function ProtectedRoute({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { finished, isAuthenticated } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (finished && !isAuthenticated) {
      push("/login");
    }
  }, [finished, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>
    <Header />
    {children}
  </>;
}
