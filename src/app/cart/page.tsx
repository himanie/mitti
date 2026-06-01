"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
    setHydrated(true);
  }, []);

  const updateCart = (updated: any[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const increase = (id: string) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: string) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => updateCart([]);

  const handleCheckout = async () => {
    if (checkingOut) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });

      if (res.status === 401) {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }

      alert("User is logged in");
    } finally {
      setCheckingOut(false);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const isEmpty = hydrated && cart.length === 0;

  return (
    <div className="min-h-screen bg-[#FFF3C4]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-14 py-5">
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <img
            src="/mitti-logo.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-3xl font-bold text-[#1F4D3A]">Mitti</h1>
        </Link>

        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-2 text-[#1F4D3A] font-medium hover:opacity-80 transition"
        >
          <ArrowLeft size={18} />
          Continue shopping
        </Link>
      </div>

      <div className="px-6 md:px-14 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F4D3A] mb-8">
          Shopping Cart
          {totalItems > 0 && (
            <span className="ml-3 align-middle text-base font-medium text-[#1F4D3A]/60">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </h2>

        {/* Empty state */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center text-center bg-[#F7E7A9] rounded-2xl border border-[#1F4D3A]/15 py-20 px-6">
            <div className="w-20 h-20 rounded-full bg-[#1F4D3A]/10 flex items-center justify-center mb-6">
              <ShoppingBag size={36} className="text-[#1F4D3A]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1F4D3A] mb-2">
              Your cart is empty 🌿
            </h3>
            <p className="text-[#1F4D3A]/70 mb-8 max-w-md">
              Looks like you haven&apos;t added anything yet. Explore our
              handmade collection and find something you love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#1F4D3A] text-white px-8 py-3 rounded-full hover:opacity-90 transition"
            >
              <ShoppingBag size={18} />
              Shop now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {!hydrated ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 rounded-2xl bg-[#F7E7A9] animate-pulse border border-[#1F4D3A]/10"
                  />
                ))
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F7E7A9] rounded-2xl p-4 border border-[#1F4D3A]/15 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Product */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover border border-[#1F4D3A]/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1F4D3A] truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#1F4D3A]/70 mt-1">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-3 sm:gap-2 sm:justify-center">
                        <button
                          onClick={() => decrease(item.id)}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center bg-[#1F4D3A] text-white rounded-lg hover:opacity-90 transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold text-[#1F4D3A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.id)}
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center bg-[#1F4D3A] text-white rounded-lg hover:opacity-90 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Line subtotal + remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-40">
                        <span className="font-bold text-[#1F4D3A] sm:text-right sm:flex-1">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1F4D3A]/30 text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="text-sm text-[#1F4D3A]/70 hover:text-[#1F4D3A] underline underline-offset-4 transition"
                  >
                    Clear cart
                  </button>
                </>
              )}
            </div>

            {/* Summary */}
            <div className="bg-[#F7E7A9] rounded-2xl p-6 border border-[#1F4D3A]/20 lg:sticky lg:top-6 h-fit">
              <h3 className="text-2xl font-bold text-[#1F4D3A] mb-6">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3 text-[#1F4D3A]">
                <span>Total Items</span>
                <span className="font-medium">{totalItems}</span>
              </div>

              <div className="flex justify-between mb-4 text-[#1F4D3A]">
                <span>Shipping</span>
                <span className="font-medium text-[#1F4D3A]">Free</span>
              </div>

              <div className="border-t border-[#1F4D3A]/20 my-4" />

              <div className="flex justify-between mb-6 text-[#1F4D3A]">
                <span className="text-lg">Total</span>
                <span className="text-2xl font-bold">₹{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-[#1F4D3A] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#1F4D3A]/60">
                <ShieldCheck size={14} />
                Secure checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
