import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/storeProvider";
import { QueryProviders } from "@/reactQuery/QueryProvider";
import Navbar from "./_ui/navbar/Navbar";
import DataShopingCart from "./_ui/navbar/DataShopingCart";
import Footer from "./_ui/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartKart",
  description: "SmartKart created by Omar Ali ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviders>
            <StoreProvider >
              <div className="flex flex-col justify-betwee gap-4 min-h-screen">
              <header className="relative">
                <Navbar />
                <DataShopingCart/>
                
                
              </header>
              <main className="w-[90%] mx-auto mb-9 mt-22 grow">
                 {children}


              </main>
              <Footer />
              </div>
            </StoreProvider>
         </QueryProviders>

      </body>
    </html>
  );
}
