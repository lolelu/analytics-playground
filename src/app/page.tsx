import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Zap } from "lucide-react";
import { getFeaturedProducts, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ position: "absolute" }}>
          <Image
            src="https://picsum.photos/seed/hero/1600/700"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 flex flex-col items-start gap-6 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            New Season 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Style meets <br />
            <span className="text-violet-300">technology.</span>
          </h1>
          <p className="text-lg text-indigo-200 max-w-md">
            Explore our curated collection of clothing and electronics. Everything you need, nothing you don&apos;t.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/category/clothing"
              className="inline-flex items-center gap-2 bg-white text-indigo-900 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors"
            >
              Shop Clothing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/category/electronics"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors border border-white/20"
            >
              Shop Electronics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/category/clothing"
            className="group rounded-3xl overflow-hidden bg-gray-200 aspect-[16/7] flex items-end p-8"
            style={{ position: "relative" }}
          >
            <Image
              src="https://picsum.photos/seed/cat-clothing/800/350"
              alt="Clothing"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative flex items-center justify-between w-full">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm font-medium">12 products</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Clothing</h3>
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors">
                Explore →
              </span>
            </div>
          </Link>

          <Link
            href="/category/electronics"
            className="group rounded-3xl overflow-hidden bg-gray-800 aspect-[16/7] flex items-end p-8"
            style={{ position: "relative" }}
          >
            <Image
              src="https://picsum.photos/seed/cat-electronics/800/350"
              alt="Electronics"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative flex items-center justify-between w-full">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm font-medium">12 products</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Electronics</h3>
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors">
                Explore →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/category/clothing" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-indigo-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
              <Link href="/category/electronics" className="text-sm font-medium text-indigo-300 hover:text-white">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
