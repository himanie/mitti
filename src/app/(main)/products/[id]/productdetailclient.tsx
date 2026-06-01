"use client";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { Heart, Share2, Star } from "lucide-react";
import { on } from "events";

export default function ProductDetailClient({
  product,
}: {
  product: any;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
const [loading, setLoading] = useState(false);
const router = useRouter();

const handleBuyNow = async () => {
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

const handleAddToCart = () => {
  setLoading(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProduct = cart.find(
    (item: any) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.priceInr,
      image: product.images?.[0]?.url || "",
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));

  setLoading(false);
  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 1500);
};

  return (
    <div className="min-h-screen bg-[#FFF3C4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">

         
          <div className="bg-[#1F4D3A] p-4 rounded-3xl">
            <img
              src={
                product.images?.[0]?.url ||
                "https://picsum.photos/900"
              }
              alt={product.name||"product"}
              className="w-full h-150 object-cover rounded-2xl"
            />
          </div>

        
          <div>
            <h1 className="text-5xl font-bold text-[#1F4D3A]">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mt-4 text-[#D89A2B]">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>

            <p className="text-4xl font-bold mt-6 text-[#1F4D3A]">
              ₹{product.priceInr}
            </p>

            <p className="mt-6 text-[#1F4D3A]/80 leading-8">
              {product.description}
            </p>

       
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  className="w-10 h-10 rounded-lg bg-[#1F4D3A] text-white"
                >
                  -
                </button>

                <span className="text-xl font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="w-10 h-10 rounded-lg bg-[#1F4D3A] text-white"
                >
                  +
                </button>
              </div>
            </div>

          
            <div className="flex gap-4 mt-10 flex-wrap">

              <button
                    onClick={handleAddToCart}
                    disabled={loading || added}
                    className={`px-8 py-3 rounded-full text-white transition
                        ${
                        added
                            ? "bg-[#1F4D3A]"
                            : loading
                            ? "bg-gray-400"
                            : "bg-[#1F4D3A]"
                        }`}
                    >
                    {loading
                        ? "Adding..."
                        : added
                        ? "Added"
                        : "Add to Cart"}
                    </button>

              <button className="bg-[#D89A2B] text-white px-8 py-3 rounded-full" onClick={handleBuyNow}>
                Buy Now
              </button>

              <button className="w-12 h-12 border border-[#1F4D3A] rounded-full flex items-center justify-center">
                <Heart />
              </button>

              <button className="w-12 h-12 border border-[#1F4D3A] rounded-full flex items-center justify-center">
                <Share2 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}