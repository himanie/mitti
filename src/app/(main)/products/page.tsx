"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";
import { Heart, ShoppingBag, Search } from "lucide-react";

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
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF3C4]">
   


     <main className="px-4 sm:px-6 lg:px-10 py-10 animate-[fadeIn_0.8s_ease-in-out]">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#1F4D3A] mb-10">
          Handmade Collection
        </h1>

     
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group block break-inside-avoid bg-[#1F4D3A] rounded-3xl p-4 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <img
                src={
                  p.images?.[0]?.url ||
                  "https://picsum.photos/500/500"
                }
                alt={p.name}
                className="w-full rounded-2xl object-cover"
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#FFF3C4] transition-all duration-300 group-hover:translate-x-1">
                  {p.name}
                </h3>

                <p className="text-xl font-bold text-white mt-2 transition-all duration-300 group-hover:text-[#D89A2B]">
                  ₹{p.priceInr}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center mt-10 text-[#1F4D3A] text-lg">
            No products found.
          </p>
        )}
      </main>
    </div>
  );
}