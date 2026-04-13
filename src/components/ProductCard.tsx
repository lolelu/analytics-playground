import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="aspect-square bg-gray-50 overflow-hidden" style={{ position: "relative" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              product.badge === "Sale"
                ? "bg-red-500 text-white"
                : product.badge === "New"
                ? "bg-indigo-600 text-white"
                : product.badge === "Sold Out"
                ? "bg-gray-400 text-white"
                : "bg-amber-400 text-gray-900"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-base font-bold text-gray-900">
            €{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              €{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
