"use client";

import { useEffect, useRef, useState} from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
  firstname: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
});


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


  const validateForm = () => {
    const newErrors = {
      firstname: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

  
    if (!firstname.trim()) {
      newErrors.firstname = "First name is required";
      valid = false;
    }


  
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }


    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone must be 10 digits";
      valid = false;
    }

 
    if (!gender) {
      newErrors.gender = "Select gender";
      valid = false;
    }

   
    if (!password) {
      newErrors.password = "Password required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
      valid = false;
    }


    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
 
  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone,
        gender,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
    }

  } catch (error) {
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEDA8] to-[#e6d38a] px-4 py-10 overflow-hidden">
    <div
      ref={cardRef}
      className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
    >

      <div className="md:w-1/2 bg-[#003631] text-[#FFEDA8] flex flex-col justify-center items-center p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#FFEDA8]/5" />
        <div className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full bg-[#FFEDA8]/5" />
        <div className="text-center relative">
          <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center mb-4 mx-auto">
            <img
              src="/mitti-logo.png"
              alt="Mitti Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-sm opacity-80 tracking-wide">
            Rooted in Tradition. Crafted for You.
          </p>
        </div>
      </div>


      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#003631] text-center">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2 mb-8">
          Join the Mitti family today
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

  
          <div className="grid grid-cols-2 gap-3">

            <div>
              <div
                className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                  errors.firstname
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#003631]"
                }`}
              >
                <User className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstname}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 focus-within:border-[#003631]">
                <User className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

          </div>


          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-[#003631]"
              }`}
            >
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div>
              <div
                className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#003631]"
                }`}
              >
                <Phone className="text-gray-400 mr-2" size={18} />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <div
                className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                  errors.gender
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#003631]"
                }`}
              >
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full outline-none bg-transparent text-gray-700"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender}
                </p>
              )}
            </div>

          </div>


          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-[#003631]"
              }`}
            >
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-gray-400 hover:text-[#003631] transition ml-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>


          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 transition focus-within:ring-2 focus-within:ring-[#003631]/20 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-[#003631]"
              }`}
            >
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="text-gray-400 hover:text-[#003631] transition ml-2"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition shadow-sm ${
              loading
                ? "bg-[#003631]/70 cursor-not-allowed"
                : "bg-[#003631] hover:opacity-90 hover:shadow-md"
            } text-[#FFEDA8]`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account{" "}
          <Link
              href="/login"
              className="text-[#003631] font-semibold cursor-pointer"
            >
              Login
            </Link>
        </p>
      </div>
    </div>
  </div>
);
}