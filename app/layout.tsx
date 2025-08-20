import React from "react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { AuthProvider } from "./contexts/AuthProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import Header from "./components/header/header";
import "./globals.css";

const fontWorkSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarsila",
  description: "Tarsila",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <LoaderProvider>
          <html lang="pt-br" className={fontWorkSans.className}>
            <body>
              <Header />
              {children}
            </body>
          </html>
        </LoaderProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
