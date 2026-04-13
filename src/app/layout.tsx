import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { GAPageTracker } from "@/components/GAPageTracker";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoplab — Analytics Playground",
  description: "A mockup e-commerce store for testing GA4 events and funnels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-gray-50 font-[var(--font-geist)]">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `}</Script>
          </>
        )}
        <CartProvider>
          <Suspense>
            <GAPageTracker />
          </Suspense>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 bg-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
              Shoplab Analytics Playground — no real products, no real payments.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
