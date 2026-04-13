"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { Category, getProductsByCategory } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import * as gtag from "@/lib/gtag";

const CATEGORY_META: Record<Category, { title: string; description: string }> = {
  clothing: {
    title: "Clothing",
    description: "Tees, outerwear, activewear, knitwear and more.",
  },
  electronics: {
    title: "Electronics",
    description: "Audio, monitors, accessories, wearables and more.",
  },
};

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

export default function PLPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  if (slug !== "clothing" && slug !== "electronics") notFound();

  const category = slug as Category;
  const meta = CATEGORY_META[category];
  const allProducts = getProductsByCategory(category);

  const [sort, setSort] = useState<SortOption>("default");
  const [subcategory, setSubcategory] = useState<string>("All");

  // Collect unique subcategories
  const subcategories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.subcategory));
    return ["All", ...Array.from(set).sort()];
  }, [allProducts]);

  // Filter + sort
  const visibleProducts = useMemo(() => {
    let list = subcategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.subcategory === subcategory);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [allProducts, subcategory, sort]);

  // GA: view_item_list
  useEffect(() => {
    gtag.viewItemList(
      visibleProducts.map((p, i) => ({
        item_id: p.id,
        item_name: p.name,
        item_brand: p.brand,
        item_category: p.category,
        price: p.price,
        index: i,
      })),
      meta.title
    );
  }, [visibleProducts, meta.title]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{meta.title}</h1>
        <p className="mt-1 text-gray-500">{meta.description}</p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Subcategory pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubcategory(sub)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                subcategory === sub
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-4">
        {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
      </p>

      <ProductGrid products={visibleProducts} />
    </div>
  );
}
