import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import AuthCTA from "@/components/AuthCTA";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Relyy - AI Mental Health Chat',
  description: 'Your AI companion for mental wellness',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-900 text-gray-100`}>
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              LOADING...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              {children}
              <AuthCTA />
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
