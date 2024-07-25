import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import { ReactFlowProvider } from "@xyflow/react";

export const metadata: Metadata = {
  title: "Open Delivery Bot",
  description: "An open-source multi tool bot for minecraft servers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactFlowProvider>{children}</ReactFlowProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
