"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";
import * as gtag from "@/lib/gtag";

interface OrderData {
  txId: string;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
    selectedVariants: Record<string, string>;
  }>;
  total: number;
  payment: string;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("last_order");
      if (!raw) return;
      const data: OrderData = JSON.parse(raw);
      setOrder(data);

      // GA: purchase
      gtag.purchase(
        data.txId,
        data.items.map((i) => ({
          item_id: i.id,
          item_name: i.name,
          item_brand: i.brand,
          item_category: i.category,
          price: i.price,
          quantity: i.quantity,
        })),
        data.total
      );

      // Clean up so a refresh doesn't re-fire
      sessionStorage.removeItem("last_order");
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">No order found</h1>
        <p className="text-gray-500 mt-2 mb-8">
          Complete a checkout to see your confirmation here.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  const paymentLabel: Record<string, string> = {
    card: "Credit / Debit Card",
    paypal: "PayPal",
    applepay: "Apple Pay",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success banner */}
      <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center mb-10">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you, <strong>{order.form.firstName}</strong>! Your order has been placed.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          A confirmation would be sent to <strong>{order.form.email}</strong> (this is a demo).
        </p>
        <div className="mt-4 inline-block bg-white border border-green-200 rounded-xl px-4 py-2 text-sm font-mono text-gray-700">
          {order.txId}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Items Ordered</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {order.items.map((item) => {
              const variantLabel = Object.entries(item.selectedVariants)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" · ");
              return (
                <div key={`${item.id}_${JSON.stringify(item.selectedVariants)}`} className="flex items-center gap-4 py-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    {variantLabel && <p className="text-xs text-gray-400">{variantLabel}</p>}
                    <p className="text-xs text-gray-400">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    €{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>€{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">Shipping To</h2>
          <div className="text-sm text-gray-600 flex flex-col gap-0.5">
            <p className="font-medium text-gray-900">{order.form.firstName} {order.form.lastName}</p>
            <p>{order.form.address}</p>
            <p>{order.form.zip} {order.form.city}</p>
            <p>{order.form.country}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">Payment Method</h2>
          <p className="text-sm text-gray-600">{paymentLabel[order.payment] ?? order.payment}</p>
          <p className="text-xs text-gray-400 mt-2">No real charge was made — this is a demo store.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <Link
          href="/"
          className="flex-1 text-center bg-indigo-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/category/clothing"
          className="flex-1 text-center border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl hover:border-gray-400 transition-colors"
        >
          Browse Clothing
        </Link>
      </div>
    </div>
  );
}
