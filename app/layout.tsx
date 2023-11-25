import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { BookText, Layers3 } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post it",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <nav className="fixed top-4 rounded-full py-3 px-8 -translate-x-1/2 left-1/2 z-10 bg-primary animate-fade-in">
            <ul className="text-white gap-6 flex justify-around items-center">
              <Link href="/posts">
                <li className="p-2 hover:bg-gray-200 rounded-full group transition-all ease-in-out duration-300">
                  <BookText className="group-hover:text-primary" />
                </li>
              </Link>

              <Link href="/categories">
                <li className="p-2 hover:bg-gray-200 rounded-full group transition-all ease-in-out duration-300">
                  <Layers3 className="group-hover:text-primary" />
                </li>
              </Link>
            </ul>
          </nav>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
