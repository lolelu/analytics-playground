"use client";

import { CreditCard, Smartphone, Wallet } from "lucide-react";

export type PaymentMethod = "card" | "paypal" | "applepay";

interface Props {
  selected: PaymentMethod | null;
  onChange: (method: PaymentMethod) => void;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] =
  [
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, Amex",
    },
    {
      id: "paypal",
      label: "PayPal",
      icon: <Wallet className="w-5 h-5" />,
      description: "Pay via your PayPal account",
    },
    {
      id: "applepay",
      label: "Apple Pay",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Fast, secure checkout",
    },
  ];

export function PaymentSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {METHODS.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
            selected === m.id
              ? "border-indigo-600 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span
            className={`shrink-0 ${selected === m.id ? "text-indigo-600" : "text-gray-500"}`}
          >
            {m.icon}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{m.label}</p>
            <p className="text-xs text-gray-500">{m.description}</p>
          </div>
          <span
            className={`ml-auto w-4 h-4 rounded-full border-2 shrink-0 ${
              selected === m.id ? "border-indigo-600 bg-indigo-600" : "border-gray-300"
            }`}
          />
        </button>
      ))}

      {/* Mock card fields */}
      {selected === "card" && (
        <div className="mt-2 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Card Number
            </label>
            <input
              type="text"
              defaultValue="4242 4242 4242 4242"
              readOnly
              className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
              <input
                type="text"
                defaultValue="12 / 28"
                readOnly
                className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">CVC</label>
              <input
                type="text"
                defaultValue="123"
                readOnly
                className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            This is a demo — no real payment is processed.
          </p>
        </div>
      )}

      {selected === "paypal" && (
        <div className="mt-2 p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700">
          You&apos;d be redirected to PayPal to complete payment. <span className="font-medium">(Demo only)</span>
        </div>
      )}

      {selected === "applepay" && (
        <div className="mt-2 p-4 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white text-center rounded-xl">
          <span className="font-medium">Apple Pay</span> — Touch ID or Face ID would be triggered here. <span className="text-gray-400">(Demo only)</span>
        </div>
      )}
    </div>
  );
}
