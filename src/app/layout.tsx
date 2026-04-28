import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { GAPageTracker } from "@/components/GAPageTracker";
import { GTM_ID } from "@/lib/gtag";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoplab — Analytics Playground",
  description: "A mockup e-commerce store for testing GA4 events and funnels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-gray-50 font-[var(--font-geist)]">

        {/* ── Google Tag Manager ── */}
        {GTM_ID && (
          <>
            {/* Head snippet — loads GTM as early as possible */}
            <Script id="gtm-head" strategy="beforeInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}</Script>

            {/* Body noscript fallback */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
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
