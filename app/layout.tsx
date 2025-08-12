import React from "react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { LoaderProvider } from "./contexts/LoaderProvider";
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
      <LoaderProvider>
        <html lang="pt-br" className={fontWorkSans.className}>
          <body>{children}</body>
        </html>
      </LoaderProvider>
    </React.StrictMode>
  );
}
