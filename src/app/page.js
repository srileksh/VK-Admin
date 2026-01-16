"use client";
import React, { useState } from "react";
import useAuthStore from "@/store/useAuthStore";

function Page() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) return;

    const success = await login(phone, password);

    if (success) {
      window.location.href = "/admin/dashboard";
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
        <label className="text-[14px] font-semibold">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=""
          className="w-full h-[48px] bg-[#f8fafc] border rounded-[10px] px-[15px] my-[15px]"
        />

        <label className="text-[14px] font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[48px] bg-[#f8fafc] border rounded-[10px] px-[15px] mt-[15px]"
        />

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-[20px] bg-[#1C4ED8] text-white py-[10px] rounded-[10px] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Page;
