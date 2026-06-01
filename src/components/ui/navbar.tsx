"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="w-full px-3 md:px-6 py-2 flex items-center gap-3">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/mitti-logo.png"
            alt="Mitti Logo"
            className="h-12 w-12 md:h-16 md:w-16 object-contain"
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


        <div className="flex items-center gap-4 md:gap-6 ml-auto">

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#FFF3C4] font-medium hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button className="text-[#FFF3C4] hover:scale-110 transition">
            <Heart size={24} />
          </button>

          <Link href="/cart">
            <div className="relative cursor-pointer text-[#FFF3C4] hover:scale-105 transition">

              <ShoppingBag size={24} />

              <span className="absolute -top-2 -right-2 bg-[#1F4D3A] text-white text-[10px] px-1.5 rounded-full">
                {count}
              </span>

            </div>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden text-[#FFF3C4] hover:scale-110 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
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
            className="w-full bg-white rounded-full py-2.5 pl-11 pr-4 outline-none"
          />
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? "max-h-72" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-3 pb-4 gap-1 border-t border-[#FFF3C4]/15">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#FFF3C4] font-medium py-3 px-2 rounded-lg hover:bg-[#FFF3C4]/10 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
