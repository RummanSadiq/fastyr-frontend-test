import type { Metadata } from "next";
import classNames from "classnames";

// Style
import "./globals.css";

// Layout
import { DashboardLayout } from "@/layouts/dashboard-layout";

// Fonts
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Fastyr",
  description: "Fastyr Frontend Test",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.variable, inter.className)}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
