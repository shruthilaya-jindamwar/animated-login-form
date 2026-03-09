"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/authClient";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const user = getCurrentUser();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user}</p>
      <button onClick={handleLogout} style={{ marginTop: 16, padding: "8px 16px" }}>
        Logout
      </button>
    </div>
  );
}
