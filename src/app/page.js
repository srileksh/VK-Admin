// "use client";
// import React from "react";

// function page() {
//   return (
//     <div className="min-h-screen bg-[#eff6fe] pt-[50px] p-[25px] sm:p-0">
//       <div className="text-center">
//         <img src="vk-logo.png" className="mx-auto" />
//         <h1 className="text-[32px] font-bold">Admin Login</h1>
//         <p className="">Access the admin dashboard</p>
//       </div>
//       <form className="sm:w-[420px] h-[382px] border-0 border-[#e0edfe] rounded-[20px] bg-[#ffffff] mx-auto px-[45px] py-[40px] mt-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
//         <label className="text-[14px] font-semibold">Phone Number</label>
//         <div className="w-full h-[48px] bg-[#f8fafc] border border-[#C5CDD7] rounded-[10px] placeholder-[#C5CDD7] my-[15px] ">
//           <input
//             className="w-full h-[48px] outline-none p-[15px]"
//             placeholder="Enter Your Phone Number"
//           />
//         </div>
//         <label className="text-[14px] font-semibold">Password</label>
//         <div className="w-[full] h-[48px] bg-[#f8fafc] border border-[#C5CDD7] rounded-[10px] placeholder-[#C5CDD7] mt-[15px]">
//           <input
//             className="w-[full] h-[48px] outline-none p-[15px]"
//             placeholder="Enter Your Password"
//           />
//         </div>
//         <div className="text-right mt-[15px]">
//           <a
//             href="/forgot-password"
//             className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
//           >
//             Forgot password?
//           </a>
//         </div>
//         <button className="w-full py-[10px] rounded-[10px] mt-[15px] bg-[#1C4ED8]  text-[16px] font-bold text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default page;
"use client";
import React, { useState } from "react";

function Page() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!phone || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token (example)
      localStorage.setItem("adminToken", data.token);

      // ✅ Redirect after login
      window.location.href = "/admin/dashboard";

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eff6fe] pt-[50px] p-[25px]">
      <div className="text-center">
        <img src="vk-logo.png" className="mx-auto" />
        <h1 className="text-[32px] font-bold">Admin Login</h1>
        <p>Access the admin dashboard</p>
      </div>

      <form
        onSubmit={handleLogin}
        className="sm:w-[420px] bg-white mx-auto px-[45px] py-[40px] mt-[30px] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      >
        {/* Phone */}
        <label className="text-[14px] font-semibold">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Your Phone Number"
          className="w-full h-[48px] bg-[#f8fafc] border border-[#C5CDD7] rounded-[10px] px-[15px] my-[15px] outline-none"
        />

        {/* Password */}
        <label className="text-[14px] font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          className="w-full h-[48px] bg-[#f8fafc] border border-[#C5CDD7] rounded-[10px] px-[15px] mt-[15px] outline-none"
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-3">{error}</p>
        )}

        {/* Forgot */}
        <div className="text-right mt-[15px]">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-[10px] rounded-[10px] mt-[15px] bg-[#1C4ED8] text-[16px] font-bold text-white hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Page;
