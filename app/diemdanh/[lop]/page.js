"use client";
import { useEffect, useRef, useState, use } from "react";
import { getHomeroom, getAttendanceTodayByClass } from "../../../lib/api";

export default function DiemDanhLop({ params }) {
  const resolved = use(params);
  const lop = decodeURIComponent(resolved.lop);
  const [gvcn, setGvcn] = useState(null);
  const [records, setRecords] = useState([]);
  const fetched = useRef(false);

  useEffect(() => {
    getHomeroom(lop).then((d) => setGvcn(d.gvcn || null));

    if (fetched.current) return;
    fetched.current = true;

    getAttendanceTodayByClass(lop).then((d) => {
      setRecords(d.records || []);
    });
  }, [lop]);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Quản lý điểm danh</h1>
          <div className="text-4xl font-semibold">{lop}</div>
        </div>
        <div className="text-right">
          <div className="text-xl">Giáo viên chủ nhiệm:</div>
          <div className="text-2xl font-semibold">{gvcn || "—"}</div>
        </div>
      </div>
      <button
        onClick={() =>
          window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/export/${lop}/attendance_today`)
        }
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl mb-6 transition"
        >
        Xuất Excel lớp {lop}
      </button>

      <div className="text-2xl font-semibold mb-3">Danh sách học sinh hôm nay</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black/10">
            <th className="border p-3 text-left">Họ và tên</th>
            <th className="border p-3 text-left">UID</th>
            <th className="border p-3 text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td
                className="border p-3 text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  localStorage.setItem("previousPage", window.location.pathname);
                  window.location.href = `/lop/${lop}/${r.uid_the}`;
                }}
                >
                {r.ten}
              </td>

              <td className="border p-3">{r.uid_the}</td>
              <td
                className={`border p-3 font-semibold ${
                  r.trang_thai === "Có mặt"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {r.trang_thai}
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td className="border p-3 text-center" colSpan={3}>
                Chưa có dữ liệu học sinh.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
