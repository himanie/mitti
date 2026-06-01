"use client";

import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const updateCart = (updated: any[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const increase = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);

  };

  const decrease = (id: string) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
    
  };

  const router = useRouter();

  const handleCheckout = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
  });

  if (res.status === 401) {
    router.push(
      `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
    );
    return;
  }

  alert("User is logged in");
};

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  return (
    <div className="min-h-screen bg-[#FFF3C4]">


      <div className="flex items-center px-8 py-5">
        
    
        <img
          src="/mitti-logo.png"
          alt="logo"
          className="w-14 h-14 object-contain"
        />

        
        <div className="ml-1">
          <h1 className="text-3xl font-bold text-[#1F4D3A]">
            Mitti
          </h1>
        </div>
      </div>

   
      <div className="px-8 md:px-14">
        <h2 className="text-4xl font-bold text-[#1F4D3A] mb-10">
          Shopping Cart
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">

        
          <div className="lg:col-span-2 rounded-2xl overflow-hidden">

        
            <div className="grid grid-cols-4 bg-[#1F4D3A] text-white p-4 font-semibold">
              <div>Product</div>
              <div>Price</div>
              <div>Qty</div>
              <div>Action</div>
            </div>

          
            {cart.length === 0 ? (
              <div className="p-6 text-[#1F4D3A] bg-[#F7E7A9]">
                Cart is empty 🌿
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center p-4 bg-[#F7E7A9] border-b border-[#1F4D3A]/20"
                >

                
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded-lg object-cover border border-[#1F4D3A]/20"
                    />
                    <span className="font-medium text-[#1F4D3A]">
                      {item.name}
                    </span>
                  </div>

           
                  <div className="text-[#1F4D3A] font-semibold">
                    ₹{item.price}
                  </div>

          
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="px-2 bg-[#1F4D3A] text-white rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increase(item.id)}
                      className="px-2 bg-[#1F4D3A] text-white rounded"
                    >
                      +
                    </button>
                  </div>

            
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-[#1F4D3A] text-white px-3 py-1 rounded-full hover:opacity-90"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

     
          <div className="bg-[#F7E7A9] rounded-2xl p-6 h-fit border border-[#1F4D3A]/20">

            <h3 className="text-2xl font-bold text-[#1F4D3A] mb-6">
              Checkout
            </h3>

            <div className="flex justify-between mb-3 text-[#1F4D3A]">
              <span>Total Items</span>
              <span>
                {cart.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between mb-6 text-[#1F4D3A]">
              <span>Total Price</span>
              <span className="text-xl font-bold">
                ₹{total}
              </span>
            </div>

            <button className="w-full bg-[#1F4D3A] text-white py-3 rounded-xl hover:opacity-90" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}