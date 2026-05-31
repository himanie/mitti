"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Share2, Star } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        cache: "no-store",
      }
    );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await res.json();
  return result.data;
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div className="min-h-screen bg-[#FFF3C4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

      
          <div>

 
            <div className="bg-[#1F4D3A] p-4 rounded-3xl shadow-xl">
              <img
                src={
                  product.images?.[0]?.url ||
                  "https://picsum.photos/900"
                }
                alt={product.name}
                className="w-full h-[450px] md:h-[600px] object-cover rounded-2xl"
              />
            </div>

       
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {product.images.map(
                  (
                    image: { url: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#1F4D3A]/20 bg-white"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            )}

          </div>

      
          <div className="text-[#1F4D3A]">

            <p className="uppercase tracking-[4px] text-sm opacity-70">
              Handmade Collection
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
              {product.name}
            </h1>

   
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-[#D89A2B]">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>

              <span className="text-sm opacity-70">
                4.8 (24 Reviews)
              </span>
            </div>

  
            <div className="flex items-center gap-4 mt-6">
              <span className="text-4xl font-bold">
                ₹{product.priceInr}
              </span>

              {product.comparePriceInr && (
                <span className="text-xl line-through opacity-50">
                  ₹{product.comparePriceInr}
                </span>
              )}
            </div>

         
            <div className="mt-3">
              <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>

          
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">
                Description
              </h2>

              <p className="leading-8 text-[#1F4D3A]/80">
                {product.description}
              </p>
            </div>

      
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <button className="w-10 h-10 rounded-lg bg-[#1F4D3A] text-white">
                  -
                </button>

                <span className="text-lg font-semibold">
                  1
                </span>

                <button className="w-10 h-10 rounded-lg bg-[#1F4D3A] text-white">
                  +
                </button>

              </div>
            </div>

      
            <div className="flex flex-wrap gap-4 mt-8">

              <button className="bg-[#1F4D3A] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
                Add to Cart
              </button>

              <button className="bg-[#D89A2B] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
                Buy Now
              </button>

              <button className="w-12 h-12 rounded-full border border-[#1F4D3A] flex items-center justify-center hover:bg-[#1F4D3A] hover:text-white transition">
                <Heart size={20} />
              </button>

              <button className="w-12 h-12 rounded-full border border-[#1F4D3A] flex items-center justify-center hover:bg-[#1F4D3A] hover:text-white transition">
                <Share2 size={20} />
              </button>

            </div>

         
            <div className="mt-10 border-t border-[#1F4D3A]/20 pt-6 space-y-3">

              <p>
                <span className="font-semibold">
                  SKU:
                </span>{" "}
                {product.sku}
              </p>

              <p>
                <span className="font-semibold">
                  Stock:
                </span>{" "}
                {product.stock}
              </p>

              <p>
                <span className="font-semibold">
                  Weight:
                </span>{" "}
                {product.weightGrams} g
              </p>

            </div>

         
            {product.story && (
              <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-[#1F4D3A]">
                  Artisan Story
                </h2>

                <p className="leading-8 text-[#1F4D3A]/80">
                  {product.story}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}