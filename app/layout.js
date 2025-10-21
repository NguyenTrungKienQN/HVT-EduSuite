"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hideSidebar = pathname === "/" || pathname === "/login";
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "HVT EduSuite";
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUsername(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  return (
    <html lang="vi">
      <body className="bg-[#f9fafb] text-gray-800 transition-all duration-500 ease-out">
        {!hideSidebar && (
          <header
            className="h-14 flex items-center px-4 bg-white text-gray-800 
                       shadow-md fixed top-0 left-0 right-0 z-20 
                       border-b border-gray-200 backdrop-blur-md animate-fadeDown"
          >
            <button
              onClick={() => setOpen(!open)}
              className="p-3 rounded-lg hover:bg-gray-100 transition"
              aria-label="Menu"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }}
            >
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-gray-800 inline-block rounded-sm" />
                ))}
              </div>
            </button>

            <div
              onClick={() => (window.location.href = "/dashboard")}
              className="ml-4 flex items-center cursor-pointer hover:opacity-80 transition-all duration-300"
              title="Về bảng điều khiển"
            >
              <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain mr-2" />
            </div>
          </header>
        )}

        <div className="flex pt-14 min-h-screen overflow-hidden">
          {!hideSidebar && (
            <aside
              className={`fixed top-14 left-0 bottom-0 w-72 bg-[#111827] text-white flex flex-col justify-between p-5 shadow-lg z-10
                          transition-transform duration-500 ease-[cubic-bezier(0.4,0.0,0.2,1)]
                          ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"} 
                          animate-fadeSlideIn`}
            >
              <div>
                <div className="text-2xl font-semibold mb-6 text-gray-100">Menu</div>
                <nav className="space-y-3">
                  <Link href="/lop" className="block hover:text-blue-400 font-medium transition-all duration-200">
                    Lớp học
                  </Link>
                  <Link href="/diemdanh" className="block hover:text-blue-400 font-medium transition-all duration-200">
                    Quản lý điểm danh
                  </Link>
                </nav>
              </div>

              <div className="text-sm text-gray-400">
                <div className="mb-3">Đăng nhập: {username || "—"}</div>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-300"
                >
                  Đăng xuất
                </button>
              </div>
            </aside>
          )}
          <main
            className={`flex-1 p-10 transition-all duration-500 ease-out 
                        ${hideSidebar ? "w-full" : "ml-0"} animate-fadeSlideIn`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
