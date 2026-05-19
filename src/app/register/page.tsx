"use client";

import { useEffect, useRef, useState} from "react";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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

 
  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await res.json();
  alert(data.message);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEDA8] to-[#e6d38a] px-4 overflow-hidden">
   
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex"
      >
        
        <div className="w-1/2 bg-[#003631] text-[#FFEDA8] flex flex-col justify-center items-center p-10 relative">


          <div className="text-center">
            <div className="w-90 h-90 flex items-center justify-center mb-4">
              <img
                src="/mitti-logo.png"
                alt="Mitti Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-sm opacity-80">
              Rooted in Tradition. Crafted for You.
            </p>
          </div>

        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-[#003631] text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

      
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
              />
            </div>

   
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
              />
            </div>

     
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none"
              />
            </div>

  
            <button type="submit" className="w-full bg-[#003631] text-[#FFEDA8] py-3 rounded-lg font-semibold hover:opacity-90 transition">
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