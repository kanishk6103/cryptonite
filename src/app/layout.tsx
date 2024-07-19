import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./storeProvider";
import RecentSearches from "@/components/RecentSearches";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptonite",
  description: "An app which lets users track cryptocurrencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-900 mb-5`}>
        <Providers>
          <Header />
          <RecentSearches />
          {children}
        </Providers>
      </body>
    </html>
  );
}
