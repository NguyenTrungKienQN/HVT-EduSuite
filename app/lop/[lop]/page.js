"use client";
import { useEffect, useRef, useState, use } from "react";
import { getHomeroom, getStudentsByClass } from "../../../lib/api";

export default function LopDetail({ params }) {
  const resolved = use(params);
  const lop = decodeURIComponent(resolved.lop);
  const [gvcn, setGvcn] = useState(null);
  const [students, setStudents] = useState([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    getHomeroom(lop).then((d) => setGvcn(d.gvcn || null));
    getStudentsByClass(lop).then((d) => setStudents(d.students || []));
  }, [lop]);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Lớp học {lop}</h1>
          <div className="text-xl text-gray-600">Giáo viên chủ nhiệm: {gvcn || "—"}</div>
        </div>
      </div>

      <div className="text-2xl font-semibold mb-3">Danh sách học sinh</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black/10">
            <th className="border p-3 text-left">Họ và tên</th>
            <th className="border p-3 text-left">UID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td
                className="border p-3 text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  localStorage.setItem("previousPage", window.location.pathname);
                  window.location.href = `/lop/${lop}/${s.uid_the}`;
                }}
                >
                {s.ten}
              </td>

              <td className="border p-3">{s.uid_the}</td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td className="border p-3" colSpan={2}>
                Chưa có học sinh nào trong lớp này.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
