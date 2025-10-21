"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSuggestedClasses } from "../../lib/api";

export default function LopGrid() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getSuggestedClasses().then((d) => setClasses(d.classes || []));
  }, []);

  const group = (prefix) => classes.filter((c) => (c || "").startsWith(prefix));

  return (
    <div className="bg-white flex flex-col justify-start px-12 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Quản lý lớp học</h1>

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
                  href={`/lop/${urlSeg}`}
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
