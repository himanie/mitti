"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

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

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    };
    }, []);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [loading, setLoading] = useState(false);


  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let valid = true;

   
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Invalid email format";
      valid = false;
    }


    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const result = await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        }
      );

      if (result?.error) {
        alert(result.error);
      } else {
        alert("Login successful");
        router.push("/");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEDA8] to-[#e6d38a] px-4 overflow-hidden"> 
      
      <div
            ref={cardRef}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex transition-transform duration-200"
            >

 
        <div className="w-1/2 bg-[#003631] text-[#FFEDA8] flex flex-col justify-center items-center p-10">
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
            Welcome Back
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
 
            <div>
              <div
                className={`flex items-center border rounded-lg px-3 py-2 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <Mail
                  className="text-gray-400 mr-2"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full outline-none"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

  
            <div>
              <div
                className={`flex items-center border rounded-lg px-3 py-2 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <Lock
                  className="text-gray-400 mr-2"
                  size={18}
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full outline-none"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

   
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-[#003631]/70 cursor-not-allowed"
                  : "bg-[#003631] hover:opacity-90"
              } text-[#FFEDA8]`}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#003631] font-semibold cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}