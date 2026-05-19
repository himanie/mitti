"use client";
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    { id: 1, name: "Laptop", price: 55000, image: "https://picsum.photos/300?1", desc: "High performance laptop" },
    { id: 2, name: "Headphones", price: 2000, image: "https://picsum.photos/300?2", desc: "Noise cancelling headphones" },
    { id: 3, name: "Shoes", price: 3000, image: "https://picsum.photos/300?3", desc: "Comfortable running shoes" },
    { id: 4, name: "Watch", price: 2500, image: "https://picsum.photos/300?4", desc: "Stylish wrist watch" },
    { id: 5, name: "Phone", price: 20000, image: "https://picsum.photos/300?5", desc: "Latest smartphone" },
    { id: 6, name: "Backpack", price: 1500, image: "https://picsum.photos/300?6", desc: "Durable backpack" },
  ];

  return (
    <div className="min-h-screen bg-[var(--secondary)] px-4 sm:px-6 md:px-10 py-6">

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--primary)]">
        Our Products
      </h1>

    
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">

        {products.map((p) => (
         <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="break-inside-avoid cursor-pointer bg-[var(--secondary)] rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition overflow-hidden"
          >
          <img
              src={`https://picsum.photos/300/${200 + p.id * 20}`}
              className="w-full object-cover rounded-2xl"
          />

            <h3 className="mt-2 text-sm sm:text-base text-[var(--primary)] font-semibold">
              {p.name}
            </h3>

            <p className="text-[var(--primary)] font-bold text-sm sm:text-base">
              ₹{p.price}
            </p>
          </div>
        ))}

      </div>


      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSelectedProduct(null)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[50%] lg:w-[40%] bg-[var(--secondary)] shadow-2xl p-5 sm:p-6 transform transition-transform duration-300 z-50 ${
          selectedProduct ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedProduct && (
          <>
            {/* Close */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="mb-4 text-[var(--primary)] font-bold"
            >
              ✕ Close
            </button>

            {/* Image */}
            <img
              src={selectedProduct.image}
              className="w-full h-48 sm:h-56 object-cover rounded-xl"
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-lg sm:text-2xl font-bold text-[var(--primary)]">
                {selectedProduct.name}
              </h2>

              <div className="flex gap-3 text-[var(--primary)] text-lg sm:text-xl">
                <Heart className="cursor-pointer hover:scale-110 transition" />
                <Share2 className="cursor-pointer hover:scale-110 transition" />
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm sm:text-base text-[var(--primary)]">
              {selectedProduct.desc}
            </p>

            {/* Price */}
            <p className="mt-2 font-bold text-[var(--primary)]">
              ₹{selectedProduct.price}
            </p>

            {/* Buttons */}
            <button className="mt-6 w-full bg-[var(--primary)] text-[var(--text-light)] py-2 rounded-xl text-sm sm:text-base">
              Buy Now
            </button>

            <button className="mt-3 w-full border-2 border-[var(--primary)] text-[var(--primary)] py-2 rounded-xl hover:bg-[var(--primary)] hover:text-white transition text-sm sm:text-base">
              Add to Cart
            </button>
          </>
        )}
      </div>

    </div>
  );
}