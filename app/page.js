"use client";
import { useState, useEffect } from "react";
import { login } from "../lib/api";

export default function ModernLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const handleNextStep = () => {
    if (username.trim()) {
      setAnimate(true);
      setTimeout(() => {
        setStep(2);
        setAnimate(false);
        setMessage("");
      }, 300);
    } else {
      setMessage("Vui lòng nhập tên đăng nhập");
    }
  };

  const handleLogin = async () => {
    if (!password) {
      setMessage("Vui lòng nhập mật khẩu");
      return;
    }

    try {
      const res = await login(username, password);
      if (res.status === "success") {
        localStorage.setItem("user", res.User);
        localStorage.setItem("isLoggedIn", "true");
        document.cookie = "isLoggedIn=true; path=/; max-age=86400";
        window.location.href = "/dashboard";
      } else {
        setMessage(res.detail || "Sai tài khoản hoặc mật khẩu");
      }
    } catch {
      setMessage("Không thể kết nối đến máy chủ");
    }
  };

  const handleBack = () => {
    setAnimate(true);
    setTimeout(() => {
      setStep(1);
      setAnimate(false);
      setPassword("");
      setMessage("");
    }, 300);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") action();
  };

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center animate-fadeInSlow">
      <div className="w-full max-w-md px-6">
        <div
          className={`relative p-10 rounded-3xl overflow-hidden glass-login transition-all duration-700 transform ${
            animate ? "animate-slideOutLeft" : "animate-fadeInUp"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(120,200,255,0.25),transparent_60%)] opacity-60 mix-blend-overlay animate-[liquidMove_15s_linear_infinite]"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <img
                src="/logo.svg"
                alt="logo"
                className="h-56 w-auto drop-shadow-[0_4px_20px_rgba(255,255,255,0.5)]"
              />
            </div>

            {step === 1 ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Đăng nhập
                </h2>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setMessage("");
                  }}
                  onKeyPress={(e) => handleKeyPress(e, handleNextStep)}
                  className="w-full mb-4 px-3 py-2 border border-white/50 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white/30 backdrop-blur-2xl text-gray-800 placeholder-gray-500"
                  autoFocus
                />

                {message && (
                  <div className="mb-4 text-sm text-red-600 text-center">
                    {message}
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Tiếp theo
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleBack}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Quay lại
                </button>

                <div className="text mb-6">
                  <div className="text-xl font-medium text-gray-800">
                    {username}
                  </div>
                </div>

                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="w-full mb-4 px-3 py-2 border border-white/50 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white/30 backdrop-blur-2xl text-gray-800 placeholder-gray-500"
                  autoFocus
                />

                {message && (
                  <div
                    className={`mb-4 text-sm text-center ${
                      message.includes("thành công")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
