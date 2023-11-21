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
          <nav className="fixed top-1/2 rounded-full px-3 py-8 -translate-y-1/2 right-10 z-10 bg-primary animate-fade-in">
            <ul className="text-white gap-6 flex flex-col justify-around items-center">
              <li className="p-2 hover:bg-gray-200 rounded-full group transition-all ease-in-out duration-300">
                <Link href="/posts">
                  <BookText className="group-hover:text-primary" />
                </Link>
              </li>

              <li className="p-2 hover:bg-gray-200 rounded-full group transition-all ease-in-out duration-300">
                <Link href="/categories">
                  <Layers3 className="group-hover:text-primary" />
                </Link>
              </li>
            </ul>
          </nav>

          {children}
          {/* <div className="relative z-10">{children}</div> */}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
