"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSuggestedClasses } from "../../lib/api";
export default function DiemDanhGrid() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getSuggestedClasses().then((d) => setClasses(d.classes || []));
  }, []);

  const group = (prefix) => classes.filter((c) => (c || "").startsWith(prefix));

  return (
    <div className="bg-white flex flex-col justify-start px-12 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Quản lý điểm danh</h1>

        <button
          onClick={() =>
            window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/export/school/attendance_today`)
          }
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-sm"
          >
          Xuất Excel toàn trường hôm nay
        </button>
      </div>


      {["10", "11", "12"].map((khoi) => (
        <section key={khoi} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Khối {khoi}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {group(khoi).map((lop) => {
              const label = (lop || "").trim();
              const urlSeg = encodeURIComponent(label);
              return (
                <Link
                  key={label}
                  href={`/diemdanh/${urlSeg}`}
                  className="flex items-center gap-5 rounded-2xl border border-gray-300 bg-white p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-2xl font-semibold text-gray-800">{label}</div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
