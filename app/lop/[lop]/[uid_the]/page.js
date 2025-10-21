"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStudentDetail } from "../../../../lib/api";

export default function StudentDetail({ params }) {
  const resolved = use(params);
  const lop = decodeURIComponent(resolved.lop);
  const uid_the = decodeURIComponent(resolved.uid_the);
  const [student, setStudent] = useState(null);
  const [backUrl, setBackUrl] = useState(`/lop/${lop}`);

  useEffect(() => {
    // Lấy thông tin học sinh
    getStudentDetail(uid_the).then((d) => setStudent(d.student || null));

    // Kiểm tra trang trước để set nút "Quay lại"
    const prev = localStorage.getItem("previousPage");
    if (prev && prev.includes("/diemdanh/")) setBackUrl(`/diemdanh/${lop}`);
    else setBackUrl(`/lop/${lop}`);
  }, [uid_the, lop]);

  if (!student)
    return <div className="p-10 text-gray-600 text-xl">Đang tải thông tin...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-10 mt-10 animate-fadeInSlow">
      <div className="flex items-center gap-8 mb-8">
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/student/${uid_the}/photo`}
          alt="Ảnh thẻ học sinh"
          className="w-40 h-50 object-cover rounded-2xl shadow-md border"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{student.ten}</h1>
          <p className="text-lg text-gray-700">Lớp: {student.lop}</p>
          <p className="text-lg text-gray-700">UID: {student.uid_the}</p>
          <p className="text-lg text-gray-700">Giới tính: {student.gioi_tinh || "—"}</p>
          <p className="text-lg text-gray-700">
            Ngày sinh:{" "}
            {student.ngay_sinh
              ? new Date(student.ngay_sinh).toLocaleDateString("vi-VN")
              : "—"}
          </p>
        </div>
      </div>

      <Link
        href={backUrl}
        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl transition"
      >
        ← Quay lại
      </Link>
    </div>
  );
}
