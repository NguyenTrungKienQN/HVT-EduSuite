const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("url=", API_BASE_URL);

export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getStudentDetail(uid_the) {
  const res = await fetch(`${API_BASE_URL}/student/${uid_the}`);
  return res.json();
}

export async function getHomeroom(lop) {
  const res = await fetch(`${API_BASE_URL}/homeroom/${encodeURIComponent(lop)}`);
  return res.json();
}

export async function getAttendanceTodayByClass(lop) {
  const res = await fetch(`${API_BASE_URL}/class/${encodeURIComponent(lop)}/attendance_today`);
  return res.json();
}

export async function getStudentsByClass(lop) {
  const res = await fetch (`${API_BASE_URL}/class/${encodeURIComponent(lop)}/students`);
  return res.json();
}

export async function getSuggestedClasses() {
  const res = await fetch (`${API_BASE_URL}/classes_suggested`);
  return res.json();
}