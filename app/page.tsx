"use client";

import Image from "next/image";
import React, { useState } from "react"; // Added useState
import "./globals.css";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client outside the component to avoid recreating it on every render
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const Page = () => {
  // State for user feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Simple validation
    if (!name || !email) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("Waitlist")
        .insert([{ name, email }]);

      if (error) throw error;

      // Send confirmation email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send confirmation email");
        // Continue anyway as user was added to database
      }

      // On Success
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error inserting data:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-dvh w-full bg-[url("/background-main.png")] bg-cover bg-center flex flex-col items-center relative overflow-hidden'>
      {/* --- HEADER --- */}
      <div className="w-full max-w-7xl flex justify-between items-center p-5 md:p-4 z-10">
        <Image
          alt="Logo"
          className="object-contain cursor-pointer"
          src="/logo.png"
          height={100}
          width={100}
        />

        <Link
          href="https://wa.me/c/2348188549945"
          className="group relative cursor-pointer inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden bg-gradient-to-b from-[#3E4095] to-[#14142F] shadow-md transition-all hover:shadow-lg focus:outline-none"
        >
          <span className="relative px-6 py-2 md:px-8 md:py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-90 w-full h-full">
            <span className="font-semibold text-[#3E4095] text-sm md:text-base">
              Contact Us
            </span>
          </span>
        </Link>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-col items-center text-center mt-2 md:mt-2 px-4 z-10 w-full max-w-4xl flex-grow justify-start">
        <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-1">
          Your All-In-One Partner For
        </h2>

        <h1 className="text-5xl font-bold font-montserrat mb-3 md:mb-5">
          <span className="bg-gradient-to-r from-[#3E4095] to-[#14142F] bg-clip-text text-transparent">
            Tech, Design <br /> & Branding
          </span>
        </h1>

        {/* --- TRANSPARENT CARD CONTAINER --- */}
        <div className="w-full max-w-sm relative group">
          {/* SVG DEFINITIONS */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient
                id="borderGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#BCBEFF" />
                <stop offset="100%" stopColor="#3E4095" />
              </linearGradient>
            </defs>
          </svg>

          {/* BORDERS */}
          <div className="absolute inset-0 w-full h-full block md:hidden pointer-events-none">
            <svg className="w-full h-full" style={{ overflow: "visible" }}>
              <rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx="24"
                fill="none"
                stroke="url(#borderGradient)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute inset-0 w-full h-full hidden md:block pointer-events-none">
            <svg className="w-full h-full" style={{ overflow: "visible" }}>
              <rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx="32"
                fill="none"
                stroke="url(#borderGradient)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* CONTENT LAYER */}
          <div className="relative bg-white/40 p-4 md:p-6 flex flex-col items-center rounded-[24px] md:rounded-[32px]">
            <h3 className="text-[#3E4095] font-bold text-sm">
              {isSuccess ? "Welcome Aboard!" : "We’re Almost Live"}
            </h3>
            <p className="text-[#3E4095] text-xs md:text-sm font-bold mb-4 md:mb-6 max-w-xs mx-auto leading-relaxed">
              {isSuccess
                ? "Thanks for joining. We'll be in touch soon."
                : "Get Early Access, Priority Onboarding, Exclusive Launch Perks."}
            </p>

            {/* Form or Success Message */}
            {!isSuccess ? (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-3"
              >
                {/* INPUT NAME FIX: Added name="name" */}
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl p-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3E4095] focus:ring-1 focus:ring-[#3E4095] transition-all"
                  placeholder="What's Your Name?"
                  disabled={isLoading}
                />
                {/* INPUT EMAIL FIX: Added name="email" */}
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl p-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3E4095] focus:ring-1 focus:ring-[#3E4095] transition-all"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />

                {errorMessage && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errorMessage}
                  </p>
                )}

                <button
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-[#3E4095] hover:bg-[#2c2d6a] disabled:bg-gray-400 text-white font-semibold p-2 rounded-xl mt-1 transition-colors shadow-lg shadow-indigo-500/20 text-sm md:text-base flex justify-center items-center"
                  type="submit"
                >
                  {isLoading ? (
                    // Simple Loading Spinner
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </form>
            ) : (
              // Success State UI
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-green-100/80 p-4 rounded-xl flex items-center justify-center">
                  <span className="text-[#3E4095] font-bold text-sm">
                    ✓ You're on the list!
                  </span>
                </div>
                <Link href="/" onClick={()=>{setIsSuccess(false)}} className=" mt-4 text-right text-black  hover:underline">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-0 left-0 w-full -z-0">
        <Image
          className="w-full object-cover h-[20vh] lg:h-auto lg:max-h-[25vh]"
          height={200}
          width={1440}
          alt="footer decoration"
          src="/footer.svg"
        />
      </div>
    </div>
  );
};

export default Page;
