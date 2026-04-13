"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/CartLineItem";
import * as gtag from "@/lib/gtag";

export default function CartPage() {
  const { items, total } = useCart();

  // GA: view_cart
  useEffect(() => {
    if (items.length === 0) return;
    gtag.viewCart(
      items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        item_brand: i.brand,
        item_category: i.category,
        price: i.price,
        quantity: i.quantity,
      })),
      total
    );
  }, []); // run once on mount

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100 px-6">
          {items.map((item) => (
            <CartLineItem key={`${item.id}_${JSON.stringify(item.selectedVariants)}`} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-fit">
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>€0.00</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full text-center bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="text-sm text-center text-indigo-600 hover:text-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
