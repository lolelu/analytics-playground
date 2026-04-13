"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
            Shoplab<span className="text-indigo-600">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/category/clothing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clothing
            </Link>
            <Link
              href="/category/electronics"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Electronics
            </Link>
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          <Link
            href="/category/clothing"
            className="text-sm font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Clothing
          </Link>
          <Link
            href="/category/electronics"
            className="text-sm font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Electronics
          </Link>
        </div>
      )}
    </header>
  );
}
