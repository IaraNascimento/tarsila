"use client";

import { useEffect } from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useLoader } from "../contexts/LoaderProvider";

export default function Home() {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <ProtectedRoute>
      <main>Home</main>
    </ProtectedRoute>
  );
}
