"use client";
import { useState } from "react";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "Laptop", price: 55000, image: "https://picsum.photos/300?1", desc: "High performance laptop" },
    { id: 2, name: "Headphones", price: 2000, image: "https://picsum.photos/300?2", desc: "Noise cancelling headphones" },
    { id: 3, name: "Shoes", price: 3000, image: "https://picsum.photos/300?3", desc: "Comfortable running shoes" },
    { id: 4, name: "Watch", price: 2500, image: "https://picsum.photos/300?4", desc: "Stylish wrist watch" },
    { id: 5, name: "Phone", price: 20000, image: "https://picsum.photos/300?5", desc: "Latest smartphone" },
    { id: 6, name: "Backpack", price: 1500, image: "https://picsum.photos/300?6", desc: "Durable backpack" },
  ];

  return (
    <div className="min-h-screen bg-[var(--secondary)] p-8">

      <h1 className="text-4xl font-bold text-center mb-10 text-[var(--primary)]">
        Our Products
      </h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="cursor-pointer bg-[var(--secondary)] border-2 border-[var(--primary)] rounded-2xl p-4 hover:scale-105 transition"
          >
            <img src={p.image} className="w-full h-48 object-cover rounded-xl" />
            <h3 className="mt-3 text-[var(--primary)] font-semibold">{p.name}</h3>
            <p className="text-[var(--primary)] font-bold">₹{p.price}</p>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setSelectedProduct(null)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 w-[40vw] right-0 h-full bg-[var(--secondary)] shadow-2xl p-6 transform transition-transform duration-300 ${
          selectedProduct ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedProduct && (
          <>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mb-4 text-[var(--primary)] font-bold"
            >
              ✕ Close
            </button>

            <img
              src={selectedProduct.image}
              className="w-full h-48 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4 text-[var(--primary)]">
             span.
              {selectedProduct.name}
            </h2>

            <p className="mt-2 text-[var(--primary)]">
              {selectedProduct.desc}
            </p>

            <p className="mt-2 font-bold text-[var(--primary)]">
              ₹{selectedProduct.price}
            </p>

            <button className="mt-6 w-full bg-[var(--primary)] text-[var(--text-light)] py-2 rounded-xl">
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}