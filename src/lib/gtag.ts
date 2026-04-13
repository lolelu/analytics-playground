// GA4 measurement ID — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to activate
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

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

// gtag is injected by the script tag in layout.tsx
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Guard — silently no-op when GA is not configured
function track(event: string, params: Record<string, unknown>): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

// ──────────────────────────────────────────────────────────────────────────────
// Page view (called on route change)
// ──────────────────────────────────────────────────────────────────────────────

export function pageView(url: string): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

// ──────────────────────────────────────────────────────────────────────────────
// E-commerce events
// ──────────────────────────────────────────────────────────────────────────────

export function viewItemList(items: GaItem[], listName: string): void {
  track("view_item_list", { item_list_name: listName, items });
}

export function viewItem(item: GaItem): void {
  track("view_item", { currency: "EUR", value: item.price, items: [item] });
}

export function addToCart(item: GaItem): void {
  track("add_to_cart", {
    currency: "EUR",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });
}

export function removeFromCart(item: GaItem): void {
  track("remove_from_cart", {
    currency: "EUR",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });
}

export function viewCart(items: GaItem[], value: number): void {
  track("view_cart", { currency: "EUR", value, items });
}

export function beginCheckout(items: GaItem[], value: number): void {
  track("begin_checkout", { currency: "EUR", value, items });
}

export function addPaymentInfo(
  items: GaItem[],
  value: number,
  paymentType: string
): void {
  track("add_payment_info", { currency: "EUR", value, payment_type: paymentType, items });
}

export function purchase(
  transactionId: string,
  items: GaItem[],
  value: number
): void {
  track("purchase", {
    transaction_id: transactionId,
    currency: "EUR",
    value,
    shipping: 0,
    tax: 0,
    items,
  });
}
