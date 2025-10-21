"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUsername(savedUser);
  }, []);

  return (
    <div className="relative h-[calc(100vh-56px)] bg-white flex flex-col justify-start px-12 py-10 overflow-hidden">


      {/* --- Nội dung chính --- */}
      <h1 className="text-4xl font-bold text-gray-800 mt-1 mb-28 relative z-10">
        Xin chào, {username || "bạn"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl relative z-10">
        <Link
          href="/lop"
          className="flex items-center gap-5 rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <img src="/school.png" alt="lop" className="h-16 w-auto drop-shadow" />
          <div className="text-2xl font-semibold text-gray-800">Lớp học</div>
        </Link>

        <Link
          href="/diemdanh"
          className="flex items-center gap-5 rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <img src="/attendance.png" alt="diemdanh" className="h-16 w-auto drop-shadow" />
          <div className="text-2xl font-semibold text-gray-800">Quản lý điểm danh</div>
        </Link>
      </div>
    </div>
  );
}
