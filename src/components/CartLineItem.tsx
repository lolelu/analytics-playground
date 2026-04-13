"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, useCart } from "@/context/CartContext";
import * as gtag from "@/lib/gtag";

interface Props {
  item: CartItem;
}

export function CartLineItem({ item }: Props) {
  const { removeItem, updateQty, getKey } = useCart();

  function handleRemove() {
    gtag.removeFromCart({
      item_id: item.id,
      item_name: item.name,
      item_brand: item.brand,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    });
    removeItem(item);
  }

  function handleQty(delta: number) {
    const next = item.quantity + delta;
    if (next <= 0) {
      handleRemove();
    } else {
      updateQty(item, next);
    }
  }

  const variantLabel = Object.entries(item.selectedVariants)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{item.brand}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
        {variantLabel && (
          <p className="text-xs text-gray-500">{variantLabel}</p>
        )}

        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => handleQty(-1)}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => handleQty(1)}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={handleRemove}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-sm font-bold text-gray-900 shrink-0">
        €{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
