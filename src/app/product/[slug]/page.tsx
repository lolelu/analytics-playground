"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { CartItem, useCart } from "@/context/CartContext";
import * as gtag from "@/lib/gtag";

export default function PDPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const maybeProduct = getProductBySlug(slug);
  if (!maybeProduct) notFound();
  const product = maybeProduct;

  const { addItem } = useCart();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // GA: view_item
  useEffect(() => {
    gtag.viewItem({
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category,
      price: product.price,
    });
  }, [product]);

  function handleAddToCart() {
    if (!product.inStock) return;

    const item: CartItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      category: product.category,
      selectedVariants,
      quantity: qty,
    };

    addItem(item);

    gtag.addToCart({
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category,
      price: product.price,
      quantity: qty,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${product.category}`} className="hover:text-gray-600 capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100" style={{ position: "relative" }}>
            <Image
              src={product.images[selectedImage] ?? product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{ position: "relative" }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-indigo-600" : "border-transparent"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">{product.brand}</p>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} · {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">€{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.label}>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {variant.label}
                {selectedVariants[variant.label] && (
                  <span className="ml-2 font-normal text-gray-500">
                    — {selectedVariants[variant.label]}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setSelectedVariants((prev) => ({ ...prev, [variant.label]: opt }))
                    }
                    className={`px-4 py-2 text-sm rounded-xl border-2 transition-colors ${
                      selectedVariants[variant.label] === opt
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Qty */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="text-base font-semibold w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-colors ${
                !product.inStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {!product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
            </button>

            {product.inStock && (
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 rounded-2xl font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                Buy Now
              </button>
            )}
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">About this product</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
