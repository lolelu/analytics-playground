// Google Tag Manager container ID — set NEXT_PUBLIC_GTM_ID in .env.local
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface GaItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  price: number;
  quantity?: number;
  index?: number;
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Internal push helper
// Guards on GTM_ID being set and runs only in the browser.
// ──────────────────────────────────────────────────────────────────────────────

function push(obj: Record<string, unknown>): void {
  if (!GTM_ID || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

// Always clear the previous ecommerce object before pushing a new one.
// This prevents events from bleeding into each other in GA4.
function pushEcommerce(event: string, ecommerce: Record<string, unknown>): void {
  push({ ecommerce: null }); // clear
  push({ event, ecommerce });
}

// ──────────────────────────────────────────────────────────────────────────────
// Page view — fired on every client-side route change
// GTM should have a trigger on the custom "page_view" event (or "History Change")
// ──────────────────────────────────────────────────────────────────────────────

export function pageView(url: string): void {
  push({ event: "page_view", page_path: url });
}

// ──────────────────────────────────────────────────────────────────────────────
// E-commerce events (GA4 Enhanced E-commerce schema)
// ──────────────────────────────────────────────────────────────────────────────

export function viewItemList(items: GaItem[], listName: string): void {
  pushEcommerce("view_item_list", {
    item_list_name: listName,
    items,
  });
}

export function viewItem(item: GaItem): void {
  pushEcommerce("view_item", {
    currency: "EUR",
    value: item.price,
    items: [item],
  });
}

export function addToCart(item: GaItem): void {
  pushEcommerce("add_to_cart", {
    currency: "EUR",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });
}

export function removeFromCart(item: GaItem): void {
  pushEcommerce("remove_from_cart", {
    currency: "EUR",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });
}

export function viewCart(items: GaItem[], value: number): void {
  pushEcommerce("view_cart", {
    currency: "EUR",
    value,
    items,
  });
}

export function beginCheckout(items: GaItem[], value: number): void {
  pushEcommerce("begin_checkout", {
    currency: "EUR",
    value,
    items,
  });
}

export function addPaymentInfo(
  items: GaItem[],
  value: number,
  paymentType: string
): void {
  pushEcommerce("add_payment_info", {
    currency: "EUR",
    value,
    payment_type: paymentType,
    items,
  });
}

export function purchase(
  transactionId: string,
  items: GaItem[],
  value: number
): void {
  pushEcommerce("purchase", {
    transaction_id: transactionId,
    currency: "EUR",
    value,
    shipping: 0,
    tax: 0,
    items,
  });
}
