import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">No products found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
