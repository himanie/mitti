"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Search } from "lucide-react";


export default function Navbar() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const total = cart.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );

      setCount(total);
  };
  useEffect(() => {
    updateCartCount();

    const handler = () => updateCartCount();
    window.addEventListener("cartUpdated", handler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
    };
  }, []);

  return (
   <header className="sticky top-0 z-50 bg-[#1F4D3A] shadow-md transition-all duration-300">
      <div className="w-full px-3 md:px-6 py-2 flex items-center">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/mitti-logo.png"
            alt="Mitti Logo"
            className="h-14 w-14 md:h-16 md:w-16 object-contain"
          />

          <span className="text-2xl md:text-3xl font-bold text-[#FFF3C4]">
            Mitti
          </span>
        </Link>

    
        <div className="flex-1 mx-6 hidden md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search handmade products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white rounded-full py-2.5 pl-11 pr-4 outline-none shadow-sm"
            />
          </div>
        </div>


        <div className="flex items-center gap-6">

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-[#FFF3C4] font-medium hover:text-white transition"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-[#FFF3C4] font-medium hover:text-white transition"
            >
              Products
            </Link>

            <Link
              href="/about"
              className="text-[#FFF3C4] font-medium hover:text-white transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-[#FFF3C4] font-medium hover:text-white transition"
            >
              Contact
            </Link>
          </nav>

          <button className="text-[#FFF3C4] hover:scale-110 transition">
            <Heart size={24} />
          </button>

            <Link href="/cart">
            <div className="relative cursor-pointer text-[#FFF3C4] hover:scale-105 transition">
              
              <ShoppingBag size={24}/>

              <span className="absolute -top-2 -right-2 bg-[#1F4D3A] text-white text-[10px] px-1.5 rounded-full">
                {count}
              </span>

            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-3 pb-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full py-2.5 pl-11 pr-4 outline-none"
          />
        </div>
      </div>
    </header>
  );
}