"use client";

import { useEffect, useRef } from "react";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const speed = 0.09;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 20;
      mouseY = (e.clientY - window.innerHeight / 2) / 20;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cardRef.current) {
        cardRef.current.style.transform = `
          translate(${currentX}px, ${currentY}px)
          rotateY(${currentX / 10}deg)
          rotateX(${-currentY / 10}deg)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEDA8] to-[#e6d38a] px-4 overflow-hidden">

   
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex"
      >

     
        <div className="w-1/2 bg-[#003631] text-[#FFEDA8] flex flex-col justify-center items-center p-10 relative">


          <div className="text-center">
            <div className="w-28 h-28 border-2 border-[#FFEDA8] rounded-full flex items-center justify-center mb-6">
              🌿
            </div>

            <h1 className="text-4xl tracking-[8px] font-semibold mb-4">
              MITTI
            </h1>

            <p className="text-sm opacity-80">
              Rooted in Tradition. Crafted for You.
            </p>
          </div>

        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-[#003631] text-center mb-6">
            Create Account
          </h2>

          <form className="space-y-4">

      
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full outline-none"
              />
            </div>

   
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>

            
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none"
              />
            </div>

     
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full outline-none"
              />
            </div>

  
            <button className="w-full bg-[#003631] text-[#FFEDA8] py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Register
            </button>


            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="flex-1 h-[1px] bg-gray-300" />
              or
              <div className="flex-1 h-[1px] bg-gray-300" />
            </div>

      
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              G Sign up with Google
            </button>

          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span className="text-[#003631] font-semibold cursor-pointer">
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}