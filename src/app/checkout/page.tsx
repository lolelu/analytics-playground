"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PaymentMethod, PaymentSelector } from "@/components/PaymentSelector";
import * as gtag from "@/lib/gtag";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

const EMPTY_FORM: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  country: "Italy",
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [submitting, setSubmitting] = useState(false);

  // GA: begin_checkout
  useEffect(() => {
    if (items.length === 0) return;
    gtag.beginCheckout(
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

  // GA: add_payment_info when method is selected
  useEffect(() => {
    if (!payment || items.length === 0) return;
    gtag.addPaymentInfo(
      items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        item_brand: i.brand,
        item_category: i.category,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      payment
    );
  }, [payment]); // run when payment changes

  function validate(): boolean {
    const e: Partial<ShippingForm> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !payment) return;

    setSubmitting(true);

    // Generate a mock transaction ID
    const txId = `ORD-${Date.now()}`;

    // Store order info for confirmation page
    sessionStorage.setItem(
      "last_order",
      JSON.stringify({ txId, items, total, payment, form })
    );

    clearCart();

    setTimeout(() => {
      router.push("/order-confirmation");
    }, 800);
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Nothing to check out</h1>
        <p className="text-gray-500 mt-2 mb-8">Add some products first.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link href="/cart" className="hover:text-gray-600">Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">Checkout</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Shipping */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                />
                <Field
                  label="Last Name"
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                />
                <div className="col-span-2">
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    label="Address"
                    value={form.address}
                    error={errors.address}
                    onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                  />
                </div>
                <Field
                  label="City"
                  value={form.city}
                  error={errors.city}
                  onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                />
                <Field
                  label="ZIP / Postal Code"
                  value={form.zip}
                  error={errors.zip}
                  onChange={(v) => setForm((f) => ({ ...f, zip: v }))}
                />
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {["Italy", "France", "Germany", "Spain", "United Kingdom", "United States"].map(
                      (c) => <option key={c}>{c}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
              <PaymentSelector selected={payment} onChange={setPayment} />
              {!payment && submitting && (
                <p className="text-xs text-red-500 mt-2">Please select a payment method.</p>
              )}
            </div>
          </div>

          {/* Right column — Order summary */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}_${JSON.stringify(item.selectedVariants)}`} className="flex items-center gap-3 text-sm">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-gray-400">×{item.quantity}</p>
                    </div>
                    <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 rounded-2xl font-semibold transition-colors ${
                  submitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {submitting ? "Placing Order…" : "Place Order"}
              </button>

              <p className="text-xs text-center text-gray-400">
                This is a demo — no real payment will be charged.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Small helper component
// ──────────────────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  error,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
