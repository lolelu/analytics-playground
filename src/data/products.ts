export type Category = "clothing" | "electronics";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subcategory: string;
  image: string;
  images: string[];
  description: string;
  variants?: { label: string; options: string[] }[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  // ── CLOTHING ────────────────────────────────────────────────────────────────
  {
    id: "c1",
    slug: "classic-white-tee",
    name: "Classic White Tee",
    brand: "Basics Co.",
    price: 29,
    category: "clothing",
    subcategory: "T-Shirts",
    image: "https://picsum.photos/seed/c1/600/600",
    images: [
      "https://picsum.photos/seed/c1/600/600",
      "https://picsum.photos/seed/c1b/600/600",
    ],
    description:
      "Timeless crew-neck t-shirt made from 100% organic cotton. Soft, breathable, and built to last season after season.",
    variants: [
      { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { label: "Color", options: ["White", "Black", "Grey"] },
    ],
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: "c2",
    slug: "slim-fit-chinos",
    name: "Slim Fit Chinos",
    brand: "UrbanThread",
    price: 79,
    originalPrice: 99,
    category: "clothing",
    subcategory: "Trousers",
    image: "https://picsum.photos/seed/c2/600/600",
    images: [
      "https://picsum.photos/seed/c2/600/600",
      "https://picsum.photos/seed/c2b/600/600",
    ],
    description:
      "Versatile slim-fit chinos that move from the office to the weekend effortlessly. Wrinkle-resistant fabric.",
    variants: [
      { label: "Size", options: ["28", "30", "32", "34", "36"] },
      { label: "Color", options: ["Khaki", "Navy", "Olive"] },
    ],
    rating: 4.4,
    reviewCount: 187,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "c3",
    slug: "wool-blend-coat",
    name: "Wool Blend Overcoat",
    brand: "Maison Loft",
    price: 249,
    category: "clothing",
    subcategory: "Outerwear",
    image: "https://picsum.photos/seed/c3/600/600",
    images: [
      "https://picsum.photos/seed/c3/600/600",
      "https://picsum.photos/seed/c3b/600/600",
    ],
    description:
      "Elegant double-breasted overcoat crafted from a premium wool blend. The perfect layer for cold-weather dressing.",
    variants: [{ label: "Size", options: ["XS", "S", "M", "L", "XL"] }],
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "c4",
    slug: "graphic-hoodie",
    name: "Graphic Pullover Hoodie",
    brand: "Streetlab",
    price: 65,
    category: "clothing",
    subcategory: "Hoodies",
    image: "https://picsum.photos/seed/c4/600/600",
    images: [
      "https://picsum.photos/seed/c4/600/600",
      "https://picsum.photos/seed/c4b/600/600",
    ],
    description:
      "Bold graphic print on a heavyweight fleece hoodie. Kangaroo pocket, ribbed cuffs, and an oversized fit.",
    variants: [
      { label: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { label: "Color", options: ["Black", "Cream", "Forest Green"] },
    ],
    rating: 4.5,
    reviewCount: 228,
    inStock: true,
  },
  {
    id: "c5",
    slug: "linen-shirt",
    name: "Relaxed Linen Shirt",
    brand: "Basics Co.",
    price: 59,
    category: "clothing",
    subcategory: "Shirts",
    image: "https://picsum.photos/seed/c5/600/600",
    images: ["https://picsum.photos/seed/c5/600/600"],
    description:
      "Breathable linen shirt with a relaxed cut. Perfect for summer brunches, beach days, or casual Fridays.",
    variants: [
      { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { label: "Color", options: ["White", "Sky Blue", "Sand"] },
    ],
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: "c6",
    slug: "running-shorts",
    name: "Lightweight Running Shorts",
    brand: "PacePro",
    price: 45,
    category: "clothing",
    subcategory: "Activewear",
    image: "https://picsum.photos/seed/c6/600/600",
    images: ["https://picsum.photos/seed/c6/600/600"],
    description:
      "4-inch inseam running shorts with built-in liner, reflective details, and a zippered back pocket.",
    variants: [
      { label: "Size", options: ["S", "M", "L", "XL"] },
      { label: "Color", options: ["Black", "Blue", "Red"] },
    ],
    rating: 4.7,
    reviewCount: 403,
    inStock: true,
  },
  {
    id: "c7",
    slug: "denim-jacket",
    name: "Classic Denim Jacket",
    brand: "UrbanThread",
    price: 119,
    originalPrice: 149,
    category: "clothing",
    subcategory: "Outerwear",
    image: "https://picsum.photos/seed/c7/600/600",
    images: [
      "https://picsum.photos/seed/c7/600/600",
      "https://picsum.photos/seed/c7b/600/600",
    ],
    description:
      "A wardrobe staple. Mid-wash denim jacket with chest pockets and a slightly relaxed fit.",
    variants: [{ label: "Size", options: ["XS", "S", "M", "L", "XL"] }],
    rating: 4.5,
    reviewCount: 211,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "c8",
    slug: "yoga-leggings",
    name: "High-Waist Yoga Leggings",
    brand: "PacePro",
    price: 75,
    category: "clothing",
    subcategory: "Activewear",
    image: "https://picsum.photos/seed/c8/600/600",
    images: ["https://picsum.photos/seed/c8/600/600"],
    description:
      "4-way stretch fabric, moisture-wicking and squat-proof. Wide waistband with hidden pocket.",
    variants: [
      { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { label: "Color", options: ["Black", "Dusty Rose", "Midnight Blue"] },
    ],
    rating: 4.9,
    reviewCount: 678,
    inStock: true,
    badge: "New",
  },
  {
    id: "c9",
    slug: "merino-sweater",
    name: "Merino Wool Crew Sweater",
    brand: "Maison Loft",
    price: 145,
    category: "clothing",
    subcategory: "Knitwear",
    image: "https://picsum.photos/seed/c9/600/600",
    images: ["https://picsum.photos/seed/c9/600/600"],
    description:
      "Ultra-soft merino wool in a classic crew neck silhouette. Naturally temperature-regulating.",
    variants: [
      { label: "Size", options: ["S", "M", "L", "XL"] },
      { label: "Color", options: ["Oatmeal", "Burgundy", "Slate"] },
    ],
    rating: 4.7,
    reviewCount: 132,
    inStock: true,
  },
  {
    id: "c10",
    slug: "cargo-pants",
    name: "Utility Cargo Pants",
    brand: "Streetlab",
    price: 89,
    category: "clothing",
    subcategory: "Trousers",
    image: "https://picsum.photos/seed/c10/600/600",
    images: ["https://picsum.photos/seed/c10/600/600"],
    description:
      "6-pocket cargo pants with an adjustable waist and a straight-leg fit. Ripstop nylon construction.",
    variants: [
      { label: "Size", options: ["28", "30", "32", "34", "36"] },
      { label: "Color", options: ["Olive", "Black", "Stone"] },
    ],
    rating: 4.4,
    reviewCount: 199,
    inStock: true,
    badge: "New",
  },
  {
    id: "c11",
    slug: "polo-shirt",
    name: "Pique Polo Shirt",
    brand: "Basics Co.",
    price: 49,
    category: "clothing",
    subcategory: "T-Shirts",
    image: "https://picsum.photos/seed/c11/600/600",
    images: ["https://picsum.photos/seed/c11/600/600"],
    description:
      "A refined take on the classic polo. Cotton-pique fabric with embroidered logo detail.",
    variants: [
      { label: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { label: "Color", options: ["Navy", "White", "Bottle Green"] },
    ],
    rating: 4.3,
    reviewCount: 88,
    inStock: true,
  },
  {
    id: "c12",
    slug: "trench-coat",
    name: "Double-Breasted Trench",
    brand: "Maison Loft",
    price: 319,
    category: "clothing",
    subcategory: "Outerwear",
    image: "https://picsum.photos/seed/c12/600/600",
    images: [
      "https://picsum.photos/seed/c12/600/600",
      "https://picsum.photos/seed/c12b/600/600",
    ],
    description:
      "The iconic trench coat, reimagined in a water-repellent cotton-gabardine. A true investment piece.",
    variants: [{ label: "Size", options: ["XS", "S", "M", "L", "XL"] }],
    rating: 4.9,
    reviewCount: 57,
    inStock: false,
    badge: "Sold Out",
  },

  // ── ELECTRONICS ─────────────────────────────────────────────────────────────
  {
    id: "e1",
    slug: "wireless-earbuds-pro",
    name: "SoundCore Pro Earbuds",
    brand: "SoundCore",
    price: 129,
    originalPrice: 159,
    category: "electronics",
    subcategory: "Audio",
    image: "https://picsum.photos/seed/e1/600/600",
    images: [
      "https://picsum.photos/seed/e1/600/600",
      "https://picsum.photos/seed/e1b/600/600",
    ],
    description:
      "Active noise cancellation, 30h total battery life, and a customizable EQ. IPX5 water resistance.",
    variants: [{ label: "Color", options: ["Midnight Black", "Pearl White"] }],
    rating: 4.7,
    reviewCount: 1024,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "e2",
    slug: "4k-monitor",
    name: "ClearView 27\" 4K Monitor",
    brand: "ClearView",
    price: 499,
    category: "electronics",
    subcategory: "Monitors",
    image: "https://picsum.photos/seed/e2/600/600",
    images: [
      "https://picsum.photos/seed/e2/600/600",
      "https://picsum.photos/seed/e2b/600/600",
    ],
    description:
      "IPS panel, 144Hz refresh rate, 1ms response time, USB-C 90W charging, and factory-calibrated colour accuracy.",
    variants: [],
    rating: 4.8,
    reviewCount: 432,
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "e3",
    slug: "mechanical-keyboard",
    name: "TypeMaster TKL Keyboard",
    brand: "TypeMaster",
    price: 149,
    category: "electronics",
    subcategory: "Keyboards & Mice",
    image: "https://picsum.photos/seed/e3/600/600",
    images: ["https://picsum.photos/seed/e3/600/600"],
    description:
      "Tenkeyless mechanical keyboard with Cherry MX switches, per-key RGB, and a detachable USB-C cable.",
    variants: [
      {
        label: "Switch",
        options: ["Red (Linear)", "Brown (Tactile)", "Blue (Clicky)"],
      },
    ],
    rating: 4.6,
    reviewCount: 789,
    inStock: true,
  },
  {
    id: "e4",
    slug: "smart-speaker",
    name: "Pulse Mini Smart Speaker",
    brand: "Pulse Audio",
    price: 89,
    originalPrice: 109,
    category: "electronics",
    subcategory: "Smart Home",
    image: "https://picsum.photos/seed/e4/600/600",
    images: ["https://picsum.photos/seed/e4/600/600"],
    description:
      "360° room-filling sound, built-in voice assistant, and multi-room support. Works with all major ecosystems.",
    variants: [{ label: "Color", options: ["Charcoal", "Sand", "Sage"] }],
    rating: 4.4,
    reviewCount: 566,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "e5",
    slug: "portable-ssd",
    name: "FlashVault 1TB Portable SSD",
    brand: "FlashVault",
    price: 99,
    category: "electronics",
    subcategory: "Storage",
    image: "https://picsum.photos/seed/e5/600/600",
    images: ["https://picsum.photos/seed/e5/600/600"],
    description:
      "1050 MB/s read speeds, USB 3.2 Gen 2, password protection, and shock-resistant casing. Fits in your pocket.",
    variants: [{ label: "Capacity", options: ["500GB", "1TB", "2TB"] }],
    rating: 4.8,
    reviewCount: 318,
    inStock: true,
  },
  {
    id: "e6",
    slug: "webcam-4k",
    name: "StreamCam 4K Webcam",
    brand: "StreamCam",
    price: 119,
    category: "electronics",
    subcategory: "Webcams",
    image: "https://picsum.photos/seed/e6/600/600",
    images: ["https://picsum.photos/seed/e6/600/600"],
    description:
      "4K 30fps with autofocus, integrated stereo mics, and a privacy shutter. Plug-and-play on any OS.",
    variants: [],
    rating: 4.5,
    reviewCount: 244,
    inStock: true,
    badge: "New",
  },
  {
    id: "e7",
    slug: "usb-c-hub",
    name: "Nexus 10-in-1 USB-C Hub",
    brand: "Nexus",
    price: 69,
    originalPrice: 89,
    category: "electronics",
    subcategory: "Accessories",
    image: "https://picsum.photos/seed/e7/600/600",
    images: ["https://picsum.photos/seed/e7/600/600"],
    description:
      "HDMI 4K, 3× USB-A 3.0, USB-C PD 100W, SD/microSD, Gigabit Ethernet, and 3.5mm audio — all in one slim hub.",
    variants: [],
    rating: 4.6,
    reviewCount: 921,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "e8",
    slug: "noise-cancelling-headphones",
    name: "QuietZone ANC Headphones",
    brand: "SoundCore",
    price: 279,
    category: "electronics",
    subcategory: "Audio",
    image: "https://picsum.photos/seed/e8/600/600",
    images: [
      "https://picsum.photos/seed/e8/600/600",
      "https://picsum.photos/seed/e8b/600/600",
    ],
    description:
      "Industry-leading ANC with 40h battery, multipoint Bluetooth, and premium memory-foam earcups.",
    variants: [{ label: "Color", options: ["Midnight Black", "Silver"] }],
    rating: 4.9,
    reviewCount: 2103,
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "e9",
    slug: "smart-watch",
    name: "TrackFit Pro Smartwatch",
    brand: "TrackFit",
    price: 249,
    originalPrice: 299,
    category: "electronics",
    subcategory: "Wearables",
    image: "https://picsum.photos/seed/e9/600/600",
    images: ["https://picsum.photos/seed/e9/600/600"],
    description:
      "Always-on AMOLED display, GPS, heart-rate & SpO2 monitoring, 14-day battery, and 100+ workout modes.",
    variants: [
      { label: "Band Color", options: ["Black", "Blue", "Green", "Red"] },
    ],
    rating: 4.6,
    reviewCount: 887,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "e10",
    slug: "desk-lamp",
    name: "LumiDesk LED Desk Lamp",
    brand: "LumiDesk",
    price: 55,
    category: "electronics",
    subcategory: "Lighting",
    image: "https://picsum.photos/seed/e10/600/600",
    images: ["https://picsum.photos/seed/e10/600/600"],
    description:
      "Eye-care LED lamp with 5 colour modes, 10 brightness levels, wireless charging base, and USB-A pass-through.",
    variants: [{ label: "Color", options: ["White", "Black"] }],
    rating: 4.4,
    reviewCount: 341,
    inStock: true,
  },
  {
    id: "e11",
    slug: "gaming-mouse",
    name: "SwiftClick Pro Gaming Mouse",
    brand: "SwiftClick",
    price: 79,
    category: "electronics",
    subcategory: "Keyboards & Mice",
    image: "https://picsum.photos/seed/e11/600/600",
    images: ["https://picsum.photos/seed/e11/600/600"],
    description:
      "25,600 DPI optical sensor, 8 programmable buttons, 70h battery, and ultra-lightweight at 69g.",
    variants: [{ label: "Color", options: ["Black", "White"] }],
    rating: 4.7,
    reviewCount: 1542,
    inStock: true,
  },
  {
    id: "e12",
    slug: "portable-charger",
    name: "PowerBank Ultra 26800mAh",
    brand: "Nexus",
    price: 59,
    category: "electronics",
    subcategory: "Accessories",
    image: "https://picsum.photos/seed/e12/600/600",
    images: ["https://picsum.photos/seed/e12/600/600"],
    description:
      "26800mAh, 65W PD fast charge, dual USB-A + USB-C output, and LCD power indicator. Charge 3 devices at once.",
    variants: [],
    rating: 4.5,
    reviewCount: 673,
    inStock: true,
    badge: "New",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) =>
    ["c3", "c8", "e2", "e8"].includes(p.id)
  );
}
