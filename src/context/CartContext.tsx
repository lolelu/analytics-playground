"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  selectedVariants: Record<string, string>;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; key: string }
  | { type: "UPDATE_QTY"; key: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

function itemKey(item: Pick<CartItem, "id" | "selectedVariants">): string {
  const variants = Object.entries(item.selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${item.id}_${variants}`;
}

// ──────────────────────────────────────────────────────────────────────────────
// Reducer
// ──────────────────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD": {
      const key = itemKey(action.item);
      const existing = state.items.find((i) => itemKey(i) === key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            itemKey(i) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => itemKey(i) !== action.key) };

    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => itemKey(i) !== action.key) };
      }
      return {
        items: state.items.map((i) =>
          itemKey(i) === action.key ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateQty: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  getKey: (item: Pick<CartItem, "id" | "selectedVariants">) => string;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "analytics_playground_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const total = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD", item }), []);
  const removeItem = useCallback(
    (item: CartItem) => dispatch({ type: "REMOVE", key: itemKey(item) }),
    []
  );
  const updateQty = useCallback(
    (item: CartItem, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", key: itemKey(item), quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <CartContext.Provider
      value={{ items: state.items, total, itemCount, addItem, removeItem, updateQty, clearCart, getKey: itemKey }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
