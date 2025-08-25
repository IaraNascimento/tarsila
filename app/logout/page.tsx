"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";

export default function Home() {
  const { push } = useRouter();

  const { showLoader } = useLoader();
  const { logOut } = useAuth();

  useEffect(() => {
    showLoader();
    logOut().then(() => push("/login"));
  }, []);

  return <main>LogOut</main>;
}
