"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Search, ArrowUpRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  priceInr: number;
  images: {
    url: string;
  }[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF3C4]">
      <main className="px-4 sm:px-6 lg:px-10 py-12 animate-[fadeIn_0.8s_ease-in-out]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#D89A2B] mb-3">
            Mitti Originals
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1F4D3A]">
            Handmade Collection
          </h1>
          <p className="mt-4 text-[#1F4D3A]/70">
            Earthy, handcrafted pieces made to bring warmth into your everyday
            life.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F4D3A]/50"
            />
            <input
              type="text"
              placeholder="Search the collection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/80 backdrop-blur rounded-full py-3 pl-11 pr-4 outline-none border border-[#1F4D3A]/15 focus:border-[#1F4D3A]/40 focus:ring-2 focus:ring-[#1F4D3A]/10 transition shadow-sm"
            />
          </div>
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid bg-[#1F4D3A]/10 rounded-3xl p-4 animate-pulse"
              >
                <div className="w-full h-60 rounded-2xl bg-[#1F4D3A]/15" />
                <div className="mt-4 h-4 w-2/3 rounded bg-[#1F4D3A]/15" />
                <div className="mt-3 h-5 w-1/3 rounded bg-[#1F4D3A]/15" />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group relative block break-inside-avoid bg-[#1F4D3A] rounded-3xl p-4 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={p.images?.[0]?.url || "https://picsum.photos/500/500"}
                    alt={p.name}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F4D3A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* wishlist */}
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#1F4D3A] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
                  >
                    <Heart size={16} />
                  </button>
                </div>

                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#FFF3C4] transition-all duration-300 group-hover:translate-x-1">
                      {p.name}
                    </h3>
                    <p className="text-xl font-bold text-white mt-2 transition-all duration-300 group-hover:text-[#D89A2B]">
                      ₹{p.priceInr.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="mt-1 w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[#FFF3C4]/10 text-[#FFF3C4] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-[#1F4D3A] text-lg font-medium">
              No products found
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-[#D89A2B] font-semibold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
